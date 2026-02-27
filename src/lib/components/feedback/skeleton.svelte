<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	type SkeletonVariant = 'text' | 'rectangular' | 'circular';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		variant?: SkeletonVariant;
		width?: string;
		height?: string;
		lines?: number;
		animated?: boolean;
	}

	let {
		variant = 'rectangular',
		width,
		height,
		lines = 3,
		animated = true,
		class: className,
		...restProps
	}: Props = $props();

	// Generate natural-feeling width variation for text lines
	const lineWidths = ['100%', '92%', '85%', '95%', '78%', '88%', '72%'];
</script>

{#if variant === 'text'}
	<div
		class="skeleton-text-group {className || ''}"
		aria-busy="true"
		aria-label="Loading"
		{...restProps}
	>
		{#each Array.from({ length: lines }, (_, i) => i) as i}
			<div
				class="skeleton {animated ? 'skeleton-animated' : ''}"
				style="width: {lineWidths[i % lineWidths.length]}; height: {height ?? '14px'}; border-radius: 4px;"
			></div>
		{/each}
	</div>
{:else}
	<div
		class="skeleton {animated ? 'skeleton-animated' : ''} {className || ''}"
		role="status"
		aria-busy="true"
		aria-label="Loading"
		style="
			width: {width ?? '100%'};
			height: {height ?? (variant === 'circular' ? '48px' : '20px')};
			border-radius: {variant === 'circular' ? '50%' : '6px'};
		"
		{...restProps}
	></div>
{/if}

<style>
	.skeleton {
		background: #e5e7eb;
		display: block;
	}

	.skeleton-animated {
		background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%);
		background-size: 200% 100%;
		animation: skeleton-shimmer 1.5s infinite;
	}

	@keyframes skeleton-shimmer {
		0%   { background-position: 200% 0; }
		100% { background-position: -200% 0; }
	}

	.skeleton-text-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
</style>
