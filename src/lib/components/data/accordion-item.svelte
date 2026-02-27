<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { getContext } from 'svelte';
	import type { AccordionContext } from './accordion.svelte';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
		value: string;
		title: string | Snippet;
		disabled?: boolean;
		children: Snippet;
	}

	let {
		value,
		title,
		disabled = false,
		children,
		class: className,
		...restProps
	}: Props = $props();

	const ctx = getContext<AccordionContext>('accordion');
	const isOpen = $derived(ctx?.isOpen(value) ?? false);

	const triggerId = $derived(`accordion-trigger-${value}`);
	const panelId = $derived(`accordion-panel-${value}`);
</script>

<div class="accordion-item {className || ''}" {...restProps}>
	<button
		id={triggerId}
		type="button"
		class="accordion-trigger"
		aria-expanded={isOpen}
		aria-controls={panelId}
		{disabled}
		onclick={() => !disabled && ctx?.toggle(value)}
	>
		<span class="accordion-title">
			{#if typeof title === 'string'}
				{title}
			{:else}
				{@render title()}
			{/if}
		</span>
		<svg
			class="accordion-chevron {isOpen ? 'accordion-chevron-open' : ''}"
			width="16" height="16" viewBox="0 0 16 16" fill="none"
			xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
		>
			<path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	</button>

	{#if isOpen}
		<div
			id={panelId}
			role="region"
			aria-labelledby={triggerId}
			class="accordion-panel"
		>
			{@render children()}
		</div>
	{/if}
</div>

<style>
	.accordion-item { overflow: hidden; }

	.accordion-trigger {
		all: unset;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 14px 16px;
		cursor: pointer;
		font-size: 14px;
		font-weight: 500;
		color: #111827;
		box-sizing: border-box;
		transition: background 0.15s ease;
	}

	.accordion-trigger:hover:not(:disabled) { background: #f9fafb; }
	.accordion-trigger:disabled { opacity: 0.5; cursor: not-allowed; }
	.accordion-trigger:focus-visible { outline: 2px solid #3b82f6; outline-offset: -2px; }

	.accordion-title { flex: 1; text-align: left; }

	.accordion-chevron {
		flex-shrink: 0;
		color: #6b7280;
		transition: transform 0.2s ease;
	}

	.accordion-chevron-open { transform: rotate(180deg); }

	.accordion-panel {
		padding: 4px 16px 14px;
		font-size: 14px;
		color: #374151;
		line-height: 1.6;
	}
</style>
