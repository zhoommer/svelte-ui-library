<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Placement = 'top' | 'bottom' | 'left' | 'right';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		label: string;
		placement?: Placement;
		delay?: number;
		disabled?: boolean;
		children: Snippet;
	}

	let {
		label,
		placement = 'top',
		delay = 300,
		disabled = false,
		children,
		class: className,
		...restProps
	}: Props = $props();

	const tooltipId = `tooltip-${Math.random().toString(36).slice(2)}`;
	let visible = $state(false);
	let timer: ReturnType<typeof setTimeout>;

	function show() {
		if (disabled) return;
		timer = setTimeout(() => { visible = true; }, delay);
	}

	function hide() {
		clearTimeout(timer);
		visible = false;
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
	class="tooltip-wrapper {className || ''}"
	onmouseenter={show}
	onmouseleave={hide}
	onfocus={show}
	onblur={hide}
	aria-describedby={visible ? tooltipId : undefined}
	{...restProps}
>
	{@render children()}

	{#if visible}
		<span
			id={tooltipId}
			role="tooltip"
			class="tooltip tooltip-{placement}"
		>{label}</span>
	{/if}
</span>

<style>
	.tooltip-wrapper {
		position: relative;
		display: inline-flex;
	}

	.tooltip {
		position: absolute;
		background: #1f2937;
		color: white;
		font-size: 12px;
		padding: 5px 10px;
		border-radius: 6px;
		white-space: nowrap;
		z-index: 1070;
		pointer-events: none;
		animation: tooltip-in 0.1s ease;
	}

	@keyframes tooltip-in {
		from { opacity: 0; transform: scale(0.95); }
		to   { opacity: 1; transform: scale(1); }
	}

	.tooltip-top {
		bottom: calc(100% + 6px);
		left: 50%;
		transform: translateX(-50%);
	}

	.tooltip-bottom {
		top: calc(100% + 6px);
		left: 50%;
		transform: translateX(-50%);
	}

	.tooltip-left {
		right: calc(100% + 6px);
		top: 50%;
		transform: translateY(-50%);
	}

	.tooltip-right {
		left: calc(100% + 6px);
		top: 50%;
		transform: translateY(-50%);
	}
</style>
