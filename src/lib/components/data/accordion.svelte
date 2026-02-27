<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { setContext } from 'svelte';

	export interface AccordionContext {
		isOpen: (value: string) => boolean;
		toggle: (value: string) => void;
	}

	type AccordionVariant = 'outline' | 'surface' | 'ghost';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		value?: string | string[];
		multiple?: boolean;
		variant?: AccordionVariant;
		children: Snippet;
	}

	let {
		value = $bindable(undefined),
		multiple = false,
		variant = 'outline',
		children,
		class: className,
		...restProps
	}: Props = $props();

	function isOpen(v: string): boolean {
		if (!value) return false;
		return Array.isArray(value) ? value.includes(v) : value === v;
	}

	function toggle(v: string) {
		if (multiple) {
			const arr = Array.isArray(value) ? [...value] : (value ? [value] : []);
			const idx = arr.indexOf(v);
			value = idx >= 0 ? arr.filter((x) => x !== v) : [...arr, v];
		} else {
			value = value === v ? undefined : v;
		}
	}

	setContext<AccordionContext>('accordion', { isOpen, toggle });
</script>

<div class="accordion accordion-{variant} {className || ''}" {...restProps}>
	{@render children()}
</div>

<style>
	.accordion { display: flex; flex-direction: column; }
	.accordion-outline > :global(*) { border: 1px solid #e5e7eb; }
	.accordion-outline > :global(*:not(:first-child)) { border-top: none; }
	.accordion-outline > :global(*:first-child) { border-radius: 8px 8px 0 0; }
	.accordion-outline > :global(*:last-child) { border-radius: 0 0 8px 8px; }
	.accordion-outline > :global(*:only-child) { border-radius: 8px; }
	.accordion-surface > :global(*) { background: #f9fafb; border-radius: 8px; margin-bottom: 4px; }
	.accordion-ghost > :global(*) { border-bottom: 1px solid #f3f4f6; }
</style>
