<script lang="ts">
	import Spinner from '$lib/components/feedback/spinner.svelte';
	import type { Color, Radius, Size, Variant } from '$lib/types.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	interface Props extends HTMLAnchorAttributes {
		href: string;
		download?: string | true;
		size?: Size;
		variant?: Variant;
		color?: Color;
		radius?: Radius;
		loading?: boolean;
		children: Snippet;
	}

	let {
		href,
		download = true,
		size = 'md',
		variant = 'solid',
		color = 'blue',
		radius = 'md',
		loading = false,
		children,
		class: className,
		...restProps
	}: Props = $props();

	const spinnerSizes = { xs: 12, sm: 14, md: 16, lg: 18, xl: 20 };
</script>

<a
	{href}
	download={download === true ? '' : download}
	class="button button-{size} button-{variant} button-{variant}-{color} button-radius-{radius} {className ||
		''}"
	aria-busy={loading}
	{...restProps}
>
	{#if loading}
		<Spinner size={spinnerSizes[size]} />
	{/if}
	{@render children()}
</a>

<style>
	.button {
		border: none;
		cursor: pointer;
		font-weight: 500;
		transition: all 0.2s ease;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		text-decoration: none;
	}

	.button:focus-visible {
		outline: 2px solid #3b82f6;
		outline-offset: 2px;
	}

	/* Sizes */
	.button-xs { padding: 4px 8px; font-size: 12px; }
	.button-sm { padding: 6px 12px; font-size: 14px; }
	.button-md { padding: 8px 16px; font-size: 16px; }
	.button-lg { padding: 10px 20px; font-size: 18px; }
	.button-xl { padding: 12px 24px; font-size: 20px; }

	/* Radius */
	.button-radius-sm  { border-radius: 4px; }
	.button-radius-md  { border-radius: 6px; }
	.button-radius-lg  { border-radius: 8px; }
	.button-radius-xl  { border-radius: 12px; }
	.button-radius-2xl { border-radius: 16px; }
	.button-radius-full { border-radius: 9999px; }

	/* Solid */
	.button-solid-gray   { background: #6b7280; color: white; border: 1px solid #6b7280; }
	.button-solid-gray:hover   { background: #4b5563; border-color: #4b5563; }
	.button-solid-red    { background: #ef4444; color: white; border: 1px solid #ef4444; }
	.button-solid-red:hover    { background: #dc2626; border-color: #dc2626; }
	.button-solid-green  { background: #22c55e; color: white; border: 1px solid #22c55e; }
	.button-solid-green:hover  { background: #16a34a; border-color: #16a34a; }
	.button-solid-blue   { background: #3b82f6; color: white; border: 1px solid #3b82f6; }
	.button-solid-blue:hover   { background: #2563eb; border-color: #2563eb; }
	.button-solid-teal   { background: #14b8a6; color: white; border: 1px solid #14b8a6; }
	.button-solid-teal:hover   { background: #0d9488; border-color: #0d9488; }
	.button-solid-pink   { background: #ec4899; color: white; border: 1px solid #ec4899; }
	.button-solid-pink:hover   { background: #db2777; border-color: #db2777; }
	.button-solid-purple { background: #a855f7; color: white; border: 1px solid #a855f7; }
	.button-solid-purple:hover { background: #9333ea; border-color: #9333ea; }
	.button-solid-cyan   { background: #06b6d4; color: white; border: 1px solid #06b6d4; }
	.button-solid-cyan:hover   { background: #0891b2; border-color: #0891b2; }
	.button-solid-orange { background: #f97316; color: white; border: 1px solid #f97316; }
	.button-solid-orange:hover { background: #ea580c; border-color: #ea580c; }
	.button-solid-yellow { background: #eab308; color: white; border: 1px solid #eab308; }
	.button-solid-yellow:hover { background: #ca8a04; border-color: #ca8a04; }

	/* Outline */
	.button-outline-blue { background: transparent; color: #2563eb; border: 1px solid #3b82f6; }
	.button-outline-blue:hover { background: #eff6ff; }
	.button-outline-gray { background: transparent; color: #4b5563; border: 1px solid #d1d5db; }
	.button-outline-gray:hover { background: #f9fafb; }
	.button-outline-red  { background: transparent; color: #dc2626; border: 1px solid #ef4444; }
	.button-outline-red:hover  { background: #fef2f2; }
	.button-outline-green { background: transparent; color: #16a34a; border: 1px solid #22c55e; }
	.button-outline-green:hover { background: #f0fdf4; }
	.button-outline-teal { background: transparent; color: #0d9488; border: 1px solid #14b8a6; }
	.button-outline-teal:hover { background: #f0fdfa; }
	.button-outline-pink { background: transparent; color: #db2777; border: 1px solid #ec4899; }
	.button-outline-pink:hover { background: #fdf2f8; }
	.button-outline-purple { background: transparent; color: #9333ea; border: 1px solid #a855f7; }
	.button-outline-purple:hover { background: #faf5ff; }
	.button-outline-cyan { background: transparent; color: #0891b2; border: 1px solid #06b6d4; }
	.button-outline-cyan:hover { background: #ecfeff; }
	.button-outline-orange { background: transparent; color: #ea580c; border: 1px solid #f97316; }
	.button-outline-orange:hover { background: #fff7ed; }
	.button-outline-yellow { background: transparent; color: #ca8a04; border: 1px solid #eab308; }
	.button-outline-yellow:hover { background: #fefce8; }

	/* Surface */
	.button-surface-blue { background: #dbeafe; color: #2563eb; border: 1px solid transparent; }
	.button-surface-blue:hover { background: #bfdbfe; }
	.button-surface-gray { background: #f3f4f6; color: #374151; border: 1px solid transparent; }
	.button-surface-gray:hover { background: #e5e7eb; }
	.button-surface-red  { background: #fee2e2; color: #dc2626; border: 1px solid transparent; }
	.button-surface-red:hover  { background: #fecaca; }
	.button-surface-green { background: #dcfce7; color: #16a34a; border: 1px solid transparent; }
	.button-surface-green:hover { background: #bbf7d0; }
	.button-surface-teal { background: #ccfbf1; color: #0d9488; border: 1px solid transparent; }
	.button-surface-teal:hover { background: #99f6e4; }
	.button-surface-pink { background: #fce7f3; color: #db2777; border: 1px solid transparent; }
	.button-surface-pink:hover { background: #fbcfe8; }
	.button-surface-purple { background: #f3e8ff; color: #9333ea; border: 1px solid transparent; }
	.button-surface-purple:hover { background: #e9d5ff; }
	.button-surface-cyan { background: #cffafe; color: #0891b2; border: 1px solid transparent; }
	.button-surface-cyan:hover { background: #a5f3fc; }
	.button-surface-orange { background: #ffedd5; color: #ea580c; border: 1px solid transparent; }
	.button-surface-orange:hover { background: #fed7aa; }
	.button-surface-yellow { background: #fef3c7; color: #ca8a04; border: 1px solid transparent; }
	.button-surface-yellow:hover { background: #fde68a; }

	/* Ghost */
	.button-ghost-blue { background: transparent; color: #2563eb; border: 1px solid transparent; }
	.button-ghost-blue:hover { background: #dbeafe; }
	.button-ghost-gray { background: transparent; color: #4b5563; border: 1px solid transparent; }
	.button-ghost-gray:hover { background: #f3f4f6; }

	/* Plain */
	.button-plain-gray, .button-plain-red, .button-plain-green, .button-plain-blue,
	.button-plain-teal, .button-plain-pink, .button-plain-purple, .button-plain-cyan,
	.button-plain-orange, .button-plain-yellow {
		background: transparent; color: #64748b; border: 1px solid transparent; font-weight: 400;
	}
	.button-plain-gray:hover, .button-plain-red:hover, .button-plain-green:hover,
	.button-plain-blue:hover, .button-plain-teal:hover, .button-plain-pink:hover,
	.button-plain-purple:hover, .button-plain-cyan:hover, .button-plain-orange:hover,
	.button-plain-yellow:hover { color: #334155; }
</style>
