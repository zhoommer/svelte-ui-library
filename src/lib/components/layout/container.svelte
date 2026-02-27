<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type MaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

	interface Props extends HTMLAttributes<HTMLElement> {
		maxWidth?: MaxWidth;
		padding?: boolean;
		center?: boolean;
		as?: string;
		children: Snippet;
	}

	let {
		maxWidth = 'xl',
		padding = true,
		center = true,
		as: Tag = 'div',
		children,
		class: className,
		style,
		...restProps
	}: Props = $props();

	const maxWidthMap: Record<MaxWidth, string> = {
		sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px', full: '100%'
	};

	const computedStyle = $derived([
		`max-width: ${maxWidthMap[maxWidth]}`,
		center ? 'margin-left: auto; margin-right: auto' : '',
		padding ? 'padding-left: 16px; padding-right: 16px' : '',
		'width: 100%',
		style ?? ''
	].filter(Boolean).join('; '));
</script>

<svelte:element this={Tag} class={className} style={computedStyle} {...restProps}>
	{@render children()}
</svelte:element>
