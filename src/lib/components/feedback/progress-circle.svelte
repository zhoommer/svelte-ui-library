<script lang="ts">
	import type { Color } from '$lib/types.js';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<SVGElement> {
		value?: number;
		size?: number;
		thickness?: number;
		color?: Color;
		showLabel?: boolean;
	}

	let {
		value,
		size = 48,
		thickness = 4,
		color = 'blue',
		showLabel = false,
		class: className,
		...restProps
	}: Props = $props();

	const colorMap: Record<string, string> = {
		gray: '#6b7280', red: '#ef4444', green: '#22c55e', blue: '#3b82f6',
		teal: '#14b8a6', pink: '#ec4899', purple: '#a855f7', cyan: '#06b6d4',
		orange: '#f97316', yellow: '#eab308'
	};

	const isIndeterminate = $derived(value === undefined);
	const clampedValue = $derived(Math.min(100, Math.max(0, value ?? 0)));

	const radius = $derived((size - thickness) / 2);
	const circumference = $derived(2 * Math.PI * radius);
	const strokeDashoffset = $derived(circumference - (clampedValue / 100) * circumference);
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 {size} {size}"
	role="progressbar"
	aria-valuenow={isIndeterminate ? undefined : clampedValue}
	aria-valuemin={0}
	aria-valuemax={100}
	class="progress-circle {isIndeterminate ? 'progress-circle-spin' : ''} {className || ''}"
	{...restProps}
>
	<!-- Track -->
	<circle
		cx={size / 2}
		cy={size / 2}
		r={radius}
		fill="none"
		stroke="#f3f4f6"
		stroke-width={thickness}
	/>
	<!-- Bar -->
	<circle
		cx={size / 2}
		cy={size / 2}
		r={radius}
		fill="none"
		stroke={colorMap[color]}
		stroke-width={thickness}
		stroke-linecap="round"
		stroke-dasharray={isIndeterminate ? `${circumference * 0.25} ${circumference * 0.75}` : circumference}
		stroke-dashoffset={isIndeterminate ? 0 : strokeDashoffset}
		transform="rotate(-90 {size / 2} {size / 2})"
		style="transition: stroke-dashoffset 0.3s ease;"
	/>
	{#if showLabel && !isIndeterminate}
		<text
			x={size / 2}
			y={size / 2}
			text-anchor="middle"
			dominant-baseline="central"
			font-size={size * 0.22}
			font-weight="600"
			fill="#374151"
		>{clampedValue}%</text>
	{/if}
</svg>

<style>
	.progress-circle-spin {
		animation: circle-spin 1s linear infinite;
	}

	@keyframes circle-spin {
		to { transform: rotate(360deg); }
	}
</style>
