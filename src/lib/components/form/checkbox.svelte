<script lang="ts">
	import type { Color, Size } from '$lib/types.js';
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLInputAttributes, 'type' | 'size'> {
		checked?: boolean;
		indeterminate?: boolean;
		size?: Size;
		color?: Color;
		label?: string;
		labelPlacement?: 'start' | 'end';
		children?: Snippet;
	}

	let {
		checked = $bindable(false),
		indeterminate = false,
		size = 'md',
		color = 'blue',
		disabled = false,
		label,
		labelPlacement = 'end',
		children,
		class: className,
		...restProps
	}: Props = $props();

	const sizePx: Record<Size, number> = { xs: 14, sm: 16, md: 18, lg: 20, xl: 22 };

	const colorMap: Record<string, string> = {
		gray: '#6b7280', red: '#ef4444', green: '#22c55e', blue: '#3b82f6',
		teal: '#14b8a6', pink: '#ec4899', purple: '#a855f7', cyan: '#06b6d4',
		orange: '#f97316', yellow: '#eab308'
	};

	let inputEl: HTMLInputElement | undefined = $state();

	$effect(() => {
		if (inputEl) inputEl.indeterminate = indeterminate;
	});
</script>

<label class="checkbox-label {disabled ? 'checkbox-disabled' : ''} {className || ''}">
	{#if labelPlacement === 'start' && (label || children)}
		<span class="checkbox-text">
			{#if children}{@render children()}{:else}{label}{/if}
		</span>
	{/if}

	<span
		class="checkbox-box"
		style="width: {sizePx[size]}px; height: {sizePx[size]}px;
		       {checked || indeterminate ? `background: ${colorMap[color]}; border-color: ${colorMap[color]};` : ''}"
	>
		{#if indeterminate}
			<svg width="10" height="2" viewBox="0 0 10 2" fill="white" aria-hidden="true">
				<rect width="10" height="2" rx="1"/>
			</svg>
		{:else if checked}
			<svg width="10" height="8" viewBox="0 0 10 8" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
				<polyline points="1,4 4,7 9,1"/>
			</svg>
		{/if}
	</span>

	<input
		bind:this={inputEl}
		type="checkbox"
		bind:checked
		{disabled}
		class="checkbox-input"
		aria-checked={indeterminate ? 'mixed' : checked}
		{...restProps}
	/>

	{#if labelPlacement === 'end' && (label || children)}
		<span class="checkbox-text">
			{#if children}{@render children()}{:else}{label}{/if}
		</span>
	{/if}
</label>

<style>
	.checkbox-label {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		cursor: pointer;
		user-select: none;
		font-size: 14px;
		color: #374151;
	}

	.checkbox-disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.checkbox-input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
		pointer-events: none;
	}

	.checkbox-box {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: 2px solid #d1d5db;
		border-radius: 4px;
		background: white;
		transition: background 0.15s ease, border-color 0.15s ease;
		flex-shrink: 0;
	}

	.checkbox-label:not(.checkbox-disabled):hover .checkbox-box {
		border-color: #9ca3af;
	}

	.checkbox-label:focus-within .checkbox-box {
		outline: 2px solid #3b82f6;
		outline-offset: 2px;
	}

	.checkbox-text {
		line-height: 1.4;
	}
</style>
