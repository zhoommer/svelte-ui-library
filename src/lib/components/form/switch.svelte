<script lang="ts">
	import type { Color, Size } from '$lib/types.js';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLButtonAttributes, 'children'> {
		checked?: boolean;
		size?: Size;
		color?: Color;
		label?: string;
		labelPlacement?: 'start' | 'end';
		children?: Snippet;
	}

	let {
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

	const trackSizes: Record<Size, { width: string; height: string }> = {
		xs: { width: '28px', height: '16px' },
		sm: { width: '32px', height: '18px' },
		md: { width: '38px', height: '22px' },
		lg: { width: '46px', height: '26px' },
		xl: { width: '54px', height: '30px' }
	};

	const thumbSizes: Record<Size, string> = {
		xs: '12px', sm: '14px', md: '18px', lg: '22px', xl: '26px'
	};

	const colorMap: Record<string, string> = {
		gray: '#6b7280', red: '#ef4444', green: '#22c55e', blue: '#3b82f6',
		teal: '#14b8a6', pink: '#ec4899', purple: '#a855f7', cyan: '#06b6d4',
		orange: '#f97316', yellow: '#eab308'
	};

	function toggle() {
		if (!disabled) checked = !checked;
	}
</script>

<span class="switch-wrapper {disabled ? 'switch-disabled' : ''} {className || ''}">
	{#if labelPlacement === 'start' && (label || children)}
		<span class="switch-label-text">{#if children}{@render children()}{:else}{label}{/if}</span>
	{/if}

	<button
		type="button"
		role="switch"
		aria-checked={checked}
		{disabled}
		class="switch-track"
		style="width: {trackSizes[size].width}; height: {trackSizes[size].height};
		       background: {checked ? colorMap[color] : '#d1d5db'};"
		onclick={toggle}
		{...restProps}
	>
		<span
			class="switch-thumb"
			style="width: {thumbSizes[size]}; height: {thumbSizes[size]};
			       transform: translateX({checked ? `calc(${trackSizes[size].width} - ${thumbSizes[size]} - 2px)` : '2px'});"
		></span>
	</button>

	{#if labelPlacement === 'end' && (label || children)}
		<span class="switch-label-text">{#if children}{@render children()}{:else}{label}{/if}</span>
	{/if}
</span>

<style>
	.switch-wrapper {
		display: inline-flex;
		align-items: center;
		gap: 8px;
	}

	.switch-disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.switch-track {
		position: relative;
		border: none;
		border-radius: 9999px;
		cursor: pointer;
		padding: 0;
		transition: background 0.2s ease;
		flex-shrink: 0;
	}

	.switch-track:focus-visible {
		outline: 2px solid #3b82f6;
		outline-offset: 2px;
	}

	.switch-track:disabled {
		cursor: not-allowed;
	}

	.switch-thumb {
		position: absolute;
		top: 50%;
		transform-origin: center;
		transform: translateX(2px) translateY(-50%);
		background: white;
		border-radius: 50%;
		box-shadow: 0 1px 3px rgb(0 0 0 / 0.2);
		transition: transform 0.2s ease;
		/* Override translateX while keeping translateY(-50%) */
		top: 50%;
		margin-top: 0;
	}

	.switch-label-text {
		font-size: 14px;
		color: #374151;
		user-select: none;
	}
</style>
