<script lang="ts">
	import type { Color, Radius, Size } from '$lib/types.js';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		src?: string;
		name?: string;
		size?: Size;
		radius?: Radius;
		color?: Color;
		alt?: string;
	}

	let {
		src,
		name,
		size = 'md',
		radius = 'full',
		color = 'gray',
		alt,
		class: className,
		...restProps
	}: Props = $props();

	const sizePx: Record<Size, string> = {
		xs: '24px', sm: '32px', md: '40px', lg: '48px', xl: '64px'
	};

	const fontSizes: Record<Size, string> = {
		xs: '10px', sm: '12px', md: '14px', lg: '16px', xl: '20px'
	};

	const colorMap: Record<string, { bg: string; fg: string }> = {
		gray:   { bg: '#e5e7eb', fg: '#374151' },
		red:    { bg: '#fee2e2', fg: '#dc2626' },
		green:  { bg: '#dcfce7', fg: '#16a34a' },
		blue:   { bg: '#dbeafe', fg: '#2563eb' },
		teal:   { bg: '#ccfbf1', fg: '#0d9488' },
		pink:   { bg: '#fce7f3', fg: '#db2777' },
		purple: { bg: '#f3e8ff', fg: '#9333ea' },
		cyan:   { bg: '#cffafe', fg: '#0891b2' },
		orange: { bg: '#ffedd5', fg: '#ea580c' },
		yellow: { bg: '#fef3c7', fg: '#ca8a04' }
	};

	const radiusMap: Record<string, string> = {
		sm: '4px', md: '6px', lg: '8px', xl: '12px', '2xl': '16px', full: '50%'
	};

	function getInitials(n: string): string {
		const words = n.trim().split(/\s+/);
		if (words.length === 1) return words[0].charAt(0).toUpperCase();
		return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
	}

	let imgError = $state(false);
	const showImage = $derived(!!src && !imgError);
	const initials = $derived(name ? getInitials(name) : '?');
	const palette = $derived(colorMap[color]);
</script>

<span
	class="avatar {className || ''}"
	style="width: {sizePx[size]}; height: {sizePx[size]}; border-radius: {radiusMap[radius]};
	       background: {palette.bg}; color: {palette.fg}; font-size: {fontSizes[size]};"
	aria-label={!showImage ? (name ?? 'Avatar') : undefined}
	{...restProps}
>
	{#if showImage}
		<img
			{src}
			alt={alt ?? name ?? 'Avatar'}
			class="avatar-img"
			style="border-radius: {radiusMap[radius]};"
			onerror={() => { imgError = true; }}
		/>
	{:else}
		<span aria-hidden="true" class="avatar-initials">{initials}</span>
	{/if}
</span>

<style>
	.avatar {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		flex-shrink: 0;
		font-weight: 600;
		user-select: none;
	}

	.avatar-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.avatar-initials {
		line-height: 1;
	}
</style>
