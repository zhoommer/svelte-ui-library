<script lang="ts">
	import type { Color, Size } from '$lib/types.js';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		value?: number;
		min?: number;
		max?: number;
		step?: number;
		size?: Size;
		color?: Color;
		error?: boolean | string;
		disabled?: boolean;
	}

	let {
		value = $bindable(0),
		min,
		max,
		step = 1,
		size = 'md',
		color = 'blue',
		error = false,
		disabled = false,
		class: className,
		...restProps
	}: Props = $props();

	const sizeMap: Record<Size, { padding: string; fontSize: string; height: string }> = {
		xs: { padding: '4px 8px', fontSize: '12px', height: '28px' },
		sm: { padding: '5px 10px', fontSize: '14px', height: '32px' },
		md: { padding: '7px 12px', fontSize: '14px', height: '38px' },
		lg: { padding: '9px 14px', fontSize: '16px', height: '44px' },
		xl: { padding: '11px 16px', fontSize: '18px', height: '52px' }
	};

	const hasError = $derived(!!error);
	const errorId = `error-${Math.random().toString(36).slice(2)}`;

	function clamp(n: number): number {
		let result = n;
		if (min !== undefined) result = Math.max(min, result);
		if (max !== undefined) result = Math.min(max, result);
		return result;
	}

	function increment() {
		value = clamp((value ?? 0) + step);
	}

	function decrement() {
		value = clamp((value ?? 0) - step);
	}

	function handleInput(e: Event) {
		const raw = parseFloat((e.target as HTMLInputElement).value);
		if (!isNaN(raw)) value = clamp(raw);
	}

	const canDecrement = $derived(min === undefined || (value ?? 0) > min);
	const canIncrement = $derived(max === undefined || (value ?? 0) < max);
</script>

<div class="number-input-wrapper {className || ''}" {...restProps}>
	<button
		type="button"
		class="number-btn"
		style="height: {sizeMap[size].height};"
		disabled={disabled || !canDecrement}
		onclick={decrement}
		aria-label="Decrement"
	>−</button>

	<input
		type="number"
		{value}
		{min}
		{max}
		{step}
		{disabled}
		class="number-input {hasError ? 'number-input-error' : ''}"
		style="padding: {sizeMap[size].padding}; font-size: {sizeMap[size].fontSize}; height: {sizeMap[size].height};"
		aria-valuenow={value}
		aria-valuemin={min}
		aria-valuemax={max}
		aria-invalid={hasError || undefined}
		aria-describedby={typeof error === 'string' ? errorId : undefined}
		oninput={handleInput}
	/>

	<button
		type="button"
		class="number-btn"
		style="height: {sizeMap[size].height};"
		disabled={disabled || !canIncrement}
		onclick={increment}
		aria-label="Increment"
	>+</button>
</div>

{#if typeof error === 'string'}
	<span id={errorId} class="number-input-error-msg">{error}</span>
{/if}

<style>
	.number-input-wrapper {
		display: inline-flex;
		width: 100%;
	}

	.number-input {
		flex: 1;
		border: 1px solid #d1d5db;
		border-left: none;
		border-right: none;
		border-radius: 0;
		outline: none;
		text-align: center;
		background: white;
		color: #1f2937;
		box-sizing: border-box;
		-moz-appearance: textfield;
		appearance: textfield;
		font-family: inherit;
	}

	.number-input::-webkit-outer-spin-button,
	.number-input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}

	.number-input:focus {
		border-color: #3b82f6;
		box-shadow: 0 0 0 3px rgb(59 130 246 / 0.15);
		z-index: 1;
		position: relative;
	}

	.number-input-error {
		border-color: #ef4444 !important;
	}

	.number-input-error-msg {
		display: block;
		margin-top: 4px;
		font-size: 12px;
		color: #ef4444;
	}

	.number-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 12px;
		border: 1px solid #d1d5db;
		background: #f9fafb;
		color: #374151;
		cursor: pointer;
		font-size: 16px;
		transition: background 0.15s ease;
		line-height: 1;
	}

	.number-btn:first-child {
		border-radius: 6px 0 0 6px;
	}

	.number-btn:last-child {
		border-radius: 0 6px 6px 0;
	}

	.number-btn:hover:not(:disabled) {
		background: #f3f4f6;
	}

	.number-btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}
</style>
