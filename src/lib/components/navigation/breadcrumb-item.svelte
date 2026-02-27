<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLLIElement> {
		href?: string;
		current?: boolean;
		children: Snippet;
	}

	let {
		href,
		current = false,
		children,
		class: className,
		...restProps
	}: Props = $props();
</script>

<li class="breadcrumb-item {className || ''}" {...restProps}>
	{#if !current}
		<span class="breadcrumb-separator" aria-hidden="true">/</span>
	{/if}

	{#if href && !current}
		<a {href} class="breadcrumb-link">{@render children()}</a>
	{:else}
		<span
			class="breadcrumb-current {current ? 'breadcrumb-page' : ''}"
			aria-current={current ? 'page' : undefined}
		>
			{@render children()}
		</span>
	{/if}
</li>

<style>
	.breadcrumb-item {
		display: flex;
		align-items: center;
	}

	.breadcrumb-separator {
		margin: 0 6px;
		color: #9ca3af;
		user-select: none;
	}

	/* Hide separator for first item */
	.breadcrumb-item:first-child .breadcrumb-separator {
		display: none;
	}

	.breadcrumb-link {
		color: #6b7280;
		text-decoration: none;
		transition: color 0.15s ease;
	}

	.breadcrumb-link:hover {
		color: #1f2937;
		text-decoration: underline;
	}

	.breadcrumb-page {
		color: #1f2937;
		font-weight: 500;
	}
</style>
