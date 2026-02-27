<script lang="ts">
	import { portal } from '$lib/utils/portal.js';
	import { browser } from '$app/environment';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { setContext } from 'svelte';

	export interface MenuContext {
		close: () => void;
	}

	type MenuPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		trigger: Snippet;
		placement?: MenuPlacement;
		open?: boolean;
		children: Snippet;
	}

	let {
		trigger,
		placement = 'bottom-start',
		open = $bindable(false),
		children,
		class: className,
		...restProps
	}: Props = $props();

	let triggerEl: HTMLButtonElement | undefined = $state();
	let menuEl: HTMLElement | undefined = $state();
	let activeIndex = $state(-1);

	setContext<MenuContext>('menu', { close() { open = false; } });

	function toggle() { open = !open; if (!open) activeIndex = -1; }

	function handleKeydown(e: KeyboardEvent) {
		if (!open) return;
		if (e.key === 'Escape') { open = false; triggerEl?.focus(); return; }
		if (e.key === 'ArrowDown') { e.preventDefault(); moveFocus(1); }
		if (e.key === 'ArrowUp')   { e.preventDefault(); moveFocus(-1); }
	}

	function moveFocus(dir: 1 | -1) {
		if (!menuEl) return;
		const items = Array.from(menuEl.querySelectorAll<HTMLElement>('[role="menuitem"]:not(:disabled)'));
		if (!items.length) return;
		activeIndex = (activeIndex + dir + items.length) % items.length;
		items[activeIndex]?.focus();
	}

	function handleOutside(e: MouseEvent) {
		if (!triggerEl?.contains(e.target as Node) && !menuEl?.contains(e.target as Node)) {
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

<div class="menu-root {className || ''}" {...restProps}>
	<button
		bind:this={triggerEl}
		type="button"
		class="menu-trigger"
		aria-haspopup="menu"
		aria-expanded={open}
		onclick={toggle}
	>
		{@render trigger()}
	</button>

	{#if open && browser}
		<ul
			use:portal
			bind:this={menuEl}
			role="menu"
			class="menu-list menu-{placement}"
		>
			{@render children()}
		</ul>
	{/if}
</div>

<style>
	.menu-root { position: relative; display: inline-block; }

	.menu-trigger {
		all: unset;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
	}

	.menu-list {
		position: absolute;
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 8px;
		box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
		z-index: 1060;
		min-width: 160px;
		padding: 4px;
		margin: 0;
		list-style: none;
		animation: menu-in 0.1s ease;
	}

	@keyframes menu-in {
		from { opacity: 0; transform: scale(0.96) translateY(-4px); }
		to   { opacity: 1; transform: scale(1) translateY(0); }
	}

	.menu-bottom-start { top: calc(100% + 4px); left: 0; }
	.menu-bottom-end   { top: calc(100% + 4px); right: 0; }
	.menu-top-start    { bottom: calc(100% + 4px); left: 0; }
	.menu-top-end      { bottom: calc(100% + 4px); right: 0; }
</style>
