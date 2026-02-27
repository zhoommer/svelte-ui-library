<script lang="ts">
	import type { Color, Radius, Size } from '$lib/types.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type BadgeVariant = 'solid' | 'surface' | 'outline';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		variant?: BadgeVariant;
		color?: Color;
		size?: Size;
		radius?: Radius;
		dot?: boolean;
		children?: Snippet;
	}

	let {
		variant = 'surface',
		color = 'gray',
		size = 'sm',
		radius = 'full',
		dot = false,
		children,
		class: className,
		...restProps
	}: Props = $props();
</script>

<span
	class="badge badge-{variant} badge-{variant}-{color} badge-{size} badge-radius-{radius} {dot ? 'badge-dot' : ''} {className || ''}"
	{...restProps}
>
	{#if !dot && children}
		{@render children()}
	{/if}
</span>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		white-space: nowrap;
		line-height: 1;
	}

	/* Sizes */
	.badge-xs { font-size: 10px; padding: 2px 5px; }
	.badge-sm { font-size: 11px; padding: 2px 7px; }
	.badge-md { font-size: 12px; padding: 3px 9px; }
	.badge-lg { font-size: 13px; padding: 4px 11px; }
	.badge-xl { font-size: 14px; padding: 4px 13px; }

	/* Dot mode */
	.badge-dot { padding: 0; width: 8px; height: 8px; border-radius: 50%; }

	/* Radius */
	.badge-radius-sm   { border-radius: 4px; }
	.badge-radius-md   { border-radius: 6px; }
	.badge-radius-lg   { border-radius: 8px; }
	.badge-radius-xl   { border-radius: 12px; }
	.badge-radius-2xl  { border-radius: 16px; }
	.badge-radius-full { border-radius: 9999px; }

	/* Surface */
	.badge-surface-gray   { background: #f3f4f6; color: #374151; }
	.badge-surface-red    { background: #fee2e2; color: #dc2626; }
	.badge-surface-green  { background: #dcfce7; color: #16a34a; }
	.badge-surface-blue   { background: #dbeafe; color: #2563eb; }
	.badge-surface-teal   { background: #ccfbf1; color: #0d9488; }
	.badge-surface-pink   { background: #fce7f3; color: #db2777; }
	.badge-surface-purple { background: #f3e8ff; color: #9333ea; }
	.badge-surface-cyan   { background: #cffafe; color: #0891b2; }
	.badge-surface-orange { background: #ffedd5; color: #ea580c; }
	.badge-surface-yellow { background: #fef3c7; color: #ca8a04; }

	/* Solid */
	.badge-solid-gray   { background: #6b7280; color: white; }
	.badge-solid-red    { background: #ef4444; color: white; }
	.badge-solid-green  { background: #22c55e; color: white; }
	.badge-solid-blue   { background: #3b82f6; color: white; }
	.badge-solid-teal   { background: #14b8a6; color: white; }
	.badge-solid-pink   { background: #ec4899; color: white; }
	.badge-solid-purple { background: #a855f7; color: white; }
	.badge-solid-cyan   { background: #06b6d4; color: white; }
	.badge-solid-orange { background: #f97316; color: white; }
	.badge-solid-yellow { background: #eab308; color: white; }

	/* Outline */
	.badge-outline-gray   { background: transparent; color: #4b5563; border: 1px solid #d1d5db; }
	.badge-outline-red    { background: transparent; color: #dc2626; border: 1px solid #fca5a5; }
	.badge-outline-green  { background: transparent; color: #16a34a; border: 1px solid #86efac; }
	.badge-outline-blue   { background: transparent; color: #2563eb; border: 1px solid #93c5fd; }
	.badge-outline-teal   { background: transparent; color: #0d9488; border: 1px solid #5eead4; }
	.badge-outline-pink   { background: transparent; color: #db2777; border: 1px solid #f9a8d4; }
	.badge-outline-purple { background: transparent; color: #9333ea; border: 1px solid #d8b4fe; }
	.badge-outline-cyan   { background: transparent; color: #0891b2; border: 1px solid #67e8f9; }
	.badge-outline-orange { background: transparent; color: #ea580c; border: 1px solid #fdba74; }
	.badge-outline-yellow { background: transparent; color: #ca8a04; border: 1px solid #fcd34d; }
</style>
