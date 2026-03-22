<script lang="ts">
	import DataTable from '$lib/components/data/data-table.svelte';
	import type { ColumnDef, SortState } from '$lib/components/data/data-table.types.js';
	import { users, type User, type UserStatus, type UserRole } from './sample-data.js';

	// ─── Basic columns ───────────────────────────────────────────────────────────
	const basicColumns: ColumnDef<User>[] = [
		{ key: 'id', header: 'ID', width: 60, align: 'right' },
		{ key: 'name', header: 'Name' },
		{ key: 'email', header: 'Email' },
		{ key: 'department', header: 'Department' },
		{ key: 'role', header: 'Role' }
	];

	// ─── Full-featured columns ───────────────────────────────────────────────────
	const fullColumns: ColumnDef<User>[] = [
		{
			key: 'id',
			header: 'ID',
			width: 60,
			align: 'right',
			sortable: true,
			pin: 'left',
			accessor: (r) => Number(r.id)
		},
		{
			key: 'name',
			header: 'Name',
			sortable: true,
			filterable: true,
			width: 160,
			pin: 'left',
			minWidth: 100
		},
		{
			key: 'email',
			header: 'Email',
			sortable: true,
			filterable: true,
			width: 220,
			resizable: true
		},
		{
			key: 'role',
			header: 'Role',
			sortable: true,
			filterable: true,
			width: 100,
			resizable: true
		},
		{
			key: 'status',
			header: 'Status',
			sortable: true,
			width: 110,
			resizable: true
		},
		{
			key: 'department',
			header: 'Department',
			sortable: true,
			filterable: true,
			width: 130,
			resizable: true
		},
		{
			key: 'salary',
			header: 'Salary',
			sortable: true,
			align: 'right',
			width: 110,
			resizable: true,
			accessor: (r) => r.salary
		},
		{
			key: 'joinedAt',
			header: 'Joined',
			sortable: true,
			width: 110,
			resizable: true,
			pin: 'right'
		}
	];

	// ─── Status badge helper ─────────────────────────────────────────────────────
	const statusColors: Record<UserStatus, string> = {
		active: '#22c55e',
		inactive: '#9ca3af',
		pending: '#f59e0b',
		suspended: '#ef4444'
	};
	const roleColors: Record<UserRole, string> = {
		admin: '#a855f7',
		owner: '#3b82f6',
		editor: '#14b8a6',
		viewer: '#6b7280'
	};

	// ─── Controlled examples ─────────────────────────────────────────────────────
	let controlledSort = $state<SortState[]>([{ column: 'name', direction: 'asc' }]);
	let selectedKeys = $state(new Set<string>());
	let expandedKeys = $state(new Set<string>());
	let loading = $state(false);

	function simulateLoading() {
		loading = true;
		setTimeout(() => (loading = false), 2000);
	}
</script>

<svelte:head><title>DataTable — Component Docs</title></svelte:head>

