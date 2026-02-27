<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { getContext } from 'svelte';
	import type { TabsContext } from './tabs.svelte';

	interface Props extends HTMLAttributes<HTMLButtonElement> {
		value: string;
		disabled?: boolean;
		children: Snippet;
	}

	let {
		value,
		disabled = false,
		children,
		class: className,
		...restProps
	}: Props = $props();

	const ctx = getContext<TabsContext>('tabs');

	const isActive = $derived(ctx?.activeValue === value);

	const colorMap: Record<string, string> = {
		gray: '#6b7280', red: '#ef4444', green: '#22c55e', blue: '#3b82f6',
		teal: '#14b8a6', pink: '#ec4899', purple: '#a855f7', cyan: '#06b6d4',
		orange: '#f97316', yellow: '#eab308'
	};

	const sizeMap: Record<string, { padding: string; fontSize: string }> = {
		xs: { padding: '4px 10px', fontSize: '12px' },
		sm: { padding: '6px 12px', fontSize: '13px' },
		md: { padding: '8px 16px', fontSize: '14px' },
		lg: { padding: '10px 20px', fontSize: '15px' },
		xl: { padding: '12px 24px', fontSize: '16px' }
	};
</script>

<button
	type="button"
	role="tab"
	aria-selected={isActive}
	aria-controls={`tabpanel-${value}`}
	id={`tab-${value}`}
	{disabled}
	class="tab tab-{ctx?.variant} {isActive ? 'tab-active' : ''} {className || ''}"
	style="padding: {sizeMap[ctx?.size ?? 'md'].padding}; font-size: {sizeMap[ctx?.size ?? 'md'].fontSize};
	       {isActive && ctx?.variant === 'line' ? `border-bottom-color: ${colorMap[ctx?.color ?? 'blue']}; color: ${colorMap[ctx?.color ?? 'blue']};` : ''}
	       {isActive && ctx?.variant === 'solid' ? `background: ${colorMap[ctx?.color ?? 'blue']}; color: white;` : ''}"
	onclick={() => !disabled && ctx?.setActive(value)}
	{...restProps}
>
	{@render children()}
</button>

<style>
	.tab {
		border: none;
		background: transparent;
		cursor: pointer;
		font-family: inherit;
		font-weight: 500;
		color: #6b7280;
		transition: all 0.15s ease;
		white-space: nowrap;
		border-bottom: 2px solid transparent;
	}

	.tab:hover:not(:disabled) { color: #374151; }
	.tab:disabled { opacity: 0.4; cursor: not-allowed; }

	.tab:focus-visible {
		outline: 2px solid #3b82f6;
		outline-offset: 2px;
		border-radius: 4px;
	}

	/* Line variant active */
	.tab-line.tab-active { color: #2563eb; }

	/* Enclosed variant */
	.tab-enclosed {
		border: 1px solid transparent;
		border-bottom: none;
		border-radius: 6px 6px 0 0;
	}
	.tab-enclosed.tab-active {
		background: white;
		border-color: #e5e7eb;
		color: #111827;
	}

	/* Solid variant */
	.tab-solid { border-radius: 6px; border-bottom: none; }
	.tab-solid.tab-active { color: white; }
</style>
