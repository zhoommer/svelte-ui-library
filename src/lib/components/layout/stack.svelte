<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Gap = 0 | 1 | 2 | 3 | 4 | 6 | 8 | 10 | 12;
	type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
	type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

	interface Props extends HTMLAttributes<HTMLElement> {
		direction?: 'row' | 'column';
		gap?: Gap;
		align?: Align;
		justify?: Justify;
		wrap?: boolean;
		as?: string;
		children: Snippet;
	}

	let {
		direction = 'column',
		gap = 4,
		align,
		justify,
		wrap = false,
		as: Tag = 'div',
		children,
		class: className,
		style,
		...restProps
	}: Props = $props();

	const gapMap: Record<Gap, string> = {
		0: '0px', 1: '4px', 2: '8px', 3: '12px', 4: '16px',
		6: '24px', 8: '32px', 10: '40px', 12: '48px'
	};

	const justifyMap: Record<string, string> = {
		start: 'flex-start', center: 'center', end: 'flex-end',
		between: 'space-between', around: 'space-around', evenly: 'space-evenly'
	};

	const computedStyle = $derived([
		`display: flex`,
		`flex-direction: ${direction}`,
		`gap: ${gapMap[gap]}`,
		align ? `align-items: ${align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : align}` : '',
		justify ? `justify-content: ${justifyMap[justify]}` : '',
		wrap ? 'flex-wrap: wrap' : '',
		style ?? ''
	].filter(Boolean).join('; '));
</script>

<svelte:element this={Tag} class={className} style={computedStyle} {...restProps}>
	{@render children()}
</svelte:element>