<div class="page">
	<h1>DataTable</h1>
	<p class="lead">
		A fully-featured data grid component with sorting, filtering, pagination, selection, column
		resizing, pinned columns, row expansion, and full accessibility.
	</p>

	<!-- ── 1. Basic ──────────────────────────────────────────────────────────── -->
	<section>
		<h2>Basic</h2>
		<p>Minimal setup — pass <code>data</code> and <code>columns</code>.</p>
		<div class="demo">
			<DataTable data={users.slice(0, 5)} columns={basicColumns} />
		</div>
	</section>

	<!-- ── 2. Variants ───────────────────────────────────────────────────────── -->
	<section>
		<h2>Variants</h2>
		<div class="demo grid-3">
			<div>
				<p class="label">simple (default)</p>
				<DataTable data={users.slice(0, 4)} columns={basicColumns} variant="simple" />
			</div>
			<div>
				<p class="label">striped</p>
				<DataTable data={users.slice(0, 4)} columns={basicColumns} variant="striped" />
			</div>
			<div>
				<p class="label">bordered</p>
				<DataTable data={users.slice(0, 4)} columns={basicColumns} variant="bordered" />
			</div>
		</div>
	</section>

	<!-- ── 3. Sizes ──────────────────────────────────────────────────────────── -->
	<section>
		<h2>Sizes</h2>
		<div class="demo col-gap">
			{#each ['xs', 'sm', 'md', 'lg', 'xl'] as s}
				<div>
					<p class="label">size="{s}"</p>
					<DataTable data={users.slice(0, 3)} columns={basicColumns} size={s as any} />
				</div>
			{/each}
		</div>
	</section>

	<!-- ── 4. Sorting ────────────────────────────────────────────────────────── -->
	<section>
		<h2>Sorting</h2>
		<p>Enable <code>sortable</code> globally, or per-column via <code>ColumnDef.sortable</code>.</p>
		<div class="demo">
			<DataTable
				data={users.slice(0, 10)}
				columns={[
					{ key: 'name', header: 'Name', sortable: true },
					{ key: 'department', header: 'Department', sortable: true },
					{
						key: 'salary',
						header: 'Salary',
						sortable: true,
						align: 'right',
						accessor: (r) => r.salary
					},
					{ key: 'joinedAt', header: 'Joined', sortable: true }
				]}
				sortable
			/>
		</div>
	</section>

	<!-- ── 5. Multi-sort ─────────────────────────────────────────────────────── -->
	<section>
		<h2>Multi-column Sort</h2>
		<p>Hold <kbd>Ctrl</kbd> while clicking a column header to add it to the sort.</p>
		<div class="demo">
			<DataTable
				data={users.slice(0, 15)}
				columns={[
					{ key: 'department', header: 'Department', sortable: true },
					{ key: 'role', header: 'Role', sortable: true },
					{ key: 'name', header: 'Name', sortable: true },
					{
						key: 'salary',
						header: 'Salary',
						sortable: true,
						align: 'right',
						accessor: (r) => r.salary
					}
				]}
				sortable
				multiSort
				bind:sort={controlledSort as any}
			/>
		</div>
	</section>

	<!-- ── 6. Filtering ──────────────────────────────────────────────────────── -->
	<section>
		<h2>Global Search</h2>
		<p>Enable <code>filterable</code> to show a search box above the table.</p>
		<div class="demo">
			<DataTable
				data={users}
				columns={[
					{ key: 'name', header: 'Name', sortable: true },
					{ key: 'email', header: 'Email' },
					{ key: 'department', header: 'Department', sortable: true },
					{ key: 'role', header: 'Role' }
				]}
				filterable
				sortable
				paginated
				pageSize={10}
			/>
		</div>
	</section>

	<!-- ── 7. Per-column filter ───────────────────────────────────────────────── -->
	<section>
		<h2>Per-column Filters</h2>
		<p>Set <code>filterable: true</code> on individual columns for inline filter inputs.</p>
		<div class="demo">
			<DataTable
				data={users}
				columns={[
					{ key: 'name', header: 'Name', sortable: true, filterable: true },
					{ key: 'email', header: 'Email', filterable: true },
					{ key: 'department', header: 'Department', sortable: true, filterable: true },
					{ key: 'role', header: 'Role', filterable: true }
				]}
				sortable
				paginated
				pageSize={10}
			/>
		</div>
	</section>

	<!-- ── 8. Pagination ─────────────────────────────────────────────────────── -->
	<section>
		<h2>Pagination</h2>
		<div class="demo">
			<DataTable
				data={users}
				columns={basicColumns}
				paginated
				pageSize={10}
				pageSizeOptions={[5, 10, 25, 50]}
				sortable
			/>
		</div>
	</section>

	<!-- ── 9. Row selection (multi) ──────────────────────────────────────────── -->
	<section>
		<h2>Row Selection — Multi</h2>
		<p>
			Hold <kbd>Shift</kbd> to range-select. Selected: <strong>{selectedKeys.size}</strong> rows.
		</p>
		<div class="demo">
			<DataTable
				data={users.slice(0, 15)}
				columns={basicColumns}
				selectionMode="multi"
				bind:selectedKeys
				onselectionchange={(keys) => (selectedKeys = keys)}
			/>
		</div>
		<button class="btn-sm" onclick={() => (selectedKeys = new Set())}>Clear selection</button>
	</section>

	<!-- ── 10. Row selection (single) ────────────────────────────────────────── -->
	<section>
		<h2>Row Selection — Single</h2>
		<div class="demo">
			<DataTable data={users.slice(0, 8)} columns={basicColumns} selectionMode="single" />
		</div>
	</section>

	<!-- ── 11. Custom cell rendering ─────────────────────────────────────────── -->
	<section>
		<h2>Custom Cell Rendering</h2>
		<p>Use the <code>cell</code> Snippet on a column for fully custom content.</p>
		<div class="demo">
			<DataTable
				data={users.slice(0, 10)}
				columns={[
					{ key: 'name', header: 'Name', sortable: true },
					{
						key: 'status',
						header: 'Status',
						sortable: true,
						cell: status_cell
					},
					{
						key: 'role',
						header: 'Role',
						cell: role_cell
					},
					{
						key: 'salary',
						header: 'Salary',
						align: 'right',
						accessor: (r) => r.salary,
						cell: salary_cell
					}
				]}
				sortable
			/>
		</div>
	</section>

	<!-- ── 12. Column resizing ────────────────────────────────────────────────── -->
	<section>
		<h2>Column Resizing</h2>
		<p>Drag the edge of any column header to resize.</p>
		<div class="demo">
			<DataTable
				data={users.slice(0, 8)}
				columns={[
					{ key: 'name', header: 'Name', width: 160, minWidth: 80 },
					{ key: 'email', header: 'Email', width: 240, minWidth: 120 },
					{ key: 'department', header: 'Department', width: 160, minWidth: 80 },
					{ key: 'role', header: 'Role', width: 100, minWidth: 60 }
				]}
				columnResizing
			/>
		</div>
	</section>

	<!-- ── 13. Column visibility ──────────────────────────────────────────────── -->
	<section>
		<h2>Column Visibility</h2>
		<p>Click the <em>Columns</em> button to show/hide columns.</p>
		<div class="demo">
			<DataTable
				data={users.slice(0, 8)}
				columns={[
					{ key: 'name', header: 'Name' },
					{ key: 'email', header: 'Email' },
					{ key: 'role', header: 'Role' },
					{ key: 'status', header: 'Status' },
					{ key: 'department', header: 'Department' },
					{ key: 'salary', header: 'Salary', hidden: true }
				]}
				columnVisibility
			/>
		</div>
	</section>

	<!-- ── 14. Pinned columns ─────────────────────────────────────────────────── -->
	<section>
		<h2>Pinned Columns</h2>
		<p>
			Columns with <code>pin: 'left'</code> or <code>pin: 'right'</code> stay visible during horizontal
			scroll.
		</p>
		<div class="demo">
			<DataTable
				data={users.slice(0, 8)}
				columns={[
					{ key: 'id', header: 'ID', width: 60, pin: 'left', align: 'right' },
					{ key: 'name', header: 'Name', width: 160, pin: 'left' },
					{ key: 'email', header: 'Email', width: 220 },
					{ key: 'department', header: 'Department', width: 150 },
					{ key: 'status', header: 'Status', width: 110 },
					{ key: 'salary', header: 'Salary', width: 110, align: 'right' },
					{ key: 'joinedAt', header: 'Joined', width: 110 },
					{ key: 'role', header: 'Role', width: 110, pin: 'right' }
				]}
				columnResizing
			/>
		</div>
	</section>

	<!-- ── 15. Row expansion ──────────────────────────────────────────────────── -->
	<section>
		<h2>Row Expansion</h2>
		<p>Set <code>expandable</code> and provide an <code>expandRow</code> Snippet.</p>
		<div class="demo">
			<DataTable
				data={users.slice(0, 8)}
				columns={basicColumns}
				expandable
				bind:expandedKeys
				expandRow={expand_snippet}
			/>
		</div>
	</section>

	<!-- ── 16. Loading state ──────────────────────────────────────────────────── -->
	<section>
		<h2>Loading State</h2>
		<button class="btn-sm" onclick={simulateLoading}>Simulate 2s load</button>
		<div class="demo" style="margin-top: 12px">
			<DataTable data={users.slice(0, 5)} columns={basicColumns} {loading} skeletonRows={5} />
		</div>
	</section>

	<!-- ── 17. Empty state ────────────────────────────────────────────────────── -->
	<section>
		<h2>Empty State</h2>
		<div class="demo">
			<DataTable data={[]} columns={basicColumns} emptyMessage="No users found." />
		</div>
	</section>

	<!-- ── 18. Sticky header ──────────────────────────────────────────────────── -->
	<section>
		<h2>Sticky Header</h2>
		<div class="demo" style="max-height: 260px; overflow-y: auto;">
			<DataTable data={users.slice(0, 30)} columns={basicColumns} stickyHeader />
		</div>
	</section>

	<!-- ── 19. Caption ────────────────────────────────────────────────────────── -->
	<section>
		<h2>Caption</h2>
		<div class="demo">
			<DataTable
				data={users.slice(0, 5)}
				columns={basicColumns}
				caption="Table 1 — Sample user data from the demo dataset."
			/>
		</div>
	</section>

	<!-- ── 20. Full-featured ──────────────────────────────────────────────────── -->
	<section>
		<h2>Full-featured</h2>
		<p>
			All features enabled: sorting, multi-sort, global search, per-column filters, pagination,
			multi-selection, column resizing, column visibility, pinned columns, and row expansion.
		</p>
		<div class="demo">
			<DataTable
				data={users}
				columns={fullColumns}
				getRowKey={(r) => r.id}
				sortable
				multiSort
				filterable
				paginated
				pageSize={10}
				pageSizeOptions={[10, 25, 50]}
				selectionMode="multi"
				columnResizing
				columnVisibility
				expandable
				expandRow={expand_snippet}
				variant="striped"
			/>
		</div>
	</section>
</div>

<!-- ── Snippets ────────────────────────────────────────────────────────────── -->
{#snippet status_cell({ value }: { value: unknown; row: User; rowIndex: number; column: any })}
	{@const s = value as User['status']}
	<span
		class="badge"
		style="background: {statusColors[s]}20; color: {statusColors[
			s
		]}; border: 1px solid {statusColors[s]}40"
	>
		{s}
	</span>
{/snippet}

