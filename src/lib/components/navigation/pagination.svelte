<script lang="ts">
	import type { Color, Size, Variant } from '$lib/types.js';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLElement> {
		total: number;
		page?: number;
		siblings?: number;
		boundaries?: number;
		size?: Size;
		variant?: Extract<Variant, 'solid' | 'outline' | 'ghost'>;
		color?: Color;
		onpagechange?: (page: number) => void;
	}

	let {
		total,
		page = $bindable(1),
		siblings = 1,
		boundaries = 1,
		size = 'md',
		variant = 'outline',
		color = 'blue',
		onpagechange,
		class: className,
		...restProps
	}: Props = $props();

	const colorMap: Record<string, string> = {
		gray: '#6b7280', red: '#ef4444', green: '#22c55e', blue: '#3b82f6',
		teal: '#14b8a6', pink: '#ec4899', purple: '#a855f7', cyan: '#06b6d4',
		orange: '#f97316', yellow: '#eab308'
	};

	const sizeMap: Record<Size, { padding: string; fontSize: string; minWidth: string }> = {
		xs: { padding: '3px 6px', fontSize: '12px', minWidth: '26px' },
		sm: { padding: '4px 8px', fontSize: '13px', minWidth: '30px' },
		md: { padding: '6px 10px', fontSize: '14px', minWidth: '36px' },
		lg: { padding: '8px 12px', fontSize: '15px', minWidth: '42px' },
		xl: { padding: '10px 14px', fontSize: '16px', minWidth: '48px' }
	};

	function getPages(): (number | '…')[] {
		const range = (start: number, end: number) =>
			Array.from({ length: end - start + 1 }, (_, i) => start + i);

		const left = range(1, Math.min(boundaries, total));
		const right = range(Math.max(total - boundaries + 1, 1), total);
		const middle = range(
			Math.max(page - siblings, 1),
			Math.min(page + siblings, total)
		);

		const all = Array.from(new Set([...left, ...middle, ...right])).sort((a, b) => a - b);
		const result: (number | '…')[] = [];

		for (let i = 0; i < all.length; i++) {
			if (i > 0 && all[i] - all[i - 1] > 1) result.push('…');
			result.push(all[i]);
		}

		return result;
	}

	const pages = $derived(getPages());

	function goTo(p: number) {
		if (p < 1 || p > total || p === page) return;
		page = p;
		onpagechange?.(p);
	}
</script>

<nav aria-label="Pagination" class="pagination {className || ''}" {...restProps}>
	<button
		type="button"
		class="page-btn page-nav"
		style="padding: {sizeMap[size].padding}; font-size: {sizeMap[size].fontSize};"
		disabled={page <= 1}
		aria-label="Previous page"
		onclick={() => goTo(page - 1)}
	>‹</button>

	{#each pages as p}
		{#if p === '…'}
			<span class="page-ellipsis" style="font-size: {sizeMap[size].fontSize};">…</span>
		{:else}
			<button
				type="button"
				class="page-btn page-btn-{variant} {p === page ? 'page-active' : ''}"
				style="padding: {sizeMap[size].padding}; font-size: {sizeMap[size].fontSize}; min-width: {sizeMap[size].minWidth};
				       {p === page && variant === 'solid' ? `background: ${colorMap[color]}; border-color: ${colorMap[color]}; color: white;` : ''}
				       {p === page && variant === 'outline' ? `border-color: ${colorMap[color]}; color: ${colorMap[color]};` : ''}
				       {p === page && variant === 'ghost' ? `background: ${colorMap[color]}20; color: ${colorMap[color]};` : ''}"
				aria-current={p === page ? 'page' : undefined}
				onclick={() => goTo(p as number)}
			>{p}</button>
		{/if}
	{/each}

	<button
		type="button"
		class="page-btn page-nav"
		style="padding: {sizeMap[size].padding}; font-size: {sizeMap[size].fontSize};"
		disabled={page >= total}
		aria-label="Next page"
		onclick={() => goTo(page + 1)}
	>›</button>
</nav>

<style>
	.pagination {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.page-btn {
		border: none;
		background: transparent;
		cursor: pointer;
		border-radius: 6px;
		font-family: inherit;
		font-weight: 500;
		color: #374151;
		transition: all 0.15s ease;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.page-btn:hover:not(:disabled):not(.page-active) {
		background: #f3f4f6;
	}

	.page-btn:disabled {
		opacity: 0.35;
		cursor: not-allowed;
	}

	.page-btn:focus-visible {
		outline: 2px solid #3b82f6;
		outline-offset: 2px;
	}

	.page-btn-outline {
		border: 1px solid #e5e7eb;
	}

	.page-ellipsis {
		color: #9ca3af;
		padding: 0 4px;
		user-select: none;
	}
</style>
