<script lang="ts">
	import Spinner from '$lib/components/feedback/spinner.svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		'aria-label': string;
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
		radius?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
		children: Snippet;
	}

	let {
		size = 'md',
		variant = 'solid',
		color = 'blue',
		disabled = false,
		loading = false,
		radius = 'md',
		children,
		class: className,
		type = 'button',
		...restProps
	}: Props = $props();

	const spinnerSizes = {
		xs: 12,
		sm: 14,
		md: 16,
		lg: 18,
		xl: 20
	};

	const isDisabled = $derived(disabled || loading);
</script>

<button
	{type}
	class="icon-button icon-button-{size} button-{variant} button-{variant}-{color} button-radius-{radius} {className ||
		''}"
	disabled={isDisabled}
	aria-busy={loading}
	aria-disabled={isDisabled}
	{...restProps}
>
	{#if loading}
		<Spinner size={spinnerSizes[size]} />
	{:else}
		{@render children()}
	{/if}
</button>

<style>
	/* Base */
	.icon-button {
		border: none;
		cursor: pointer;
		font-weight: 500;
		transition: all 0.2s ease;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		position: relative;
		flex-shrink: 0;
	}

	.icon-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.icon-button:focus-visible {
		outline: 2px solid #3b82f6;
		outline-offset: 2px;
	}

	/* Sizes — square, symmetric padding */
	.icon-button-xs {
		padding: 4px;
		font-size: 12px;
	}
	.icon-button-sm {
		padding: 6px;
		font-size: 14px;
	}
	.icon-button-md {
		padding: 8px;
		font-size: 16px;
	}
	.icon-button-lg {
		padding: 10px;
		font-size: 18px;
	}
	.icon-button-xl {
		padding: 12px;
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
	.button-solid-gray {
		background: #6b7280;
		color: white;
		border: 1px solid #6b7280;
	}
	.button-solid-gray:hover:not(:disabled) {
		background: #4b5563;
		border-color: #4b5563;
	}
	.button-solid-red {
		background: #ef4444;
		color: white;
		border: 1px solid #ef4444;
	}
	.button-solid-red:hover:not(:disabled) {
		background: #dc2626;
		border-color: #dc2626;
	}
	.button-solid-green {
		background: #22c55e;
		color: white;
		border: 1px solid #22c55e;
	}
	.button-solid-green:hover:not(:disabled) {
		background: #16a34a;
		border-color: #16a34a;
	}
	.button-solid-blue {
		background: #3b82f6;
		color: white;
		border: 1px solid #3b82f6;
	}
	.button-solid-blue:hover:not(:disabled) {
		background: #2563eb;
		border-color: #2563eb;
	}
	.button-solid-teal {
		background: #14b8a6;
		color: white;
		border: 1px solid #14b8a6;
	}
	.button-solid-teal:hover:not(:disabled) {
		background: #0d9488;
		border-color: #0d9488;
	}
	.button-solid-pink {
		background: #ec4899;
		color: white;
		border: 1px solid #ec4899;
	}
	.button-solid-pink:hover:not(:disabled) {
		background: #db2777;
		border-color: #db2777;
	}
	.button-solid-purple {
		background: #a855f7;
		color: white;
		border: 1px solid #a855f7;
	}
	.button-solid-purple:hover:not(:disabled) {
		background: #9333ea;
		border-color: #9333ea;
	}
	.button-solid-cyan {
		background: #06b6d4;
		color: white;
		border: 1px solid #06b6d4;
	}
	.button-solid-cyan:hover:not(:disabled) {
		background: #0891b2;
		border-color: #0891b2;
	}
	.button-solid-orange {
		background: #f97316;
		color: white;
		border: 1px solid #f97316;
	}
	.button-solid-orange:hover:not(:disabled) {
		background: #ea580c;
		border-color: #ea580c;
	}
	.button-solid-yellow {
		background: #eab308;
		color: white;
		border: 1px solid #eab308;
	}
	.button-solid-yellow:hover:not(:disabled) {
		background: #ca8a04;
		border-color: #ca8a04;
	}

	/* ===== SURFACE VARIANT ===== */
	.button-surface-gray {
		background: #f3f4f6;
		color: #374151;
		border: 1px solid transparent;
	}
	.button-surface-gray:hover:not(:disabled) {
		background: #e5e7eb;
	}
	.button-surface-red {
		background: #fee2e2;
		color: #dc2626;
		border: 1px solid transparent;
	}
	.button-surface-red:hover:not(:disabled) {
		background: #fecaca;
	}
	.button-surface-green {
		background: #dcfce7;
		color: #16a34a;
		border: 1px solid transparent;
	}
	.button-surface-green:hover:not(:disabled) {
		background: #bbf7d0;
	}
	.button-surface-blue {
		background: #dbeafe;
		color: #2563eb;
		border: 1px solid transparent;
	}
	.button-surface-blue:hover:not(:disabled) {
		background: #bfdbfe;
	}
	.button-surface-teal {
		background: #ccfbf1;
		color: #0d9488;
		border: 1px solid transparent;
	}
	.button-surface-teal:hover:not(:disabled) {
		background: #99f6e4;
	}
	.button-surface-pink {
		background: #fce7f3;
		color: #db2777;
		border: 1px solid transparent;
	}
	.button-surface-pink:hover:not(:disabled) {
		background: #fbcfe8;
	}
	.button-surface-purple {
		background: #f3e8ff;
		color: #9333ea;
		border: 1px solid transparent;
	}
	.button-surface-purple:hover:not(:disabled) {
		background: #e9d5ff;
	}
	.button-surface-cyan {
		background: #cffafe;
		color: #0891b2;
		border: 1px solid transparent;
	}
	.button-surface-cyan:hover:not(:disabled) {
		background: #a5f3fc;
	}
	.button-surface-orange {
		background: #ffedd5;
		color: #ea580c;
		border: 1px solid transparent;
	}
	.button-surface-orange:hover:not(:disabled) {
		background: #fed7aa;
	}
	.button-surface-yellow {
		background: #fef3c7;
		color: #ca8a04;
		border: 1px solid transparent;
	}
	.button-surface-yellow:hover:not(:disabled) {
		background: #fde68a;
	}

	/* ===== OUTLINE VARIANT ===== */
	.button-outline-gray {
		background: transparent;
		color: #4b5563;
		border: 1px solid #d1d5db;
	}
	.button-outline-gray:hover:not(:disabled) {
		background: #f9fafb;
	}
	.button-outline-red {
		background: transparent;
		color: #dc2626;
		border: 1px solid #ef4444;
	}
	.button-outline-red:hover:not(:disabled) {
		background: #fef2f2;
	}
	.button-outline-green {
		background: transparent;
		color: #16a34a;
		border: 1px solid #22c55e;
	}
	.button-outline-green:hover:not(:disabled) {
		background: #f0fdf4;
	}
	.button-outline-blue {
		background: transparent;
		color: #2563eb;
		border: 1px solid #3b82f6;
	}
	.button-outline-blue:hover:not(:disabled) {
		background: #eff6ff;
	}
	.button-outline-teal {
		background: transparent;
		color: #0d9488;
		border: 1px solid #14b8a6;
	}
	.button-outline-teal:hover:not(:disabled) {
		background: #f0fdfa;
	}
	.button-outline-pink {
		background: transparent;
		color: #db2777;
		border: 1px solid #ec4899;
	}
	.button-outline-pink:hover:not(:disabled) {
		background: #fdf2f8;
	}
	.button-outline-purple {
		background: transparent;
		color: #9333ea;
		border: 1px solid #a855f7;
	}
	.button-outline-purple:hover:not(:disabled) {
		background: #faf5ff;
	}
	.button-outline-cyan {
		background: transparent;
		color: #0891b2;
		border: 1px solid #06b6d4;
	}
	.button-outline-cyan:hover:not(:disabled) {
		background: #ecfeff;
	}
	.button-outline-orange {
		background: transparent;
		color: #ea580c;
		border: 1px solid #f97316;
	}
	.button-outline-orange:hover:not(:disabled) {
		background: #fff7ed;
	}
	.button-outline-yellow {
		background: transparent;
		color: #ca8a04;
		border: 1px solid #eab308;
	}
	.button-outline-yellow:hover:not(:disabled) {
		background: #fefce8;
	}

	/* ===== GHOST VARIANT ===== */
	.button-ghost-gray {
		background: transparent;
		color: #4b5563;
		border: 1px solid transparent;
	}
	.button-ghost-gray:hover:not(:disabled) {
		background: #f3f4f6;
	}
	.button-ghost-red {
		background: transparent;
		color: #dc2626;
		border: 1px solid transparent;
	}
	.button-ghost-red:hover:not(:disabled) {
		background: #fee2e2;
	}
	.button-ghost-green {
		background: transparent;
		color: #16a34a;
		border: 1px solid transparent;
	}
	.button-ghost-green:hover:not(:disabled) {
		background: #dcfce7;
	}
	.button-ghost-blue {
		background: transparent;
		color: #2563eb;
		border: 1px solid transparent;
	}
	.button-ghost-blue:hover:not(:disabled) {
		background: #dbeafe;
	}
	.button-ghost-teal {
		background: transparent;
		color: #0d9488;
		border: 1px solid transparent;
	}
	.button-ghost-teal:hover:not(:disabled) {
		background: #ccfbf1;
	}
	.button-ghost-pink {
		background: transparent;
		color: #db2777;
		border: 1px solid transparent;
	}
	.button-ghost-pink:hover:not(:disabled) {
		background: #fce7f3;
	}
	.button-ghost-purple {
		background: transparent;
		color: #9333ea;
		border: 1px solid transparent;
	}
	.button-ghost-purple:hover:not(:disabled) {
		background: #f3e8ff;
	}
	.button-ghost-cyan {
		background: transparent;
		color: #0891b2;
		border: 1px solid transparent;
	}
	.button-ghost-cyan:hover:not(:disabled) {
		background: #cffafe;
	}
	.button-ghost-orange {
		background: transparent;
		color: #ea580c;
		border: 1px solid transparent;
	}
	.button-ghost-orange:hover:not(:disabled) {
		background: #ffedd5;
	}
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