{#snippet role_cell({ value }: { value: unknown; row: User; rowIndex: number; column: any })}
	{@const r = value as User['role']}
	<span
		class="badge"
		style="background: {roleColors[r]}20; color: {roleColors[r]}; border: 1px solid {roleColors[
			r
		]}40"
	>
		{r}
	</span>
{/snippet}

{#snippet salary_cell({ value }: { value: unknown; row: User; rowIndex: number; column: any })}
	<span style="font-variant-numeric: tabular-nums; font-weight: 500;">
		${(value as number).toLocaleString()}
	</span>
{/snippet}

{#snippet expand_snippet({ row }: { row: User; rowIndex: number })}
	<div class="expand-detail">
		<div><strong>Email:</strong> {row.email}</div>
		<div><strong>Department:</strong> {row.department}</div>
		<div><strong>Salary:</strong> ${row.salary.toLocaleString()}</div>
		<div><strong>Joined:</strong> {row.joinedAt}</div>
		<div><strong>Status:</strong> {row.status}</div>
	</div>
{/snippet}

<style>
	.page {
		max-width: 960px;
		margin: 0 auto;
		padding: 40px 24px;
		font-family: system-ui, sans-serif;
	}
	h1 {
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 8px;
	}
	h2 {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0 0 8px;
	}
	.lead {
		color: #6b7280;
		font-size: 1rem;
		margin-bottom: 32px;
	}
	section {
		margin-bottom: 48px;
		padding-bottom: 48px;
		border-bottom: 1px solid #f3f4f6;
	}
	section:last-child {
		border-bottom: none;
	}
	p {
		color: #374151;
		margin: 0 0 12px;
		font-size: 0.9375rem;
	}
	code {
		background: #f3f4f6;
		border-radius: 4px;
		padding: 2px 5px;
		font-size: 0.875em;
		font-family: monospace;
	}
	kbd {
		background: #e5e7eb;
		border-radius: 4px;
		padding: 1px 5px;
		font-size: 0.8125em;
		font-family: monospace;
		border: 1px solid #d1d5db;
	}
	.demo {
		margin-top: 12px;
	}
	.grid-3 {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 20px;
	}
	.col-gap {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	.label {
		font-size: 0.8125rem;
		color: #6b7280;
		margin: 0 0 6px;
		font-family: monospace;
	}

	.badge {
		display: inline-block;
		padding: 2px 8px;
		border-radius: 9999px;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: capitalize;
	}
	.expand-detail {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 8px 24px;
		padding: 16px;
		background: #f9fafb;
		font-size: 0.875rem;
		color: #374151;
	}
	.btn-sm {
		padding: 6px 14px;
		border: 1px solid #d1d5db;
		border-radius: 6px;
		background: #fff;
		font-size: 0.875rem;
		cursor: pointer;
		transition: background 0.15s;
	}
	.btn-sm:hover {
		background: #f9fafb;
	}
</style>
