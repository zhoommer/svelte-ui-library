<script lang="ts">
	import CloseButton from '$lib/components/buttons/close-button.svelte';
	import type { Color, Radius, Size } from '$lib/types.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type TagVariant = 'solid' | 'surface' | 'outline';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		variant?: TagVariant;
		color?: Color;
		size?: Size;
		radius?: Radius;
		closable?: boolean;
		onclose?: () => void;
		icon?: Snippet;
		children: Snippet;
	}

	let {
		variant = 'surface',
		color = 'gray',
		size = 'sm',
		radius = 'full',
		closable = false,
		onclose,
		icon,
		children,
		class: className,
		...restProps
	}: Props = $props();
</script>

<span
	class="tag tag-{variant} tag-{variant}-{color} tag-{size} tag-radius-{radius} {className || ''}"
	{...restProps}
>
	{#if icon}
		<span class="tag-icon" aria-hidden="true">{@render icon()}</span>
	{/if}

	{@render children()}

	{#if closable}
		<CloseButton
			size="xs"
			variant="ghost"
			{color}
			onclick={onclose}
			aria-label="Remove tag"
			class="tag-close-btn"
		/>
	{/if}
</span>

<style>
	.tag {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-weight: 500;
		white-space: nowrap;
		line-height: 1;
	}

	/* Sizes */
	.tag-xs { font-size: 10px; padding: 2px 6px; }
	.tag-sm { font-size: 12px; padding: 3px 8px; }
	.tag-md { font-size: 13px; padding: 4px 10px; }
	.tag-lg { font-size: 14px; padding: 5px 12px; }
	.tag-xl { font-size: 15px; padding: 6px 14px; }

	/* Radius */
	.tag-radius-sm   { border-radius: 4px; }
	.tag-radius-md   { border-radius: 6px; }
	.tag-radius-lg   { border-radius: 8px; }
	.tag-radius-xl   { border-radius: 12px; }
	.tag-radius-2xl  { border-radius: 16px; }
	.tag-radius-full { border-radius: 9999px; }

	/* Surface */
	.tag-surface-gray   { background: #f3f4f6; color: #374151; }
	.tag-surface-red    { background: #fee2e2; color: #dc2626; }
	.tag-surface-green  { background: #dcfce7; color: #16a34a; }
	.tag-surface-blue   { background: #dbeafe; color: #2563eb; }
	.tag-surface-teal   { background: #ccfbf1; color: #0d9488; }
	.tag-surface-pink   { background: #fce7f3; color: #db2777; }
	.tag-surface-purple { background: #f3e8ff; color: #9333ea; }
	.tag-surface-cyan   { background: #cffafe; color: #0891b2; }
	.tag-surface-orange { background: #ffedd5; color: #ea580c; }
	.tag-surface-yellow { background: #fef3c7; color: #ca8a04; }

	/* Solid */
	.tag-solid-gray   { background: #6b7280; color: white; }
	.tag-solid-red    { background: #ef4444; color: white; }
	.tag-solid-green  { background: #22c55e; color: white; }
	.tag-solid-blue   { background: #3b82f6; color: white; }
	.tag-solid-teal   { background: #14b8a6; color: white; }
	.tag-solid-pink   { background: #ec4899; color: white; }
	.tag-solid-purple { background: #a855f7; color: white; }
	.tag-solid-cyan   { background: #06b6d4; color: white; }
	.tag-solid-orange { background: #f97316; color: white; }
	.tag-solid-yellow { background: #eab308; color: white; }

	/* Outline */
	.tag-outline-gray   { background: transparent; color: #4b5563; border: 1px solid #d1d5db; }
	.tag-outline-red    { background: transparent; color: #dc2626; border: 1px solid #fca5a5; }
	.tag-outline-green  { background: transparent; color: #16a34a; border: 1px solid #86efac; }
	.tag-outline-blue   { background: transparent; color: #2563eb; border: 1px solid #93c5fd; }
	.tag-outline-teal   { background: transparent; color: #0d9488; border: 1px solid #5eead4; }
	.tag-outline-pink   { background: transparent; color: #db2777; border: 1px solid #f9a8d4; }
	.tag-outline-purple { background: transparent; color: #9333ea; border: 1px solid #d8b4fe; }
	.tag-outline-cyan   { background: transparent; color: #0891b2; border: 1px solid #67e8f9; }
	.tag-outline-orange { background: transparent; color: #ea580c; border: 1px solid #fdba74; }
	.tag-outline-yellow { background: transparent; color: #ca8a04; border: 1px solid #fcd34d; }

	.tag-icon { display: flex; align-items: center; }
	:global(.tag-close-btn) { margin-left: 2px; }
</style>
