<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		/** The full array of items to virtualize. */
		items: T[];
		/** Fixed height in pixels for each row. */
		itemHeight: number;
		/** Visible height of the scrollable container in pixels. */
		height?: number;
		/** Extra rows rendered above and below the visible range to reduce blank flicker. */
		overscan?: number;
		/** Snippet called for each visible item. Receives the item and its original index. */
		children: Snippet<[{ item: T; index: number }]>;
	}

	let {
		items,
		itemHeight,
		height = 400,
		overscan = 5,
		children,
		class: className,
		...restProps
	}: Props = $props();

	let scrollTop = $state(0);

	const totalHeight = $derived(items.length * itemHeight);

	const startIndex = $derived(Math.max(0, Math.floor(scrollTop / itemHeight) - overscan));

	const endIndex = $derived(
		Math.min(items.length - 1, Math.ceil((scrollTop + height) / itemHeight) + overscan)
	);

	const visibleItems = $derived.by(() => {
		const result: { item: T; index: number; offsetTop: number }[] = [];
		for (let i = startIndex; i <= endIndex; i++) {
			result.push({ item: items[i], index: i, offsetTop: i * itemHeight });
		}
		return result;
	});

	function handleScroll(event: Event) {
		scrollTop = (event.currentTarget as HTMLDivElement).scrollTop;
	}
</script>

<div
	class="virtual-list {className || ''}"
	style:height="{height}px"
	onscroll={handleScroll}
	role="list"
	{...restProps}
>
	<div class="virtual-list-inner" style:height="{totalHeight}px">
		{#each visibleItems as { item, index, offsetTop } (index)}
			<div
				class="virtual-list-item"
				style:top="{offsetTop}px"
				style:height="{itemHeight}px"
				role="listitem"
			>
				{@render children({ item, index })}
			</div>
		{/each}
	</div>
</div>

<style>
	.virtual-list {
		overflow-y: auto;
		position: relative;
		width: 100%;
	}

	.virtual-list-inner {
		position: relative;
		width: 100%;
	}

	.virtual-list-item {
		position: absolute;
		left: 0;
		right: 0;
		overflow: hidden;
	}
</style>
