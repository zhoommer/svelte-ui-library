<script lang="ts">
	import type { Color, Size } from '$lib/types.js';
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLInputAttributes, 'type' | 'size'> {
		value: string | number;
		checked?: boolean;
		size?: Size;
		color?: Color;
		label?: string;
		labelPlacement?: 'start' | 'end';
		children?: Snippet;
	}

	let {
		value,
		checked = $bindable(false),
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
</script>

<label class="radio-label {disabled ? 'radio-disabled' : ''} {className || ''}">
	{#if labelPlacement === 'start' && (label || children)}
		<span class="radio-text">
			{#if children}{@render children()}{:else}{label}{/if}
		</span>
	{/if}

	<span
		class="radio-box"
		style="width: {sizePx[size]}px; height: {sizePx[size]}px;"
	>
		{#if checked}
			<span
				class="radio-dot"
				style="background: {colorMap[color]}; width: {Math.floor(sizePx[size] * 0.45)}px; height: {Math.floor(sizePx[size] * 0.45)}px;"
			></span>
		{/if}
	</span>

	<input
		type="radio"
		{value}
		checked={checked}
		{disabled}
		class="radio-input"
		{...restProps}
	/>

	{#if labelPlacement === 'end' && (label || children)}
		<span class="radio-text">
			{#if children}{@render children()}{:else}{label}{/if}
		</span>
	{/if}
</label>

<style>
	.radio-label {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		cursor: pointer;
		user-select: none;
		font-size: 14px;
		color: #374151;
	}

	.radio-disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.radio-input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
		pointer-events: none;
	}

	.radio-box {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: 2px solid #d1d5db;
		border-radius: 50%;
		background: white;
		transition: border-color 0.15s ease;
		flex-shrink: 0;
	}

	.radio-label:not(.radio-disabled):hover .radio-box {
		border-color: #9ca3af;
	}

	.radio-label:focus-within .radio-box {
		outline: 2px solid #3b82f6;
		outline-offset: 2px;
	}

	.radio-dot {
		border-radius: 50%;
	}

	.radio-text {
		line-height: 1.4;
	}
</style>
