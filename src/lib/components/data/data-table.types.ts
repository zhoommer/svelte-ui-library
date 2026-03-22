import type { Snippet } from 'svelte';
import type { Size } from '$lib/types.js';

export type SortDirection = 'asc' | 'desc';

export interface SortState {
	column: string;
	direction: SortDirection;
}

export interface FilterState {
	global: string;
	columns: Record<string, string>;
}

export interface PaginationState {
	page: number;
	pageSize: number;
}

export interface ResizeState {
	columnKey: string;
	startX: number;
	startWidth: number;
}

export interface CellContext<T> {
	row: T;
	value: unknown;
	rowIndex: number;
	column: ColumnDef<T>;
}

export interface ColumnDef<T> {
	/** Unique identifier; used as key accessor if no `accessor` provided. */
	key: string;
	/** Column header label or custom Snippet. */
	header: string | Snippet;
	/** Custom cell renderer. Receives CellContext. */
	cell?: Snippet<[CellContext<T>]>;
	/** Derive cell value from row; falls back to (row as any)[key]. */
	accessor?: (row: T) => unknown;

	// Sorting
	sortable?: boolean;
	/** Custom comparator. Return negative/0/positive like Array.sort. */
	sortComparator?: (a: T, b: T, direction: SortDirection) => number;

	// Filtering
	filterable?: boolean;
	/** Custom per-column filter function. Defaults to string includes. */
	filterFn?: (row: T, value: string) => boolean;

	// Dimensions
	/** Initial pixel width. */
	width?: number;
	/** Minimum pixel width during resize. Default: 60. */
	minWidth?: number;
	/** Maximum pixel width during resize. */
	maxWidth?: number;
	/** Inherits DataTableProps.columnResizing if not set. */
	resizable?: boolean;

	// Layout
	pin?: 'left' | 'right';
	hidden?: boolean;
	align?: 'left' | 'center' | 'right';
}

export interface DataTableContext {
	// Reactive getters
	getSortState: () => SortState[];
	getFilterState: () => FilterState;
	getColumnWidths: () => Record<string, number>;
	getHiddenColumns: () => Set<string>;
	getSelectedKeys: () => Set<string>;
	getExpandedKeys: () => Set<string>;
	getSelectionMode: () => 'none' | 'single' | 'multi';
	getAllSelected: () => boolean;
	getSomeSelected: () => boolean;
	getIsResizing: () => boolean;
	getStickyLeft: (columnKey: string) => number | undefined;
	getStickyRight: (columnKey: string) => number | undefined;

	// Actions
	toggleSort: (columnKey: string, multi: boolean) => void;
	setGlobalFilter: (value: string) => void;
	setColumnFilter: (columnKey: string, value: string) => void;
	toggleRow: (key: string) => void;
	toggleAll: () => void;
	toggleExpansion: (key: string) => void;
	toggleColumnVisibility: (columnKey: string) => void;
	startResize: (columnKey: string, startX: number, startWidth: number) => void;
}

export interface DataTableProps<T> {
	// Data
	data: T[];
	columns: ColumnDef<T>[];
	getRowKey?: (row: T, index: number) => string;

	// Sorting
	sortable?: boolean;
	sort?: SortState | SortState[];
	multiSort?: boolean;
	onsortchange?: (sort: SortState[]) => void;

	// Filtering
	filterable?: boolean;
	filterDebounce?: number;

	// Pagination
	paginated?: boolean;
	pageSize?: number;
	pageSizeOptions?: number[];
	/** For server-side pagination. Omit for client-side (uses data.length). */
	totalRows?: number;
	onpagechange?: (page: number, pageSize: number) => void;

	// Selection
	selectionMode?: 'none' | 'single' | 'multi';
	selectedKeys?: Set<string>;
	onselectionchange?: (keys: Set<string>, rows: T[]) => void;

	// Row expansion
	expandable?: boolean;
	expandedKeys?: Set<string>;
	expandRow?: Snippet<[{ row: T; rowIndex: number }]>;
	onexpansionchange?: (keys: Set<string>) => void;

	// Loading / empty
	loading?: boolean;
	skeletonRows?: number;
	empty?: Snippet;
	emptyMessage?: string;

	// Column features
	columnResizing?: boolean;
	columnVisibility?: boolean;

	// Style
	variant?: 'simple' | 'striped' | 'bordered';
	size?: Size;
	stickyHeader?: boolean;
	caption?: string;

	// Slots
	toolbar?: Snippet;
	toolbarEnd?: Snippet;

	// HTML
	class?: string;
}
