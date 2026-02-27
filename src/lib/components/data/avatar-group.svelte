<script lang="ts">
	import type { Size } from '$lib/types.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		max?: number;
		size?: Size;
		children: Snippet;
	}

	let {
		max = 4,
		size = 'md',
		children,
		class: className,
		...restProps
	}: Props = $props();
</script>

<div class="avatar-group {className || ''}" {...restProps}>
	{@render children()}
</div>

<style>
	.avatar-group {
		display: flex;
		flex-direction: row;
	}

	/* Stack avatars with negative margin */
	.avatar-group :global(.avatar) {
		margin-left: -8px;
		border: 2px solid white;
		box-shadow: 0 0 0 2px white;
	}

	.avatar-group :global(.avatar:first-child) {
		margin-left: 0;
	}
</style>
