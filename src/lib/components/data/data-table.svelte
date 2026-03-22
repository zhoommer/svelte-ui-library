<script lang="ts" generics="T">
	import { setContext } from 'svelte';
	import type { Size } from '$lib/types.js';
	import type {
		ColumnDef,
		DataTableContext,
		DataTableProps,
		SortState,
		FilterState,
		ResizeState
	} from './data-table.types.js';

	// ─── Constants ───────────────────────────────────────────────────────────────
	const SELECTION_COL_WIDTH = 48;
	const EXPAND_COL_WIDTH = 48;

	// ─── Props ───────────────────────────────────────────────────────────────────
	let {
		data,
		columns,
		getRowKey = (_row: T, index: number) => String(index),
		sortable = false,
		sort = $bindable<SortState | SortState[] | undefined>(undefined),
		multiSort = false,
		onsortchange,
		filterable = false,
		filterDebounce: filterDebounceMs = 300,
		paginated = false,
		pageSize = $bindable(10),
		pageSizeOptions = [10, 25, 50, 100],
		totalRows,
		onpagechange,
		selectionMode = 'none',
		selectedKeys = $bindable<Set<string>>(new Set()),
		onselectionchange,
		expandable = false,
		expandedKeys = $bindable<Set<string>>(new Set()),
		expandRow,
		onexpansionchange,
		loading = false,
		skeletonRows = 5,
		empty,
		emptyMessage = 'No results found',
		columnResizing = false,
		columnVisibility = false,
		variant = 'simple',
		size = 'md' as Size,
		stickyHeader = false,
		caption,
		toolbar,
		toolbarEnd,
		class: className = ''
	}: DataTableProps<T> = $props();

	// ─── Sort state ──────────────────────────────────────────────────────────────
	let internalSort = $state<SortState[]>([]);

	const effectiveSort = $derived.by<SortState[]>(() => {
		if (sort !== undefined) {
			return Array.isArray(sort) ? sort : [sort];
		}
		return internalSort;
	});

	// ─── Filter state ────────────────────────────────────────────────────────────
	let filterState = $state<FilterState>({ global: '', columns: {} });
	let debouncedGlobal = $state('');
	let debounceTimer: ReturnType<typeof setTimeout> | undefined;

	function setGlobalFilter(value: string) {
		filterState = { ...filterState, global: value };
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			debouncedGlobal = value;
			currentPage = 1;
		}, filterDebounceMs);
	}

	function setColumnFilter(columnKey: string, value: string) {
		filterState = {
			...filterState,
			columns: { ...filterState.columns, [columnKey]: value }
		};
		currentPage = 1;
	}

	// ─── Pagination state ────────────────────────────────────────────────────────
	let currentPage = $state(1);

	// ─── Column widths ───────────────────────────────────────────────────────────
	let columnWidths = $state<Record<string, number>>(
		Object.fromEntries(columns.filter((c) => c.width).map((c) => [c.key, c.width!]))
	);
	let resizeState = $state<ResizeState | null>(null);

	// ─── Hidden columns ──────────────────────────────────────────────────────────
	let hiddenColumns = $state<Set<string>>(
		new Set(columns.filter((c) => c.hidden).map((c) => c.key))
	);

	// ─── Internal selection/expansion ───────────────────────────────────────────
	let internalSelectedKeys = $state<Set<string>>(new Set());
	let internalExpandedKeys = $state<Set<string>>(new Set());
	let lastClickedIndex = $state<number | null>(null);

	const effectiveSelectedKeys = $derived(selectedKeys ?? internalSelectedKeys);
	const effectiveExpandedKeys = $derived(expandedKeys ?? internalExpandedKeys);

	// ─── Derived: visible columns ────────────────────────────────────────────────
	const visibleColumns = $derived(columns.filter((c) => !hiddenColumns.has(c.key)));

	const pinnedLeft = $derived(visibleColumns.filter((c) => c.pin === 'left'));
	const pinnedRight = $derived(visibleColumns.filter((c) => c.pin === 'right'));

	const stickyLeftMap = $derived.by<Record<string, number>>(() => {
		const map: Record<string, number> = {};
		let offset = selectionMode !== 'none' ? SELECTION_COL_WIDTH : 0;
		if (expandable) offset += EXPAND_COL_WIDTH;
		for (const col of pinnedLeft) {
			map[col.key] = offset;
			offset += columnWidths[col.key] ?? col.width ?? 120;
		}
		return map;
	});

	const stickyRightMap = $derived.by<Record<string, number>>(() => {
		const map: Record<string, number> = {};
		let offset = 0;
		for (const col of [...pinnedRight].reverse()) {
			map[col.key] = offset;
			offset += columnWidths[col.key] ?? col.width ?? 120;
		}
		return map;
	});

	// ─── Derived: filtered data ──────────────────────────────────────────────────
	const filteredData = $derived.by<T[]>(() => {
		let result = data;
		const globalVal = debouncedGlobal.trim().toLowerCase();

		if (filterable && globalVal) {
			result = result.filter((row) =>
				visibleColumns.some((col) => {
					const val = getCellValue(row, col);
					return String(val ?? '')
						.toLowerCase()
						.includes(globalVal);
				})
			);
		}

		for (const [key, colFilter] of Object.entries(filterState.columns)) {
			if (!colFilter.trim()) continue;
			const col = columns.find((c) => c.key === key);
			if (!col) continue;
			const filterVal = colFilter.trim().toLowerCase();
			result = result.filter((row) => {
				if (col.filterFn) return col.filterFn(row, colFilter);
				const val = getCellValue(row, col);
				return String(val ?? '')
					.toLowerCase()
					.includes(filterVal);
			});
		}

		return result;
	});

	// ─── Derived: sorted data ────────────────────────────────────────────────────
	const sortedData = $derived.by<T[]>(() => {
		if (!effectiveSort.length) return filteredData;
		return [...filteredData].sort((a, b) => {
			for (const { column: key, direction } of effectiveSort) {
				const col = columns.find((c) => c.key === key);
				if (!col) continue;
				let result: number;
				if (col.sortComparator) {
					result = col.sortComparator(a, b, direction);
				} else {
					const av = getCellValue(a, col);
					const bv = getCellValue(b, col);
					result = defaultCompare(av, bv);
				}
				if (result !== 0) return direction === 'asc' ? result : -result;
			}
			return 0;
		});
	});

	// ─── Derived: pagination ─────────────────────────────────────────────────────
	const totalCount = $derived(totalRows ?? sortedData.length);
	const totalPages = $derived(Math.max(1, Math.ceil(totalCount / pageSize)));
	const paginatedData = $derived<T[]>(
		paginated ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize) : sortedData
	);

	// ─── Derived: selection ──────────────────────────────────────────────────────
	const allSelected = $derived(
		paginatedData.length > 0 &&
			paginatedData.every((row, i) => effectiveSelectedKeys.has(getRowKey(row, i)))
	);
	const someSelected = $derived(
		!allSelected && paginatedData.some((row, i) => effectiveSelectedKeys.has(getRowKey(row, i)))
	);

	// ─── Derived: total column count ─────────────────────────────────────────────
	const totalColumnCount = $derived(
		visibleColumns.length + (selectionMode !== 'none' ? 1 : 0) + (expandable ? 1 : 0)
	);

	// ─── ARIA live region ────────────────────────────────────────────────────────
	let announceMessage = $state('');

	function announce(msg: string) {
		announceMessage = msg;
		setTimeout(() => (announceMessage = ''), 100);
	}

	// ─── Sort action ─────────────────────────────────────────────────────────────
	function toggleSort(columnKey: string, multi: boolean) {
		const current = effectiveSort;
		const existing = current.find((s) => s.column === columnKey);
		let next: SortState[];

		if (!existing) {
			next = multi
				? [...current, { column: columnKey, direction: 'asc' }]
				: [{ column: columnKey, direction: 'asc' }];
		} else if (existing.direction === 'asc') {
			next = current.map((s) => (s.column === columnKey ? { ...s, direction: 'desc' } : s));
		} else {
			next = current.filter((s) => s.column !== columnKey);
		}

		if (sort !== undefined) {
			sort = next.length === 1 ? next[0] : next;
		} else {
			internalSort = next;
		}

		currentPage = 1;
		const col = columns.find((c) => c.key === columnKey);
		const label = typeof col?.header === 'string' ? col.header : columnKey;
		const found = next.find((s) => s.column === columnKey);
		announce(found ? `Sorted by ${label} ${found.direction}ending` : `Sort cleared for ${label}`);
		onsortchange?.(next);
	}

	// ─── Selection actions ───────────────────────────────────────────────────────
	function toggleRow(key: string, rowIndex?: number, shift = false) {
		let next = new Set(effectiveSelectedKeys);

		if (selectionMode === 'single') {
			next = next.has(key) ? new Set() : new Set([key]);
		} else {
			if (shift && lastClickedIndex !== null && rowIndex !== undefined) {
				const lo = Math.min(lastClickedIndex, rowIndex);
				const hi = Math.max(lastClickedIndex, rowIndex);
				for (let i = lo; i <= hi; i++) {
					next.add(getRowKey(paginatedData[i], i));
				}
			} else {
				if (next.has(key)) next.delete(key);
				else next.add(key);
			}
		}

		if (rowIndex !== undefined) lastClickedIndex = rowIndex;

		if (selectedKeys !== undefined) {
			selectedKeys = next;
		} else {
			internalSelectedKeys = next;
		}
		onselectionchange?.(
			next,
			paginatedData.filter((row, i) => next.has(getRowKey(row, i)))
		);
	}

	function toggleAll() {
		let next: Set<string>;
		if (allSelected) {
			next = new Set(
				[...effectiveSelectedKeys].filter(
					(k) => !paginatedData.some((row, i) => getRowKey(row, i) === k)
				)
			);
		} else {
			next = new Set([
				...effectiveSelectedKeys,
				...paginatedData.map((row, i) => getRowKey(row, i))
			]);
		}
		if (selectedKeys !== undefined) {
			selectedKeys = next;
		} else {
			internalSelectedKeys = next;
		}
		onselectionchange?.(
			next,
			data.filter((row, i) => next.has(getRowKey(row, i)))
		);
	}

	// ─── Expansion action ────────────────────────────────────────────────────────
	function toggleExpansion(key: string) {
		const next = new Set(effectiveExpandedKeys);
		if (next.has(key)) next.delete(key);
		else next.add(key);
		if (expandedKeys !== undefined) {
			expandedKeys = next;
		} else {
			internalExpandedKeys = next;
		}
		onexpansionchange?.(next);
	}

	// ─── Column visibility ───────────────────────────────────────────────────────
	function toggleColumnVisibility(columnKey: string) {
		const next = new Set(hiddenColumns);
		if (next.has(columnKey)) next.delete(columnKey);
		else next.add(columnKey);
		hiddenColumns = next;
	}

	// ─── Column resize ───────────────────────────────────────────────────────────
	function startResize(columnKey: string, startX: number, startWidth: number) {
		resizeState = { columnKey, startX, startWidth };
	}

	$effect(() => {
		if (!resizeState) return;
		const { columnKey, startX, startWidth } = resizeState;
		const col = columns.find((c) => c.key === columnKey);
		const minW = col?.minWidth ?? 60;
		const maxW = col?.maxWidth ?? Infinity;

		function onMouseMove(e: MouseEvent) {
			const delta = e.clientX - startX;
			const newWidth = Math.min(maxW, Math.max(minW, startWidth + delta));
			columnWidths = { ...columnWidths, [columnKey]: newWidth };
		}

		function onMouseUp() {
			resizeState = null;
		}

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
		return () => {
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
		};
	});

	// ─── Helpers ─────────────────────────────────────────────────────────────────
	function getCellValue(row: T, col: ColumnDef<T>): unknown {
		if (col.accessor) return col.accessor(row);
		return (row as Record<string, unknown>)[col.key];
	}

	function defaultCompare(a: unknown, b: unknown): number {
		if (a === null || a === undefined) return -1;
		if (b === null || b === undefined) return 1;
		if (typeof a === 'number' && typeof b === 'number') return a - b;
		return String(a).localeCompare(String(b));
	}

	function getCellStyle(col: ColumnDef<T>): string {
		const parts: string[] = [];
		const w = columnWidths[col.key] ?? col.width;
		if (w) parts.push(`width: ${w}px`);
		if (col.pin === 'left' && stickyLeftMap[col.key] !== undefined) {
			parts.push(`position: sticky; left: ${stickyLeftMap[col.key]}px; z-index: 2`);
		}
		if (col.pin === 'right' && stickyRightMap[col.key] !== undefined) {
			parts.push(`position: sticky; right: ${stickyRightMap[col.key]}px; z-index: 2`);
		}
		return parts.join('; ');
	}

	// ─── Context ─────────────────────────────────────────────────────────────────
	const ctx: DataTableContext = {
		getSortState: () => effectiveSort,
		getFilterState: () => filterState,
		getColumnWidths: () => columnWidths,
		getHiddenColumns: () => hiddenColumns,
		getSelectedKeys: () => effectiveSelectedKeys,
		getExpandedKeys: () => effectiveExpandedKeys,
		getSelectionMode: () => selectionMode,
		getAllSelected: () => allSelected,
		getSomeSelected: () => someSelected,
		getIsResizing: () => resizeState !== null,
		getStickyLeft: (key) => stickyLeftMap[key],
		getStickyRight: (key) => stickyRightMap[key],
		toggleSort,
		setGlobalFilter,
		setColumnFilter,
		toggleRow: (key) => toggleRow(key),
		toggleAll,
		toggleExpansion,
		toggleColumnVisibility,
		startResize
	};
	setContext<DataTableContext>('data-table', ctx);
