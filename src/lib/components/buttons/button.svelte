<script lang="ts">
	import Spinner from '$lib/components/feedback/spinner.svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		variant?: 'solid' | 'surface' | 'outline' | 'ghost' | 'plain';
		color?:
			| 'gray'
			| 'red'
			| 'green'
			| 'blue'
			| 'teal'
			| 'pink'
			| 'purple'
			| 'cyan'
			| 'orange'
			| 'yellow';
		disabled?: boolean;
		loading?: boolean;
		spinnerPlacement?: 'start' | 'end';
		radius?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
		children: Snippet;
	}

	let {
		size = 'md',
		variant = 'solid',
		color = 'blue',
		disabled = false,
		loading = false,
		spinnerPlacement = 'start',
		radius = 'md',
		children,
		class: className,
		type = 'button',
		...restProps
	}: Props = $props();

	// Spinner size based on button size
	const spinnerSizes = {
		xs: 12,
		sm: 14,
		md: 16,
		lg: 18,
		xl: 20
	};

	// Compute final disabled state
	const isDisabled = $derived(disabled || loading);
</script>

<button
	{type}
	class="button button-{size} button-{variant} button-{variant}-{color} button-radius-{radius} {className ||
		''}"
	disabled={isDisabled}
	aria-busy={loading}
	aria-disabled={isDisabled}
	{...restProps}
