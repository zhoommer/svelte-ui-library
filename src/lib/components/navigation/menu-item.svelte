<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getContext } from 'svelte';
	import type { MenuContext } from './menu.svelte';

	interface Props {
		onclick?: () => void;
		href?: string;
		disabled?: boolean;
		icon?: Snippet;
		children: Snippet;
		class?: string;
	}

	let {
		onclick: handleClick,
		href,
		disabled = false,
		icon,
		children,
		class: className
	}: Props = $props();

	const ctx = getContext<MenuContext>('menu');

	function onClick() {
		if (disabled) return;
		handleClick?.();
		ctx?.close();
	}
</script>

<li role="presentation" class="menu-item-wrapper">
	{#if href}
		<a
			{href}
			role="menuitem"
			class="menu-item {disabled ? 'menu-item-disabled' : ''} {className || ''}"
			aria-disabled={disabled}
			onclick={onClick}
		>
			{#if icon}<span class="menu-item-icon" aria-hidden="true">{@render icon()}</span>{/if}
			{@render children()}
		</a>
	{:else}
		<button
			type="button"
			role="menuitem"
			{disabled}
			class="menu-item {disabled ? 'menu-item-disabled' : ''} {className || ''}"
			onclick={onClick}
		>
			{#if icon}<span class="menu-item-icon" aria-hidden="true">{@render icon()}</span>{/if}
			{@render children()}
		</button>
	{/if}
</li>

<style>
	.menu-item-wrapper { list-style: none; }

	.menu-item {
		all: unset;
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		padding: 7px 12px;
		border-radius: 6px;
		font-size: 14px;
		color: #374151;
		cursor: pointer;
		box-sizing: border-box;
		transition: background 0.1s ease;
		font-family: inherit;
	}

	.menu-item:hover:not(.menu-item-disabled) { background: #f3f4f6; }
	.menu-item:focus-visible { outline: 2px solid #3b82f6; outline-offset: -2px; border-radius: 6px; }

	.menu-item-disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.menu-item-icon {
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}
</style>
