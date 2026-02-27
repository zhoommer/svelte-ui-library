<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { getContext } from 'svelte';
	import type { TabsContext } from './tabs.svelte';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		value: string;
		children: Snippet;
	}

	let {
		value,
		children,
		class: className,
		...restProps
	}: Props = $props();

	const ctx = getContext<TabsContext>('tabs');
	const isActive = $derived(ctx?.activeValue === value);
</script>

{#if isActive}
	<div
		id={`tabpanel-${value}`}
		role="tabpanel"
		aria-labelledby={`tab-${value}`}
		class="tab-panel {className || ''}"
		{...restProps}
	>
		{@render children()}
	</div>
{/if}

<style>
	.tab-panel { outline: none; }
</style>