>
	{#if loading && spinnerPlacement === 'start'}
		<Spinner size={spinnerSizes[size]} />
	{/if}

	{@render children()}

	{#if loading && spinnerPlacement === 'end'}
		<Spinner size={spinnerSizes[size]} />
	{/if}
</button>

<style>
	/* Base */
	.button {
		border: none;
		cursor: pointer;
		font-weight: 500;
		transition: all 0.2s ease;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		position: relative;
	}

	.button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Focus states for accessibility */
	.button:focus-visible {
		outline: 2px solid #3b82f6;
		outline-offset: 2px;
	}

	/* Sizes */
	.button-xs {
		padding: 4px 8px;
		font-size: 12px;
	}
	.button-sm {
		padding: 6px 12px;
		font-size: 14px;
	}
	.button-md {
		padding: 8px 16px;
		font-size: 16px;
	}
	.button-lg {
		padding: 10px 20px;
		font-size: 18px;
	}
	.button-xl {
		padding: 12px 24px;
		font-size: 20px;
	}

	/* Border Radius */
	.button-radius-sm {
		border-radius: 4px;
	}
	.button-radius-md {
		border-radius: 6px;
	}
	.button-radius-lg {
		border-radius: 8px;
	}
	.button-radius-xl {
		border-radius: 12px;
	}
	.button-radius-2xl {
		border-radius: 16px;
	}
	.button-radius-full {
		border-radius: 9999px;
	}

	/* ===== SOLID VARIANT ===== */
	/* Gray */
	.button-solid-gray {
		background: #6b7280;
		color: white;
		border: 1px solid #6b7280;
	}
	.button-solid-gray:hover:not(:disabled) {
		background: #4b5563;
		border-color: #4b5563;
	}
	.button-solid-gray:focus-visible {
		outline-color: #6b7280;
	}

	/* Red */
	.button-solid-red {
		background: #ef4444;
		color: white;
		border: 1px solid #ef4444;
	}
	.button-solid-red:hover:not(:disabled) {
		background: #dc2626;
		border-color: #dc2626;
	}
	.button-solid-red:focus-visible {
		outline-color: #ef4444;
	}

	/* Green */
	.button-solid-green {
		background: #22c55e;
		color: white;
		border: 1px solid #22c55e;
	}
	.button-solid-green:hover:not(:disabled) {
		background: #16a34a;
		border-color: #16a34a;
	}
	.button-solid-green:focus-visible {
		outline-color: #22c55e;
	}

	/* Blue */
	.button-solid-blue {
		background: #3b82f6;
		color: white;
		border: 1px solid #3b82f6;
	}
	.button-solid-blue:hover:not(:disabled) {
		background: #2563eb;
		border-color: #2563eb;
	}
	.button-solid-blue:focus-visible {
		outline-color: #3b82f6;
	}

	/* Teal */
	.button-solid-teal {
		background: #14b8a6;
		color: white;
		border: 1px solid #14b8a6;
	}
	.button-solid-teal:hover:not(:disabled) {
		background: #0d9488;
		border-color: #0d9488;
	}
	.button-solid-teal:focus-visible {
		outline-color: #14b8a6;
	}

	/* Pink */
	.button-solid-pink {
		background: #ec4899;
		color: white;
		border: 1px solid #ec4899;
	}
	.button-solid-pink:hover:not(:disabled) {
		background: #db2777;
		border-color: #db2777;
	}
	.button-solid-pink:focus-visible {
		outline-color: #ec4899;
	}

	/* Purple */
	.button-solid-purple {
		background: #a855f7;
		color: white;
		border: 1px solid #a855f7;
	}
	.button-solid-purple:hover:not(:disabled) {
		background: #9333ea;
		border-color: #9333ea;
	}
	.button-solid-purple:focus-visible {
		outline-color: #a855f7;
	}

	/* Cyan */
	.button-solid-cyan {
		background: #06b6d4;
		color: white;
		border: 1px solid #06b6d4;
	}
	.button-solid-cyan:hover:not(:disabled) {
		background: #0891b2;
		border-color: #0891b2;
	}
	.button-solid-cyan:focus-visible {
		outline-color: #06b6d4;
	}

	/* Orange */
	.button-solid-orange {
		background: #f97316;
		color: white;
		border: 1px solid #f97316;
	}
	.button-solid-orange:hover:not(:disabled) {
		background: #ea580c;
		border-color: #ea580c;
	}
	.button-solid-orange:focus-visible {
		outline-color: #f97316;
	}

	/* Yellow */
	.button-solid-yellow {
		background: #eab308;
		color: white;
		border: 1px solid #eab308;
	}
	.button-solid-yellow:hover:not(:disabled) {
		background: #ca8a04;
		border-color: #ca8a04;
	}
	.button-solid-yellow:focus-visible {
		outline-color: #eab308;
	}

	/* ===== SURFACE VARIANT ===== */
	/* Gray */
	.button-surface-gray {
		background: #f3f4f6;
		color: #374151;
		border: 1px solid transparent;
	}
	.button-surface-gray:hover:not(:disabled) {
		background: #e5e7eb;
	}

	/* Red */
	.button-surface-red {
		background: #fee2e2;
		color: #dc2626;
		border: 1px solid transparent;
	}
	.button-surface-red:hover:not(:disabled) {
		background: #fecaca;
	}

	/* Green */
	.button-surface-green {
		background: #dcfce7;
		color: #16a34a;
		border: 1px solid transparent;
	}
	.button-surface-green:hover:not(:disabled) {
		background: #bbf7d0;
	}

	/* Blue */
	.button-surface-blue {
		background: #dbeafe;
		color: #2563eb;
		border: 1px solid transparent;
	}
	.button-surface-blue:hover:not(:disabled) {
		background: #bfdbfe;
	}

	/* Teal */
	.button-surface-teal {
		background: #ccfbf1;
		color: #0d9488;
		border: 1px solid transparent;
	}
	.button-surface-teal:hover:not(:disabled) {
		background: #99f6e4;
	}

	/* Pink */
	.button-surface-pink {
		background: #fce7f3;
		color: #db2777;
		border: 1px solid transparent;
	}
	.button-surface-pink:hover:not(:disabled) {
		background: #fbcfe8;
	}

	/* Purple */
	.button-surface-purple {
		background: #f3e8ff;
		color: #9333ea;
		border: 1px solid transparent;
	}
	.button-surface-purple:hover:not(:disabled) {
		background: #e9d5ff;
	}

	/* Cyan */
	.button-surface-cyan {
		background: #cffafe;
		color: #0891b2;
		border: 1px solid transparent;
	}
	.button-surface-cyan:hover:not(:disabled) {
		background: #a5f3fc;
	}

	/* Orange */
	.button-surface-orange {
		background: #ffedd5;
		color: #ea580c;
		border: 1px solid transparent;
	}
	.button-surface-orange:hover:not(:disabled) {
		background: #fed7aa;
	}

	/* Yellow */
	.button-surface-yellow {
		background: #fef3c7;
		color: #ca8a04;
		border: 1px solid transparent;
	}
	.button-surface-yellow:hover:not(:disabled) {
		background: #fde68a;
	}

	/* ===== OUTLINE VARIANT ===== */
	/* Gray */
	.button-outline-gray {
		background: transparent;
		color: #4b5563;
		border: 1px solid #d1d5db;
	}
	.button-outline-gray:hover:not(:disabled) {
		background: #f9fafb;
	}

	/* Red */
	.button-outline-red {
		background: transparent;
		color: #dc2626;
		border: 1px solid #ef4444;
	}
	.button-outline-red:hover:not(:disabled) {
		background: #fef2f2;
	}

	/* Green */
	.button-outline-green {
		background: transparent;
		color: #16a34a;
		border: 1px solid #22c55e;
	}
	.button-outline-green:hover:not(:disabled) {
		background: #f0fdf4;
	}

	/* Blue */
	.button-outline-blue {
		background: transparent;
		color: #2563eb;
		border: 1px solid #3b82f6;
	}
	.button-outline-blue:hover:not(:disabled) {
		background: #eff6ff;
	}

	/* Teal */
	.button-outline-teal {
		background: transparent;
		color: #0d9488;
		border: 1px solid #14b8a6;
	}
	.button-outline-teal:hover:not(:disabled) {
		background: #f0fdfa;
	}

	/* Pink */
	.button-outline-pink {
		background: transparent;
		color: #db2777;
		border: 1px solid #ec4899;
	}
	.button-outline-pink:hover:not(:disabled) {
		background: #fdf2f8;
	}

	/* Purple */
	.button-outline-purple {
		background: transparent;
		color: #9333ea;
		border: 1px solid #a855f7;
	}
	.button-outline-purple:hover:not(:disabled) {
		background: #faf5ff;
	}

	/* Cyan */
	.button-outline-cyan {
		background: transparent;
		color: #0891b2;
		border: 1px solid #06b6d4;
	}
	.button-outline-cyan:hover:not(:disabled) {
		background: #ecfeff;
	}

	/* Orange */
	.button-outline-orange {
		background: transparent;
		color: #ea580c;
		border: 1px solid #f97316;
	}
	.button-outline-orange:hover:not(:disabled) {
		background: #fff7ed;
	}

	/* Yellow */
	.button-outline-yellow {
		background: transparent;
		color: #ca8a04;
		border: 1px solid #eab308;
	}
	.button-outline-yellow:hover:not(:disabled) {
		background: #fefce8;
	}

	/* ===== GHOST VARIANT ===== */
	/* Gray */
	.button-ghost-gray {
		background: transparent;
		color: #4b5563;
		border: 1px solid transparent;
	}
	.button-ghost-gray:hover:not(:disabled) {
		background: #f3f4f6;
	}

	/* Red */
	.button-ghost-red {
		background: transparent;
		color: #dc2626;
		border: 1px solid transparent;
	}
	.button-ghost-red:hover:not(:disabled) {
		background: #fee2e2;
	}

	/* Green */
	.button-ghost-green {
		background: transparent;
		color: #16a34a;
		border: 1px solid transparent;
	}
	.button-ghost-green:hover:not(:disabled) {
		background: #dcfce7;
	}

	/* Blue */
	.button-ghost-blue {
		background: transparent;
		color: #2563eb;
		border: 1px solid transparent;
	}
	.button-ghost-blue:hover:not(:disabled) {
		background: #dbeafe;
	}

	/* Teal */
	.button-ghost-teal {
		background: transparent;
		color: #0d9488;
		border: 1px solid transparent;
	}
	.button-ghost-teal:hover:not(:disabled) {
		background: #ccfbf1;
	}

	/* Pink */
	.button-ghost-pink {
		background: transparent;
		color: #db2777;
		border: 1px solid transparent;
	}
	.button-ghost-pink:hover:not(:disabled) {
		background: #fce7f3;
	}

	/* Purple */
	.button-ghost-purple {
		background: transparent;
		color: #9333ea;
		border: 1px solid transparent;
	}
	.button-ghost-purple:hover:not(:disabled) {
		background: #f3e8ff;
	}

	/* Cyan */
	.button-ghost-cyan {
		background: transparent;
		color: #0891b2;
		border: 1px solid transparent;
	}
	.button-ghost-cyan:hover:not(:disabled) {
		background: #cffafe;
	}

	/* Orange */
	.button-ghost-orange {
		background: transparent;
		color: #ea580c;
		border: 1px solid transparent;
	}
	.button-ghost-orange:hover:not(:disabled) {
		background: #ffedd5;
	}

	/* Yellow */
	.button-ghost-yellow {
		background: transparent;
		color: #ca8a04;
		border: 1px solid transparent;
	}
	.button-ghost-yellow:hover:not(:disabled) {
		background: #fef3c7;
	}

	/* ===== PLAIN VARIANT ===== */
	.button-plain-gray,
	.button-plain-red,
	.button-plain-green,
	.button-plain-blue,
	.button-plain-teal,
	.button-plain-pink,
	.button-plain-purple,
	.button-plain-cyan,
	.button-plain-orange,
	.button-plain-yellow {
		background: transparent;
		color: #64748b;
		border: 1px solid transparent;
		font-weight: 400;
	}
	.button-plain-gray:hover:not(:disabled),
	.button-plain-red:hover:not(:disabled),
	.button-plain-green:hover:not(:disabled),
	.button-plain-blue:hover:not(:disabled),
	.button-plain-teal:hover:not(:disabled),
	.button-plain-pink:hover:not(:disabled),
	.button-plain-purple:hover:not(:disabled),
	.button-plain-cyan:hover:not(:disabled),
	.button-plain-orange:hover:not(:disabled),
	.button-plain-yellow:hover:not(:disabled) {
		color: #334155;
	}
</style>
