<script lang="ts">
	import type { Color } from '$lib/types.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
	type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold';
	type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

	interface Props extends HTMLAttributes<HTMLHeadingElement> {
		level?: HeadingLevel;
		size?: HeadingSize;
		weight?: FontWeight;
		color?: Color | 'inherit';
		children: Snippet;
	}

	let {
		level = 2,
		size,
		weight = 'bold',
		color,
		children,
		class: className,
		style,
		...restProps
	}: Props = $props();

	const Tag = $derived(`h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6');

	const sizeMap: Record<HeadingSize, string> = {
		xs: '14px', sm: '16px', md: '20px', lg: '24px', xl: '30px', '2xl': '36px', '3xl': '48px'
	};

	const weightMap: Record<FontWeight, number> = {
		normal: 400, medium: 500, semibold: 600, bold: 700
	};

	const colorMap: Record<string, string> = {
		gray: '#374151', red: '#dc2626', green: '#16a34a', blue: '#2563eb',
		teal: '#0d9488', pink: '#db2777', purple: '#9333ea', cyan: '#0891b2',
		orange: '#ea580c', yellow: '#ca8a04', inherit: 'inherit'
	};

	const computedStyle = $derived([
		size ? `font-size: ${sizeMap[size]}` : '',
		`font-weight: ${weightMap[weight]}`,
		color ? `color: ${colorMap[color]}` : '',
		style ?? ''
	].filter(Boolean).join('; '));
</script>

<svelte:element this={Tag} class={className} style={computedStyle} {...restProps}>
	{@render children()}
</svelte:element>
