<script lang="ts">
	import type { Size } from '$lib/types.js';
	import type { Snippet } from 'svelte';
	import type { HTMLLabelAttributes } from 'svelte/elements';

	interface Props extends HTMLLabelAttributes {
		required?: boolean;
		disabled?: boolean;
		size?: Size;
		children: Snippet;
	}

	let {
		required = false,
		disabled = false,
		size = 'md',
		children,
		class: className,
		...restProps
	}: Props = $props();

	const sizeMap: Record<Size, string> = {
		xs: '11px', sm: '12px', md: '14px', lg: '15px', xl: '16px'
	};
</script>

<label
	class="label {className || ''}"
	style="font-size: {sizeMap[size]}; {disabled ? 'opacity: 0.5; cursor: not-allowed;' : ''}"
	{...restProps}
>
	{@render children()}
	{#if required}
		<span class="label-required" aria-hidden="true">*</span>
	{/if}
</label>

<style>
	.label {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-weight: 500;
		color: #374151;
		cursor: default;
		user-select: none;
	}

	.label-required {
		color: #ef4444;
		font-weight: 600;
	}
</style>
