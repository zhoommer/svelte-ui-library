<script lang="ts">
	import IconButton from '$lib/components/buttons/icon-button.svelte';
	import type { Color, Radius, Size, Variant } from '$lib/types.js';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLButtonAttributes, 'children'> {
		'aria-label'?: string;
		size?: Size;
		variant?: Variant;
		color?: Color;
		radius?: Radius;
		disabled?: boolean;
		loading?: boolean;
	}

	let {
		'aria-label': ariaLabel = 'Close',
		size = 'md',
		variant = 'ghost',
		color = 'gray',
		radius = 'md',
		disabled = false,
		loading = false,
		...restProps
	}: Props = $props();
</script>

<IconButton
	aria-label={ariaLabel}
	{size}
	{variant}
	{color}
	{radius}
	{disabled}
	{loading}
	{...restProps}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		<line x1="18" y1="6" x2="6" y2="18" />
		<line x1="6" y1="6" x2="18" y2="18" />
	</svg>
</IconButton>
