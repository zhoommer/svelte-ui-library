<script lang="ts">
	import type { Color } from '$lib/types.js';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLElement> {
		orientation?: 'horizontal' | 'vertical';
		label?: string;
		color?: Color;
	}

	let {
		orientation = 'horizontal',
		label,
		color,
		class: className,
		...restProps
	}: Props = $props();

	const colorMap: Record<string, string> = {
		gray: '#e5e7eb', red: '#fecaca', green: '#bbf7d0', blue: '#bfdbfe',
		teal: '#99f6e4', pink: '#fbcfe8', purple: '#e9d5ff', cyan: '#a5f3fc',
		orange: '#fed7aa', yellow: '#fde68a'
	};
</script>

{#if orientation === 'horizontal'}
	{#if label}
		<div class="divider divider-labeled {className || ''}" {...restProps}>
			<span
				class="divider-line"
				style={color ? `background-color: ${colorMap[color]}` : ''}
			></span>
			<span class="divider-label">{label}</span>
			<span
				class="divider-line"
				style={color ? `background-color: ${colorMap[color]}` : ''}
			></span>
		</div>
	{:else}
		<hr
			class="divider divider-horizontal {className || ''}"
			style={color ? `border-color: ${colorMap[color]}` : ''}
			{...restProps}
		/>
	{/if}
{:else}
	<div
		role="separator"
		aria-orientation="vertical"
		class="divider divider-vertical {className || ''}"
		style={color ? `background-color: ${colorMap[color]}` : ''}
		{...restProps}
	></div>
{/if}

<style>
	.divider-horizontal {
		border: none;
		border-top: 1px solid #e5e7eb;
		margin: 0;
		width: 100%;
	}

	.divider-vertical {
		display: inline-block;
		width: 1px;
		background-color: #e5e7eb;
		align-self: stretch;
	}

	.divider-labeled {
		display: flex;
		align-items: center;
		gap: 12px;
		width: 100%;
	}

	.divider-line {
		flex: 1;
		height: 1px;
		background-color: #e5e7eb;
	}

	.divider-label {
		font-size: 14px;
		color: #6b7280;
		white-space: nowrap;
	}
</style>
