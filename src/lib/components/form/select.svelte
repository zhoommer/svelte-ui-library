<script lang="ts">
	import type { Color, Size } from '$lib/types.js';
	import type { Snippet } from 'svelte';
	import type { HTMLSelectAttributes } from 'svelte/elements';

	type InputVariant = 'outline' | 'surface' | 'plain';

	interface Props extends Omit<HTMLSelectAttributes, 'size'> {
		size?: Size;
		variant?: InputVariant;
		color?: Color;
		error?: boolean | string;
		placeholder?: string;
		children: Snippet;
	}

	let {
		size = 'md',
		variant = 'outline',
		color = 'blue',
		error = false,
		disabled = false,
		placeholder,
		children,
		class: className,
		...restProps
	}: Props = $props();

	const sizeMap: Record<Size, { padding: string; fontSize: string; height: string }> = {
		xs: { padding: '4px 28px 4px 8px', fontSize: '12px', height: '28px' },
		sm: { padding: '5px 28px 5px 10px', fontSize: '14px', height: '32px' },
		md: { padding: '7px 32px 7px 12px', fontSize: '14px', height: '38px' },
		lg: { padding: '9px 36px 9px 14px', fontSize: '16px', height: '44px' },
		xl: { padding: '11px 40px 11px 16px', fontSize: '18px', height: '52px' }
	};

	const hasError = $derived(!!error);
	const errorId = `error-${Math.random().toString(36).slice(2)}`;
</script>

<div class="select-wrapper">
	<select
		{disabled}
		class="select select-{variant} select-{variant}-{color} select-{size} {hasError ? 'select-error' : ''} {className || ''}"
		style="padding: {sizeMap[size].padding}; font-size: {sizeMap[size].fontSize}; height: {sizeMap[size].height};"
		aria-invalid={hasError || undefined}
		aria-describedby={typeof error === 'string' ? errorId : undefined}
		{...restProps}
	>
		{#if placeholder}
			<option value="" disabled selected>{placeholder}</option>
		{/if}
		{@render children()}
	</select>

	<span class="select-chevron" aria-hidden="true">
		<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	</span>
</div>

{#if typeof error === 'string'}
	<span id={errorId} class="select-error-msg">{error}</span>
{/if}

<style>
	.select-wrapper {
		position: relative;
		display: inline-block;
		width: 100%;
	}

	.select {
		width: 100%;
		border-radius: 6px;
		outline: none;
		transition: border-color 0.15s ease, box-shadow 0.15s ease;
		background: white;
		color: #1f2937;
		box-sizing: border-box;
		appearance: none;
		cursor: pointer;
		font-family: inherit;
	}

	.select:disabled { opacity: 0.5; cursor: not-allowed; background: #f9fafb; }

	.select-outline { border: 1px solid #d1d5db; }
	.select-outline-blue:focus   { border-color: #3b82f6; box-shadow: 0 0 0 3px rgb(59 130 246 / 0.15); }
	.select-outline-gray:focus   { border-color: #6b7280; box-shadow: 0 0 0 3px rgb(107 114 128 / 0.15); }
	.select-outline-red:focus    { border-color: #ef4444; box-shadow: 0 0 0 3px rgb(239 68 68 / 0.15); }
	.select-outline-green:focus  { border-color: #22c55e; box-shadow: 0 0 0 3px rgb(34 197 94 / 0.15); }
	.select-outline-teal:focus   { border-color: #14b8a6; box-shadow: 0 0 0 3px rgb(20 184 166 / 0.15); }
	.select-outline-pink:focus   { border-color: #ec4899; box-shadow: 0 0 0 3px rgb(236 72 153 / 0.15); }
	.select-outline-purple:focus { border-color: #a855f7; box-shadow: 0 0 0 3px rgb(168 85 247 / 0.15); }
	.select-outline-cyan:focus   { border-color: #06b6d4; box-shadow: 0 0 0 3px rgb(6 182 212 / 0.15); }
	.select-outline-orange:focus { border-color: #f97316; box-shadow: 0 0 0 3px rgb(249 115 22 / 0.15); }
	.select-outline-yellow:focus { border-color: #eab308; box-shadow: 0 0 0 3px rgb(234 179 8 / 0.15); }

	.select-surface { border: 1px solid transparent; background: #f3f4f6; }
	.select-surface:focus { background: white; border-color: #3b82f6; box-shadow: 0 0 0 3px rgb(59 130 246 / 0.15); }

	.select-plain { border: none; border-bottom: 1px solid #d1d5db; border-radius: 0; background: transparent; }
	.select-plain:focus { border-bottom-color: #3b82f6; box-shadow: none; }

	.select-error { border-color: #ef4444 !important; }
	.select-error:focus { box-shadow: 0 0 0 3px rgb(239 68 68 / 0.15) !important; }

	.select-error-msg {
		display: block;
		margin-top: 4px;
		font-size: 12px;
		color: #ef4444;
	}

	.select-chevron {
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
		pointer-events: none;
		color: #6b7280;
		display: flex;
		align-items: center;
	}
</style>