</script>

<!-- ARIA live region for screen reader announcements -->
<div role="status" aria-live="polite" aria-atomic="true" class="dt-sr-only">
	{announceMessage}
</div>

<div class="dt-root {className}">
	<!-- Toolbar: global search + column visibility toggle -->
	{#if toolbar}
		{@render toolbar()}
	{:else if filterable || columnVisibility}
		<div class="dt-toolbar">
			{#if filterable}
				<input
					type="search"
					class="dt-search"
					placeholder="Search…"
					value={filterState.global}
					oninput={(e) => setGlobalFilter((e.currentTarget as HTMLInputElement).value)}
					aria-label="Search table"
				/>
			{/if}
			{#if columnVisibility}
				<div class="dt-col-visibility">
					<button class="dt-col-toggle-btn" type="button" aria-label="Toggle columns">
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"><path d="M3 9h18M3 15h18M9 3v18M15 3v18" /></svg
						>
						Columns
					</button>
					<div class="dt-col-dropdown" role="menu">
						{#each columns as col (col.key)}
							<label class="dt-col-option">
								<input
									type="checkbox"
									checked={!hiddenColumns.has(col.key)}
									onchange={() => toggleColumnVisibility(col.key)}
								/>
								{typeof col.header === 'string' ? col.header : col.key}
							</label>
						{/each}
					</div>
				</div>
			{/if}
			{#if toolbarEnd}
				{@render toolbarEnd()}
			{/if}
		</div>
	{/if}

	<div class="dt-wrapper">
		<table
			class="dt-table dt-{variant} dt-size-{size} {columnResizing
				? 'dt-resizable'
				: ''} {stickyHeader ? 'dt-sticky-header' : ''}"
			role="grid"
			aria-rowcount={totalCount}
			aria-busy={loading}
		>
			{#if caption}
				<caption class="dt-caption">{caption}</caption>
			{/if}

			<thead class="dt-thead">
				<tr class="dt-tr">
					<!-- Expand column header -->
					{#if expandable}
						<th
							class="dt-th dt-th-expand"
							role="columnheader"
							aria-label="Expand row"
							style="width: {EXPAND_COL_WIDTH}px"
						></th>
					{/if}
					<!-- Selection column header -->
					{#if selectionMode !== 'none'}
						<th
							class="dt-th dt-th-select"
							role="columnheader"
							style="width: {SELECTION_COL_WIDTH}px"
						>
							{#if selectionMode === 'multi'}
								<input
									type="checkbox"
									class="dt-checkbox"
									checked={allSelected}
									indeterminate={someSelected}
									onchange={toggleAll}
									aria-label="Select all rows"
								/>
							{/if}
						</th>
					{/if}
					{#each visibleColumns as col (col.key)}
						{@const isSortable = sortable && col.sortable !== false}
						{@const currentSort = effectiveSort.find((s) => s.column === col.key)}
						{@const sortIndex = multiSort
							? effectiveSort.findIndex((s) => s.column === col.key)
							: -1}
						<th
							class="dt-th dt-align-{col.align ?? 'left'} {isSortable
								? 'dt-th-sortable'
								: ''} {col.pin ? `dt-pin-${col.pin}` : ''}"
							role="columnheader"
							aria-sort={currentSort
								? currentSort.direction === 'asc'
									? 'ascending'
									: 'descending'
								: isSortable
									? 'none'
									: undefined}
							style={getCellStyle(col)}
							onclick={isSortable ? (e) => toggleSort(col.key, multiSort && e.ctrlKey) : undefined}
							onkeydown={isSortable
								? (e) => {
										if (e.key === 'Enter' || e.key === ' ') {
											e.preventDefault();
											toggleSort(col.key, multiSort && e.ctrlKey);
										}
									}
								: undefined}
							tabindex={isSortable ? 0 : undefined}
						>
							<span class="dt-th-content">
								{#if typeof col.header === 'string'}
									{col.header}
								{:else}
									{@render col.header()}
								{/if}
								{#if isSortable}
									<span class="dt-sort-icon" aria-hidden="true">
										{#if !currentSort}↕{:else if currentSort.direction === 'asc'}↑{:else}↓{/if}
									</span>
									{#if multiSort && sortIndex >= 0}
										<span class="dt-sort-badge">{sortIndex + 1}</span>
									{/if}
								{/if}
							</span>
							{#if col.resizable ?? columnResizing}
								<span
									class="dt-resize-handle"
									aria-hidden="true"
									onmousedown={(e) => {
										e.preventDefault();
										startResize(
											col.key,
											e.clientX,
											columnWidths[col.key] ??
												col.width ??
												(e.currentTarget.closest('th') as HTMLElement)?.offsetWidth ??
												120
										);
									}}
								></span>
							{/if}
						</th>
					{/each}
				</tr>

				<!-- Per-column filter row -->
				{#if columns.some((c) => c.filterable)}
					<tr class="dt-tr dt-filter-row">
						{#if expandable}<td class="dt-td"></td>{/if}
						{#if selectionMode !== 'none'}<td class="dt-td"></td>{/if}
						{#each visibleColumns as col (col.key)}
							<td class="dt-td">
								{#if col.filterable}
									<input
										type="search"
										class="dt-col-filter"
										placeholder="Filter…"
										value={filterState.columns[col.key] ?? ''}
										oninput={(e) =>
											setColumnFilter(col.key, (e.currentTarget as HTMLInputElement).value)}
										aria-label="Filter {typeof col.header === 'string' ? col.header : col.key}"
									/>
								{/if}
							</td>
						{/each}
					</tr>
				{/if}
			</thead>

			<tbody class="dt-tbody">
				{#if loading}
					{#each Array(skeletonRows) as _, i (i)}
						<tr class="dt-tr dt-skeleton-row" aria-rowindex={i + 1}>
							{#if expandable}<td class="dt-td"></td>{/if}
							{#if selectionMode !== 'none'}<td class="dt-td"></td>{/if}
							{#each visibleColumns as col (col.key)}
								<td class="dt-td">
									<span class="dt-skeleton-cell"></span>
								</td>
							{/each}
						</tr>
					{/each}
				{:else if paginatedData.length === 0}
					<tr class="dt-tr">
						<td class="dt-td dt-empty" colspan={totalColumnCount}>
							{#if empty}
								{@render empty()}
							{:else}
								<span class="dt-empty-message">{emptyMessage}</span>
							{/if}
						</td>
					</tr>
				{:else}
					{#each paginatedData as row, rowIndex (getRowKey(row, rowIndex))}
						{@const rowKey = getRowKey(row, rowIndex)}
						{@const isSelected = effectiveSelectedKeys.has(rowKey)}
						{@const isExpanded = effectiveExpandedKeys.has(rowKey)}
						{@const globalRowIndex = paginated
							? (currentPage - 1) * pageSize + rowIndex + 1
							: rowIndex + 1}
						<tr
							class="dt-tr {isSelected ? 'dt-row-selected' : ''}"
							aria-rowindex={globalRowIndex}
							aria-selected={selectionMode !== 'none' ? isSelected : undefined}
							onclick={selectionMode !== 'none'
								? (e) => toggleRow(rowKey, rowIndex, e.shiftKey)
								: undefined}
						>
							<!-- Expand toggle -->
							{#if expandable}
								<td class="dt-td dt-td-expand" style="width: {EXPAND_COL_WIDTH}px">
									<button
										class="dt-expand-btn {isExpanded ? 'dt-expanded' : ''}"
										type="button"
										aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
										aria-expanded={isExpanded}
										onclick={(e) => {
											e.stopPropagation();
											toggleExpansion(rowKey);
										}}
									>
										<svg
											width="12"
											height="12"
											viewBox="0 0 12 12"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
										>
											<path d={isExpanded ? 'M2 4l4 4 4-4' : 'M4 2l4 4-4 4'} />
										</svg>
									</button>
								</td>
							{/if}

							<!-- Selection checkbox -->
							{#if selectionMode !== 'none'}
								<td class="dt-td dt-td-select" style="width: {SELECTION_COL_WIDTH}px">
									<input
										type="checkbox"
										class="dt-checkbox"
										checked={isSelected}
										onchange={(e) => {
											e.stopPropagation();
											toggleRow(rowKey, rowIndex);
										}}
										aria-label="Select row"
									/>
								</td>
							{/if}

							<!-- Data cells -->
							{#each visibleColumns as col (col.key)}
								{@const value = getCellValue(row, col)}
								<td
									class="dt-td dt-align-{col.align ?? 'left'} {col.pin ? `dt-pin-${col.pin}` : ''}"
									role="gridcell"
									style={getCellStyle(col)}
								>
									{#if col.cell}
										{@render col.cell({ row, value, rowIndex, column: col })}
									{:else}
										{value ?? ''}
									{/if}
								</td>
							{/each}
						</tr>

						<!-- Expansion detail row -->
						{#if expandable && isExpanded && expandRow}
							<tr class="dt-tr dt-expansion-row">
								<td class="dt-td dt-expansion-cell" colspan={totalColumnCount}>
									{@render expandRow({ row, rowIndex })}
								</td>
							</tr>
						{/if}
					{/each}
				{/if}
			</tbody>
		</table>
	</div>

	<!-- Pagination footer -->
	{#if paginated}
		<div class="dt-pagination">
			<span class="dt-pagination-info">
				{#if totalCount === 0}
					No results
				{:else}
					Showing {Math.min((currentPage - 1) * pageSize + 1, totalCount)}–{Math.min(
						currentPage * pageSize,
						totalCount
					)} of {totalCount} rows
				{/if}
			</span>
			<div class="dt-pagination-controls">
				<label class="dt-page-size-label">
					Rows per page:
					<select
						class="dt-page-size-select"
						value={pageSize}
						onchange={(e) => {
							pageSize = Number((e.currentTarget as HTMLSelectElement).value);
							currentPage = 1;
							onpagechange?.(1, pageSize);
						}}
					>
						{#each pageSizeOptions as opt (opt)}
							<option value={opt}>{opt}</option>
						{/each}
					</select>
				</label>
				<div class="dt-page-nav">
					<button
						class="dt-page-btn"
						type="button"
						disabled={currentPage === 1}
						aria-label="First page"
						onclick={() => {
							currentPage = 1;
							onpagechange?.(1, pageSize);
						}}>«</button
					>
					<button
						class="dt-page-btn"
						type="button"
						disabled={currentPage === 1}
						aria-label="Previous page"
						onclick={() => {
							currentPage -= 1;
							onpagechange?.(currentPage, pageSize);
						}}>‹</button
					>
					<span class="dt-page-indicator">Page {currentPage} of {totalPages}</span>
					<button
						class="dt-page-btn"
						type="button"
						disabled={currentPage === totalPages}
						aria-label="Next page"
						onclick={() => {
							currentPage += 1;
							onpagechange?.(currentPage, pageSize);
						}}>›</button
					>
					<button
						class="dt-page-btn"
						type="button"
						disabled={currentPage === totalPages}
						aria-label="Last page"
						onclick={() => {
							currentPage = totalPages;
							onpagechange?.(totalPages, pageSize);
						}}>»</button
					>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	/* ── Screen reader only ──────────────────────────────────────────────── */
	.dt-sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	/* ── Root ────────────────────────────────────────────────────────────── */
	.dt-root {
		display: flex;
		flex-direction: column;
		gap: 0;
		font-family: inherit;
		font-size: var(--font-size-md, 14px);
		color: var(--color-gray-900, #111827);
	}

	/* ── Toolbar ─────────────────────────────────────────────────────────── */
	.dt-toolbar {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 4px;
		flex-wrap: wrap;
	}

	.dt-search {
		flex: 1;
		min-width: 160px;
		max-width: 320px;
		padding: 6px 10px;
		border: 1px solid var(--color-gray-300, #d1d5db);
		border-radius: var(--radius-md, 6px);
		font-size: inherit;
		background: var(--color-white, #fff);
		outline: none;
		transition: border-color var(--transition-base, 0.2s);
	}
	.dt-search:focus {
		border-color: var(--color-blue-500, #3b82f6);
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
	}

	/* ── Column visibility ───────────────────────────────────────────────── */
	.dt-col-visibility {
		position: relative;
	}
	.dt-col-toggle-btn {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 6px 12px;
		border: 1px solid var(--color-gray-300, #d1d5db);
		border-radius: var(--radius-md, 6px);
		background: var(--color-white, #fff);
		font-size: inherit;
		cursor: pointer;
		color: inherit;
		transition: background var(--transition-base, 0.2s);
	}
	.dt-col-toggle-btn:hover {
		background: var(--color-gray-50, #f9fafb);
	}
	.dt-col-dropdown {
		display: none;
		position: absolute;
		top: calc(100% + 4px);
		left: 0;
		z-index: var(--z-dropdown, 1000);
		min-width: 180px;
		background: var(--color-white, #fff);
		border: 1px solid var(--color-gray-200, #e5e7eb);
		border-radius: var(--radius-md, 6px);
		box-shadow: var(--shadow-md, 0 4px 6px rgba(0, 0, 0, 0.1));
		padding: 6px 0;
	}
	.dt-col-visibility:focus-within .dt-col-dropdown,
	.dt-col-visibility:hover .dt-col-dropdown {
		display: block;
	}
	.dt-col-option {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 6px 14px;
		cursor: pointer;
		font-size: inherit;
		white-space: nowrap;
	}
	.dt-col-option:hover {
		background: var(--color-gray-50, #f9fafb);
	}

	/* ── Table wrapper ───────────────────────────────────────────────────── */
	.dt-wrapper {
		overflow-x: auto;
		border-radius: var(--radius-md, 6px);
		border: 1px solid var(--color-gray-200, #e5e7eb);
	}

	/* ── Table ───────────────────────────────────────────────────────────── */
	.dt-table {
		width: 100%;
		border-collapse: collapse;
		border-spacing: 0;
		table-layout: auto;
	}
	.dt-resizable {
		table-layout: fixed;
	}

	/* ── Thead ───────────────────────────────────────────────────────────── */
	.dt-thead {
		background: var(--color-gray-50, #f9fafb);
	}
	.dt-sticky-header .dt-thead .dt-tr:first-child .dt-th {
		position: sticky;
		top: 0;
		z-index: 3;
		background: var(--color-gray-50, #f9fafb);
	}

	/* ── TH ──────────────────────────────────────────────────────────────── */
	.dt-th {
		padding: 10px 12px;
		font-weight: 600;
		font-size: 0.8125em;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--color-gray-600, #4b5563);
		white-space: nowrap;
		user-select: none;
		position: relative;
		background: inherit;
	}
	.dt-th-sortable {
		cursor: pointer;
	}
	.dt-th-sortable:hover {
		color: var(--color-gray-900, #111827);
		background: var(--color-gray-100, #f3f4f6);
	}
	.dt-th-sortable:focus-visible {
		outline: 2px solid var(--color-blue-500, #3b82f6);
		outline-offset: -2px;
	}
	.dt-th-content {
		display: inline-flex;
		align-items: center;
		gap: 4px;
	}

	/* ── Sort icons ──────────────────────────────────────────────────────── */
	.dt-sort-icon {
		font-size: 0.8em;
		opacity: 0.5;
	}
	.dt-th-sortable:hover .dt-sort-icon,
	[aria-sort='ascending'] .dt-sort-icon,
	[aria-sort='descending'] .dt-sort-icon {
		opacity: 1;
	}
	[aria-sort='ascending'] .dt-sort-icon,
	[aria-sort='descending'] .dt-sort-icon {
		color: var(--color-blue-600, #2563eb);
	}
	.dt-sort-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: var(--color-blue-100, #dbeafe);
		color: var(--color-blue-700, #1d4ed8);
		font-size: 0.7em;
		font-weight: 700;
	}

	/* ── Resize handle ───────────────────────────────────────────────────── */
	.dt-resize-handle {
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		width: 4px;
		cursor: col-resize;
		background: transparent;
		transition: background var(--transition-fast, 0.1s);
	}
	.dt-resize-handle:hover,
	.dt-resizing .dt-resize-handle {
		background: var(--color-blue-400, #60a5fa);
	}

	/* ── TD ──────────────────────────────────────────────────────────────── */
	.dt-td {
		padding: 10px 12px;
		vertical-align: middle;
		background: inherit;
	}

	/* ── Size variants ───────────────────────────────────────────────────── */
	.dt-size-xs .dt-th,
	.dt-size-xs .dt-td {
		padding: 4px 8px;
		font-size: 0.75rem;
	}
	.dt-size-sm .dt-th,
	.dt-size-sm .dt-td {
		padding: 6px 10px;
		font-size: 0.8125rem;
	}
	.dt-size-md .dt-th,
	.dt-size-md .dt-td {
		padding: 10px 12px;
		font-size: 0.875rem;
	}
	.dt-size-lg .dt-th,
	.dt-size-lg .dt-td {
		padding: 14px 16px;
		font-size: 0.9375rem;
	}
	.dt-size-xl .dt-th,
	.dt-size-xl .dt-td {
		padding: 18px 20px;
		font-size: 1rem;
	}

	/* ── Alignment ───────────────────────────────────────────────────────── */
	.dt-align-left {
		text-align: left;
	}
	.dt-align-center {
		text-align: center;
	}
	.dt-align-right {
		text-align: right;
	}

	/* ── Table variants ──────────────────────────────────────────────────── */
	/* simple: only horizontal dividers */
	.dt-simple .dt-tbody .dt-tr:not(:last-child) .dt-td {
		border-bottom: 1px solid var(--color-gray-100, #f3f4f6);
	}
	.dt-simple .dt-thead .dt-th {
		border-bottom: 2px solid var(--color-gray-200, #e5e7eb);
	}

	/* striped: alternating row bg */
	.dt-striped .dt-thead .dt-th {
		border-bottom: 2px solid var(--color-gray-200, #e5e7eb);
	}
	.dt-striped .dt-tbody .dt-tr:nth-child(even) {
		background: var(--color-gray-50, #f9fafb);
	}
	.dt-striped .dt-tbody .dt-tr:not(:last-child) .dt-td {
		border-bottom: 1px solid var(--color-gray-100, #f3f4f6);
	}

	/* bordered: full grid lines */
	.dt-bordered .dt-th,
	.dt-bordered .dt-td {
		border: 1px solid var(--color-gray-200, #e5e7eb);
	}
	.dt-bordered .dt-thead .dt-th {
		border-bottom-width: 2px;
	}

	/* ── Row states ──────────────────────────────────────────────────────── */
	.dt-tbody .dt-tr {
		transition: background var(--transition-fast, 0.1s);
	}
	.dt-tbody .dt-tr:hover {
		background: var(--color-gray-50, #f9fafb);
	}
	.dt-tbody .dt-tr.dt-row-selected {
		background: var(--color-blue-50, #eff6ff);
	}
	.dt-tbody .dt-tr.dt-row-selected:hover {
		background: var(--color-blue-100, #dbeafe);
	}

	/* ── Pinned columns ──────────────────────────────────────────────────── */
	.dt-pin-left,
	.dt-pin-right {
		background: inherit;
		z-index: 2;
	}
	.dt-thead .dt-pin-left,
	.dt-thead .dt-pin-right {
		z-index: 3;
	}

	/* ── Expand button ───────────────────────────────────────────────────── */
	.dt-td-expand,
	.dt-th-expand {
		width: 48px;
		padding: 0;
		text-align: center;
	}
	.dt-expand-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border: none;
		border-radius: var(--radius-md, 6px);
		background: transparent;
		cursor: pointer;
		color: var(--color-gray-500, #6b7280);
		transition:
			background var(--transition-fast, 0.1s),
			transform var(--transition-base, 0.2s);
	}
	.dt-expand-btn:hover {
		background: var(--color-gray-100, #f3f4f6);
		color: var(--color-gray-900, #111827);
	}
	.dt-expand-btn.dt-expanded {
		transform: rotate(0deg);
	}
	.dt-expansion-cell {
		padding: 0;
	}

	/* ── Selection ───────────────────────────────────────────────────────── */
	.dt-td-select,
	.dt-th-select {
		width: 48px;
		padding: 0;
		text-align: center;
	}
	.dt-checkbox {
		cursor: pointer;
		width: 16px;
		height: 16px;
	}

	/* ── Filter row ──────────────────────────────────────────────────────── */
	.dt-filter-row .dt-td {
		padding: 4px 8px;
	}
	.dt-col-filter {
		width: 100%;
		padding: 4px 8px;
		border: 1px solid var(--color-gray-200, #e5e7eb);
		border-radius: var(--radius-sm, 4px);
		font-size: 0.8125em;
		background: var(--color-white, #fff);
		outline: none;
	}
	.dt-col-filter:focus {
		border-color: var(--color-blue-500, #3b82f6);
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);
	}

	/* ── Empty state ─────────────────────────────────────────────────────── */
	.dt-empty {
		text-align: center;
		padding: 48px 24px;
		color: var(--color-gray-400, #9ca3af);
	}
	.dt-empty-message {
		font-size: 0.9375rem;
	}

	/* ── Skeleton loading ────────────────────────────────────────────────── */
	.dt-skeleton-row {
		pointer-events: none;
	}
	.dt-skeleton-cell {
		display: block;
		height: 16px;
		border-radius: var(--radius-sm, 4px);
		background: linear-gradient(
			90deg,
			var(--color-gray-100, #f3f4f6) 25%,
			var(--color-gray-200, #e5e7eb) 50%,
			var(--color-gray-100, #f3f4f6) 75%
		);
		background-size: 200% 100%;
		animation: dt-shimmer 1.5s infinite;
	}
	@keyframes dt-shimmer {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}

	/* ── Caption ─────────────────────────────────────────────────────────── */
	.dt-caption {
		padding: 8px 12px;
		font-size: 0.875rem;
		color: var(--color-gray-500, #6b7280);
		text-align: left;
		caption-side: bottom;
	}

	/* ── Pagination ──────────────────────────────────────────────────────── */
	.dt-pagination {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 8px;
		padding: 10px 4px;
		font-size: 0.875rem;
		color: var(--color-gray-600, #4b5563);
	}
	.dt-pagination-info {
		white-space: nowrap;
	}
	.dt-pagination-controls {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
	}
	.dt-page-size-label {
		display: flex;
		align-items: center;
		gap: 6px;
		white-space: nowrap;
	}
	.dt-page-size-select {
		padding: 4px 8px;
		border: 1px solid var(--color-gray-300, #d1d5db);
		border-radius: var(--radius-sm, 4px);
		background: var(--color-white, #fff);
		font-size: inherit;
		cursor: pointer;
	}
	.dt-page-nav {
		display: flex;
		align-items: center;
		gap: 4px;
	}
	.dt-page-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 30px;
		height: 30px;
		padding: 0 8px;
		border: 1px solid var(--color-gray-300, #d1d5db);
		border-radius: var(--radius-sm, 4px);
		background: var(--color-white, #fff);
		font-size: 0.9375rem;
		cursor: pointer;
		color: inherit;
		transition: background var(--transition-fast, 0.1s);
	}
	.dt-page-btn:hover:not(:disabled) {
		background: var(--color-gray-50, #f9fafb);
	}
	.dt-page-btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}
	.dt-page-btn:focus-visible {
		outline: 2px solid var(--color-blue-500, #3b82f6);
		outline-offset: 1px;
	}
	.dt-page-indicator {
		white-space: nowrap;
		font-size: 0.875rem;
	}
</style>
