<script lang="ts">
	import type { Size } from '$lib/types.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type TableVariant = 'simple' | 'striped' | 'bordered';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		variant?: TableVariant;
		size?: Size;
		stickyHeader?: boolean;
		caption?: string;
		children: Snippet;
	}

	let {
		variant = 'simple',
		size = 'md',
		stickyHeader = false,
		caption,
		children,
		class: className,
		...restProps
	}: Props = $props();
</script>

<div class="table-wrapper {className || ''}" {...restProps}>
	<table class="table table-{variant} table-{size} {stickyHeader ? 'table-sticky' : ''}">
		{#if caption}
			<caption class="table-caption">{caption}</caption>
		{/if}
		{@render children()}
	</table>
</div>

<style>
	.table-wrapper {
		width: 100%;
		overflow-x: auto;
	}

	.table {
		width: 100%;
		border-collapse: collapse;
		font-size: 14px;
		color: #374151;
	}

	.table-caption {
		text-align: left;
		font-size: 14px;
		font-weight: 600;
		color: #111827;
		margin-bottom: 8px;
		caption-side: top;
		padding-bottom: 8px;
	}

	/* Sizes — cell padding */
	.table-xs :global(th), .table-xs :global(td) { padding: 4px 8px; }
	.table-sm :global(th), .table-sm :global(td) { padding: 6px 12px; }
	.table-md :global(th), .table-md :global(td) { padding: 10px 16px; }
	.table-lg :global(th), .table-lg :global(td) { padding: 14px 20px; }
	.table-xl :global(th), .table-xl :global(td) { padding: 18px 24px; }

	/* Header */
	.table :global(thead th) {
		font-weight: 600;
		text-align: left;
		color: #6b7280;
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		background: #f9fafb;
		border-bottom: 1px solid #e5e7eb;
	}

	/* Body rows */
	.table :global(tbody tr) {
		border-bottom: 1px solid #f3f4f6;
		transition: background 0.1s ease;
	}

	.table :global(tbody tr:last-child) {
		border-bottom: none;
	}

	.table :global(tbody tr:hover) {
		background: #f9fafb;
	}

	/* Striped */
	.table-striped :global(tbody tr:nth-child(even)) {
		background: #f9fafb;
	}

	/* Bordered */
	.table-bordered :global(th), .table-bordered :global(td) {
		border: 1px solid #e5e7eb;
	}

	/* Sticky header */
	.table-sticky :global(thead th) {
		position: sticky;
		top: 0;
		z-index: 1;
	}
</style>
