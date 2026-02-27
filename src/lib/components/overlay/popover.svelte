<script lang="ts">
	import { portal } from '$lib/utils/portal.js';
	import { browser } from '$app/environment';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Placement = 'top' | 'bottom' | 'left' | 'right';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		placement?: Placement;
		open?: boolean;
		trigger?: Snippet;
		closeOnOutside?: boolean;
		closeOnEscape?: boolean;
		children: Snippet;
	}

	let {
		placement = 'bottom',
		open = $bindable(false),
		trigger,
		closeOnOutside = true,
		closeOnEscape = true,
		children,
		class: className,
		...restProps
	}: Props = $props();

	let triggerEl: HTMLButtonElement | undefined = $state();
	let panelEl: HTMLDivElement | undefined = $state();

	function toggle() { open = !open; }

	function handleKeydown(e: KeyboardEvent) {
		if (closeOnEscape && e.key === 'Escape') open = false;
	}

	function handleOutside(e: MouseEvent) {
		if (!closeOnOutside) return;
		if (!triggerEl?.contains(e.target as Node) && !panelEl?.contains(e.target as Node)) {
			open = false;
		}
	}

	$effect(() => {
		if (open && browser) {
			document.addEventListener('mousedown', handleOutside);
			document.addEventListener('keydown', handleKeydown);
			return () => {
				document.removeEventListener('mousedown', handleOutside);
				document.removeEventListener('keydown', handleKeydown);
			};
		}
	});
</script>

<div class="popover-root {className || ''}" {...restProps}>
	{#if trigger}
		<button
			bind:this={triggerEl}
			type="button"
			class="popover-trigger"
			aria-expanded={open}
			aria-haspopup="dialog"
			onclick={toggle}
		>
			{@render trigger()}
		</button>
	{/if}

	{#if open && browser}
		<div use:portal class="popover-panel popover-{placement}" bind:this={panelEl} role="dialog">
			{@render children()}
		</div>
	{/if}
</div>

<style>
	.popover-root {
		position: relative;
		display: inline-block;
	}

	.popover-trigger {
		all: unset;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
	}

	.popover-panel {
		position: absolute;
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 8px;
		box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
		z-index: 1060;
		min-width: 160px;
		animation: popover-in 0.1s ease;
	}

	@keyframes popover-in {
		from { opacity: 0; transform: scale(0.96); }
		to   { opacity: 1; transform: scale(1); }
	}

	.popover-bottom {
		top: calc(100% + 8px);
		left: 0;
	}

	.popover-top {
		bottom: calc(100% + 8px);
		left: 0;
	}

	.popover-left {
		right: calc(100% + 8px);
		top: 0;
	}

	.popover-right {
		left: calc(100% + 8px);
		top: 0;
	}
</style>
