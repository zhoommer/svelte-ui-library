<script lang="ts">
	import type { Color, Size } from '$lib/types.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type TextElement = 'p' | 'span' | 'div' | 'label' | 'strong' | 'em';
	type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold';

	interface Props extends HTMLAttributes<HTMLElement> {
		as?: TextElement;
		size?: Size;
		weight?: FontWeight;
		color?: Color | 'inherit';
		truncate?: boolean;
		clamp?: number;
		children: Snippet;
	}

	let {
		as: Tag = 'p',
		size,
		weight,
		color,
		truncate = false,
		clamp,
		children,
		class: className,
		style,
		...restProps
	}: Props = $props();

	const sizeMap: Record<NonNullable<typeof size>, string> = {
		xs: '12px',
		sm: '14px',
		md: '16px',
		lg: '18px',
		xl: '20px'
	};

	const weightMap: Record<FontWeight, string | number> = {
		normal: 400,
		medium: 500,
		semibold: 600,
		bold: 700
	};

	const colorMap: Record<string, string> = {
		gray: '#6b7280', red: '#ef4444', green: '#22c55e', blue: '#3b82f6',
		teal: '#14b8a6', pink: '#ec4899', purple: '#a855f7', cyan: '#06b6d4',
		orange: '#f97316', yellow: '#eab308', inherit: 'inherit'
	};

	const computedStyle = $derived([
		size ? `font-size: ${sizeMap[size]}` : '',
		weight ? `font-weight: ${weightMap[weight]}` : '',
		color ? `color: ${colorMap[color]}` : '',
		truncate ? 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap' : '',
		clamp ? `-webkit-line-clamp: ${clamp}; display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden` : '',
		style ?? ''
	].filter(Boolean).join('; '));
</script>

<svelte:element this={Tag} class={className} style={computedStyle} {...restProps}>
	{@render children()}
</svelte:element>
