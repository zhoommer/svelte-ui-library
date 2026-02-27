<script lang="ts">
	import type { Color, Radius } from '$lib/types.js';
	import type { HTMLAttributes } from 'svelte/elements';

	type ProgressSize = 'xs' | 'sm' | 'md' | 'lg';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		value?: number;
		color?: Color;
		size?: ProgressSize;
		radius?: Radius;
		showLabel?: boolean;
		animated?: boolean;
	}

	let {
		value,
		color = 'blue',
		size = 'md',
		radius = 'full',
		showLabel = false,
		animated = true,
		class: className,
		...restProps
	}: Props = $props();

	const sizeMap: Record<ProgressSize, string> = {
		xs: '4px', sm: '6px', md: '8px', lg: '12px'
	};

	const colorMap: Record<string, string> = {
		gray: '#6b7280', red: '#ef4444', green: '#22c55e', blue: '#3b82f6',
		teal: '#14b8a6', pink: '#ec4899', purple: '#a855f7', cyan: '#06b6d4',
		orange: '#f97316', yellow: '#eab308'
	};

	const radiusMap: Record<string, string> = {
		sm: '4px', md: '6px', lg: '8px', xl: '12px', '2xl': '16px', full: '9999px'
	};

	const isIndeterminate = $derived(value === undefined);
	const clampedValue = $derived(Math.min(100, Math.max(0, value ?? 0)));
</script>

<div class="progress-wrapper {className || ''}" {...restProps}>
	<div
		class="progress-track"
		role="progressbar"
		aria-valuenow={isIndeterminate ? undefined : clampedValue}
		aria-valuemin={0}
		aria-valuemax={100}
		aria-label="Progress"
		style="height: {sizeMap[size]}; border-radius: {radiusMap[radius]};"
	>
		<div
			class="progress-bar {isIndeterminate && animated ? 'progress-indeterminate' : ''}"
			style="width: {isIndeterminate ? '40%' : `${clampedValue}%`};
			       background: {colorMap[color]};
			       border-radius: {radiusMap[radius]};"
		></div>
	</div>

	{#if showLabel && !isIndeterminate}
		<span class="progress-label">{clampedValue}%</span>
	{/if}
</div>

<style>
	.progress-wrapper {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
	}

	.progress-track {
		flex: 1;
		background: #f3f4f6;
		overflow: hidden;
	}

	.progress-bar {
		height: 100%;
		transition: width 0.3s ease;
	}

	.progress-indeterminate {
		animation: progress-slide 1.5s ease-in-out infinite;
	}

	@keyframes progress-slide {
		0%   { transform: translateX(-100%); }
		100% { transform: translateX(350%); }
	}

	.progress-label {
		font-size: 12px;
		color: #6b7280;
		white-space: nowrap;
		min-width: 32px;
	}
</style>
