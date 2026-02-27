<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		orientation?: 'horizontal' | 'vertical';
		children: Snippet;
	}

	let { orientation = 'horizontal', children, class: className, ...restProps }: Props = $props();
</script>

<div
	role="group"
	class="button-group button-group-{orientation} {className || ''}"
	{...restProps}
>
	{@render children()}
</div>

<style>
	.button-group {
		display: inline-flex;
	}

	.button-group-horizontal {
		flex-direction: row;
	}

	.button-group-vertical {
		flex-direction: column;
	}

	/* Collapse borders and radii between adjacent buttons */
	.button-group-horizontal :global(> *:not(:first-child)) {
		border-left: none;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}

	.button-group-horizontal :global(> *:not(:last-child)) {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}

	.button-group-vertical :global(> *:not(:first-child)) {
		border-top: none;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}

	.button-group-vertical :global(> *:not(:last-child)) {
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}
</style>
