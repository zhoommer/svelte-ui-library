<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLElement> {
		separator?: string | Snippet;
		children: Snippet;
	}

	let {
		separator = '/',
		children,
		class: className,
		...restProps
	}: Props = $props();
</script>

<nav aria-label="Breadcrumb" class="breadcrumb {className || ''}" {...restProps}>
	<ol class="breadcrumb-list">
		{@render children()}
	</ol>
</nav>

<style>
	.breadcrumb { font-size: 14px; }

	.breadcrumb-list {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0;
		list-style: none;
		padding: 0;
		margin: 0;
	}
</style>
