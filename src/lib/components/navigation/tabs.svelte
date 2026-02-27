<script lang="ts">
	import type { Color, Size } from '$lib/types.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { setContext } from 'svelte';

	export interface TabsContext {
		activeValue: string | undefined;
		setActive: (val: string) => void;
		variant: string;
		color: string;
		size: string;
		orientation: string;
	}

	type TabsVariant = 'line' | 'enclosed' | 'solid';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		value?: string;
		variant?: TabsVariant;
		color?: Color;
		size?: Size;
		orientation?: 'horizontal' | 'vertical';
		children: Snippet;
	}

	let {
		value = $bindable(undefined),
		variant = 'line',
		color = 'blue',
		size = 'md',
		orientation = 'horizontal',
		children,
		class: className,
		...restProps
	}: Props = $props();

	setContext<TabsContext>('tabs', {
		get activeValue() { return value; },
		setActive(val) { value = val; },
		get variant() { return variant; },
		get color() { return color; },
		get size() { return size; },
		get orientation() { return orientation; }
	});
</script>

<div
	class="tabs tabs-{orientation} {className || ''}"
	{...restProps}
>
	{@render children()}
</div>

<style>
	.tabs { display: flex; }
	.tabs-horizontal { flex-direction: column; }
	.tabs-vertical   { flex-direction: row; }
</style>
