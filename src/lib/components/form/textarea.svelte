<script lang="ts">
	import type { Color, Size } from '$lib/types.js';
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	type InputVariant = 'outline' | 'surface' | 'plain';

	interface Props extends HTMLTextareaAttributes {
		size?: Size;
		variant?: InputVariant;
		color?: Color;
		error?: boolean | string;
		rows?: number;
		resize?: 'none' | 'vertical' | 'horizontal' | 'both';
		autoResize?: boolean;
	}

	let {
		size = 'md',
		variant = 'outline',
		color = 'blue',
		error = false,
		disabled = false,
		readonly = false,
		rows = 4,
		resize = 'vertical',
		autoResize = false,
		class: className,
		...restProps
	}: Props = $props();

	const sizeMap: Record<Size, { padding: string; fontSize: string }> = {
		xs: { padding: '4px 8px', fontSize: '12px' },
		sm: { padding: '5px 10px', fontSize: '14px' },
		md: { padding: '7px 12px', fontSize: '14px' },
		lg: { padding: '9px 14px', fontSize: '16px' },
		xl: { padding: '11px 16px', fontSize: '18px' }
	};

	const hasError = $derived(!!error);
	const errorId = `error-${Math.random().toString(36).slice(2)}`;

	let textareaEl: HTMLTextAreaElement | undefined = $state();

	function handleInput() {
		if (autoResize && textareaEl) {
			textareaEl.style.height = 'auto';
			textareaEl.style.height = `${textareaEl.scrollHeight}px`;
		}
	}
</script>

<textarea
	bind:this={textareaEl}
	{disabled}
	{readonly}
	{rows}
	class="textarea textarea-{variant} textarea-{variant}-{color} textarea-{size} {hasError ? 'textarea-error' : ''} {className || ''}"
	style="padding: {sizeMap[size].padding}; font-size: {sizeMap[size].fontSize}; resize: {autoResize ? 'none' : resize};"
	aria-invalid={hasError || undefined}
	aria-describedby={typeof error === 'string' ? errorId : undefined}
	oninput={handleInput}
	{...restProps}
></textarea>

{#if typeof error === 'string'}
	<span id={errorId} class="textarea-error-msg">{error}</span>
{/if}

<style>
	.textarea {
		width: 100%;
		border-radius: 6px;
		outline: none;
		transition: border-color 0.15s ease, box-shadow 0.15s ease;
		background: white;
		color: #1f2937;
		box-sizing: border-box;
		font-family: inherit;
		line-height: 1.5;
	}

	.textarea::placeholder { color: #9ca3af; }
	.textarea:disabled { opacity: 0.5; cursor: not-allowed; background: #f9fafb; }

	.textarea-outline { border: 1px solid #d1d5db; }
	.textarea-outline-blue:focus   { border-color: #3b82f6; box-shadow: 0 0 0 3px rgb(59 130 246 / 0.15); }
	.textarea-outline-gray:focus   { border-color: #6b7280; box-shadow: 0 0 0 3px rgb(107 114 128 / 0.15); }
	.textarea-outline-red:focus    { border-color: #ef4444; box-shadow: 0 0 0 3px rgb(239 68 68 / 0.15); }
	.textarea-outline-green:focus  { border-color: #22c55e; box-shadow: 0 0 0 3px rgb(34 197 94 / 0.15); }
	.textarea-outline-teal:focus   { border-color: #14b8a6; box-shadow: 0 0 0 3px rgb(20 184 166 / 0.15); }
	.textarea-outline-pink:focus   { border-color: #ec4899; box-shadow: 0 0 0 3px rgb(236 72 153 / 0.15); }
	.textarea-outline-purple:focus { border-color: #a855f7; box-shadow: 0 0 0 3px rgb(168 85 247 / 0.15); }
	.textarea-outline-cyan:focus   { border-color: #06b6d4; box-shadow: 0 0 0 3px rgb(6 182 212 / 0.15); }
	.textarea-outline-orange:focus { border-color: #f97316; box-shadow: 0 0 0 3px rgb(249 115 22 / 0.15); }
	.textarea-outline-yellow:focus { border-color: #eab308; box-shadow: 0 0 0 3px rgb(234 179 8 / 0.15); }

	.textarea-surface { border: 1px solid transparent; background: #f3f4f6; }
	.textarea-surface:focus { background: white; border-color: #3b82f6; box-shadow: 0 0 0 3px rgb(59 130 246 / 0.15); }

	.textarea-plain { border: none; border-bottom: 1px solid #d1d5db; border-radius: 0; background: transparent; }
	.textarea-plain:focus { border-bottom-color: #3b82f6; box-shadow: none; }

	.textarea-error { border-color: #ef4444 !important; }
	.textarea-error:focus { box-shadow: 0 0 0 3px rgb(239 68 68 / 0.15) !important; }

	.textarea-error-msg {
		display: block;
		margin-top: 4px;
		font-size: 12px;
		color: #ef4444;
	}
</style>
