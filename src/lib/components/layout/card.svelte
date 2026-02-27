<script lang="ts">
	import type { Radius } from '$lib/types.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type CardVariant = 'elevated' | 'outline' | 'surface' | 'ghost';
	type CardPadding = 'none' | 'sm' | 'md' | 'lg';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		variant?: CardVariant;
		radius?: Radius;
		padding?: CardPadding;
		header?: Snippet;
		footer?: Snippet;
		children: Snippet;
	}

	let {
		variant = 'elevated',
		radius = 'md',
		padding = 'md',
		header,
		footer,
		children,
		class: className,
		...restProps
	}: Props = $props();
</script>

<div
	class="card card-{variant} card-radius-{radius} {className || ''}"
	{...restProps}
>
	{#if header}
		<div class="card-header card-padding-{padding}">
			{@render header()}
		</div>
	{/if}

	<div class="card-body card-padding-{padding}">
		{@render children()}
	</div>

	{#if footer}
		<div class="card-footer card-padding-{padding}">
			{@render footer()}
		</div>
	{/if}
</div>

<style>
	.card {
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	/* Variants */
	.card-elevated {
		background: white;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
	}

	.card-outline {
		background: white;
		border: 1px solid #e5e7eb;
	}

	.card-surface {
		background: #f9fafb;
	}

	.card-ghost {
		background: transparent;
	}

	/* Radius */
	.card-radius-sm   { border-radius: 4px; }
	.card-radius-md   { border-radius: 8px; }
	.card-radius-lg   { border-radius: 12px; }
	.card-radius-xl   { border-radius: 16px; }
	.card-radius-2xl  { border-radius: 24px; }
	.card-radius-full { border-radius: 9999px; }

	/* Padding */
	.card-padding-none { padding: 0; }
	.card-padding-sm   { padding: 12px; }
	.card-padding-md   { padding: 16px 20px; }
	.card-padding-lg   { padding: 24px; }

	/* Header and footer borders */
	.card-header {
		border-bottom: 1px solid #f3f4f6;
	}

	.card-footer {
		border-top: 1px solid #f3f4f6;
	}
</style>
