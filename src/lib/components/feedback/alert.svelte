<script lang="ts">
	import CloseButton from '$lib/components/buttons/close-button.svelte';
	import type { Color, Size, Variant } from '$lib/types.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type AlertVariant = 'solid' | 'surface' | 'outline';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		variant?: AlertVariant;
		color?: Color;
		title?: string;
		closable?: boolean;
		onclose?: () => void;
		icon?: Snippet;
		children: Snippet;
	}

	let {
		variant = 'surface',
		color = 'blue',
		title,
		closable = false,
		onclose,
		icon,
		children,
		class: className,
		...restProps
	}: Props = $props();

	let visible = $state(true);

	function dismiss() {
		visible = false;
		onclose?.();
	}
</script>

{#if visible}
	<div
		class="alert alert-{variant} alert-{variant}-{color} {className || ''}"
		role="alert"
		{...restProps}
	>
		{#if icon}
			<span class="alert-icon" aria-hidden="true">{@render icon()}</span>
		{/if}

		<div class="alert-content">
			{#if title}
				<p class="alert-title">{title}</p>
			{/if}
			<div class="alert-body">{@render children()}</div>
		</div>

		{#if closable}
			<span class="alert-close">
				<CloseButton size="sm" aria-label="Dismiss alert" onclick={dismiss} />
			</span>
		{/if}
	</div>
{/if}

<style>
	.alert {
		display: flex;
		align-items: flex-start;
		gap: 12px;
		padding: 12px 16px;
		border-radius: 8px;
		font-size: 14px;
		line-height: 1.5;
	}

	.alert-content { flex: 1; }
	.alert-title { font-weight: 600; margin: 0 0 4px 0; }
	.alert-body { margin: 0; }
	.alert-close { flex-shrink: 0; }
	.alert-icon { flex-shrink: 0; display: flex; align-items: center; margin-top: 1px; }

	/* Surface */
	.alert-surface-gray   { background: #f3f4f6; color: #374151; }
	.alert-surface-red    { background: #fee2e2; color: #991b1b; }
	.alert-surface-green  { background: #dcfce7; color: #166534; }
	.alert-surface-blue   { background: #dbeafe; color: #1e40af; }
	.alert-surface-teal   { background: #ccfbf1; color: #134e4a; }
	.alert-surface-pink   { background: #fce7f3; color: #831843; }
	.alert-surface-purple { background: #f3e8ff; color: #581c87; }
	.alert-surface-cyan   { background: #cffafe; color: #164e63; }
	.alert-surface-orange { background: #ffedd5; color: #7c2d12; }
	.alert-surface-yellow { background: #fef3c7; color: #713f12; }

	/* Outline */
	.alert-outline-gray   { background: white; border: 1px solid #d1d5db; color: #374151; }
	.alert-outline-red    { background: white; border: 1px solid #fca5a5; color: #dc2626; }
	.alert-outline-green  { background: white; border: 1px solid #86efac; color: #16a34a; }
	.alert-outline-blue   { background: white; border: 1px solid #93c5fd; color: #2563eb; }
	.alert-outline-teal   { background: white; border: 1px solid #5eead4; color: #0d9488; }
	.alert-outline-pink   { background: white; border: 1px solid #f9a8d4; color: #db2777; }
	.alert-outline-purple { background: white; border: 1px solid #d8b4fe; color: #9333ea; }
	.alert-outline-cyan   { background: white; border: 1px solid #67e8f9; color: #0891b2; }
	.alert-outline-orange { background: white; border: 1px solid #fdba74; color: #ea580c; }
	.alert-outline-yellow { background: white; border: 1px solid #fcd34d; color: #ca8a04; }

	/* Solid */
	.alert-solid-gray   { background: #6b7280; color: white; }
	.alert-solid-red    { background: #ef4444; color: white; }
	.alert-solid-green  { background: #22c55e; color: white; }
	.alert-solid-blue   { background: #3b82f6; color: white; }
	.alert-solid-teal   { background: #14b8a6; color: white; }
	.alert-solid-pink   { background: #ec4899; color: white; }
	.alert-solid-purple { background: #a855f7; color: white; }
	.alert-solid-cyan   { background: #06b6d4; color: white; }
	.alert-solid-orange { background: #f97316; color: white; }
	.alert-solid-yellow { background: #eab308; color: white; }
</style>
