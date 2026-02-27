<script lang="ts">
	import type { Color, Size } from '$lib/types.js';
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type InputVariant = 'outline' | 'surface' | 'plain';

	interface Props extends Omit<HTMLInputAttributes, 'size' | 'prefix'> {
		size?: Size;
		variant?: InputVariant;
		color?: Color;
		error?: boolean | string;
		prefix?: Snippet;
		suffix?: Snippet;
	}

	let {
		type = 'text',
		size = 'md',
		variant = 'outline',
		color = 'blue',
		error = false,
		disabled = false,
		readonly = false,
		prefix,
		suffix,
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
</script>

<div class="input-wrapper {prefix ? 'has-prefix' : ''} {suffix ? 'has-suffix' : ''}">
	{#if prefix}
		<span class="input-prefix" aria-hidden="true">{@render prefix()}</span>
	{/if}

	<input
		{type}
		{disabled}
		{readonly}
		class="input input-{variant} input-{variant}-{color} input-{size} {hasError ? 'input-error' : ''} {className || ''}"
		style="padding: {sizeMap[size].padding}; font-size: {sizeMap[size].fontSize}; height: {sizeMap[size].height};
		       {prefix ? 'padding-left: 36px;' : ''} {suffix ? 'padding-right: 36px;' : ''}"
		aria-invalid={hasError || undefined}
		aria-describedby={typeof error === 'string' ? errorId : undefined}
		{...restProps}
	/>

	{#if suffix}
		<span class="input-suffix" aria-hidden="true">{@render suffix()}</span>
	{/if}
</div>

{#if typeof error === 'string'}
	<span id={errorId} class="input-error-msg">{error}</span>
{/if}

<style>
	.input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
	}

	.input {
		width: 100%;
		border-radius: 6px;
		outline: none;
		transition: border-color 0.15s ease, box-shadow 0.15s ease;
		background: white;
		color: #1f2937;
		box-sizing: border-box;
	}

	.input::placeholder { color: #9ca3af; }

	.input:disabled { opacity: 0.5; cursor: not-allowed; background: #f9fafb; }

	/* Outline variant */
	.input-outline { border: 1px solid #d1d5db; }
	.input-outline:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgb(59 130 246 / 0.15); }
	.input-outline-blue:focus   { border-color: #3b82f6; box-shadow: 0 0 0 3px rgb(59 130 246 / 0.15); }
	.input-outline-gray:focus   { border-color: #6b7280; box-shadow: 0 0 0 3px rgb(107 114 128 / 0.15); }
	.input-outline-red:focus    { border-color: #ef4444; box-shadow: 0 0 0 3px rgb(239 68 68 / 0.15); }
	.input-outline-green:focus  { border-color: #22c55e; box-shadow: 0 0 0 3px rgb(34 197 94 / 0.15); }
	.input-outline-teal:focus   { border-color: #14b8a6; box-shadow: 0 0 0 3px rgb(20 184 166 / 0.15); }
	.input-outline-pink:focus   { border-color: #ec4899; box-shadow: 0 0 0 3px rgb(236 72 153 / 0.15); }
	.input-outline-purple:focus { border-color: #a855f7; box-shadow: 0 0 0 3px rgb(168 85 247 / 0.15); }
	.input-outline-cyan:focus   { border-color: #06b6d4; box-shadow: 0 0 0 3px rgb(6 182 212 / 0.15); }
	.input-outline-orange:focus { border-color: #f97316; box-shadow: 0 0 0 3px rgb(249 115 22 / 0.15); }
	.input-outline-yellow:focus { border-color: #eab308; box-shadow: 0 0 0 3px rgb(234 179 8 / 0.15); }

	/* Surface variant */
	.input-surface { border: 1px solid transparent; background: #f3f4f6; }
	.input-surface:focus { background: white; border-color: #3b82f6; box-shadow: 0 0 0 3px rgb(59 130 246 / 0.15); }

	/* Plain variant */
	.input-plain { border: none; border-bottom: 1px solid #d1d5db; border-radius: 0; background: transparent; }
	.input-plain:focus { border-bottom-color: #3b82f6; box-shadow: none; }

	/* Error state */
	.input-error { border-color: #ef4444 !important; }
	.input-error:focus { box-shadow: 0 0 0 3px rgb(239 68 68 / 0.15) !important; }

	.input-error-msg {
		display: block;
		margin-top: 4px;
		font-size: 12px;
		color: #ef4444;
	}

	/* Prefix / suffix */
	.input-prefix, .input-suffix {
		position: absolute;
		display: flex;
		align-items: center;
		color: #6b7280;
		pointer-events: none;
		font-size: 14px;
	}

	.input-prefix { left: 10px; }
	.input-suffix { right: 10px; }
</style>
