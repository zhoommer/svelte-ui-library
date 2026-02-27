<script lang="ts">
	import { browser } from '$app/environment';
	import CloseButton from '$lib/components/buttons/close-button.svelte';
	import { focusTrap } from '$lib/utils/focus-trap.js';
	import { lockScroll, unlockScroll } from '$lib/utils/scroll-lock.js';
	import { portal } from '$lib/utils/portal.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		open: boolean;
		onclose?: () => void;
		placement?: DrawerPlacement;
		size?: string;
		title?: string;
		closable?: boolean;
		closeOnBackdrop?: boolean;
		closeOnEscape?: boolean;
		header?: Snippet;
		footer?: Snippet;
		children: Snippet;
	}

	let {
		open = $bindable(false),
		onclose,
		placement = 'right',
		size = '320px',
		title,
		closable = true,
		closeOnBackdrop = true,
		closeOnEscape = true,
		header,
		footer,
		children,
		class: className,
		...restProps
	}: Props = $props();

	const titleId = `drawer-title-${Math.random().toString(36).slice(2)}`;

	function close() {
		open = false;
		onclose?.();
	}

	function handleBackdrop(e: MouseEvent) {
		if (closeOnBackdrop && e.target === e.currentTarget) close();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (closeOnEscape && e.key === 'Escape') close();
	}

	const drawerStyle = $derived(
		placement === 'left' || placement === 'right'
			? `width: ${size}; height: 100%;`
			: `height: ${size}; width: 100%;`
	);

	$effect(() => {
		if (open && browser) {
			lockScroll();
			document.addEventListener('keydown', handleKeydown);
			return () => {
				unlockScroll();
				document.removeEventListener('keydown', handleKeydown);
			};
		}
	});
</script>

{#if open && browser}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div use:portal class="drawer-backdrop drawer-backdrop-{placement}" onclick={handleBackdrop}>
		<div
			use:focusTrap
			role="dialog"
			aria-modal="true"
			aria-labelledby={title || header ? titleId : undefined}
			class="drawer drawer-{placement} {className || ''}"
			style={drawerStyle}
			{...restProps}
		>
			{#if title || header || closable}
				<div class="drawer-header">
					{#if header}
						<div id={titleId}>{@render header()}</div>
					{:else if title}
						<h2 id={titleId} class="drawer-title">{title}</h2>
					{:else}
						<span></span>
					{/if}
					{#if closable}
						<CloseButton onclick={close} aria-label="Close panel" />
					{/if}
				</div>
			{/if}

			<div class="drawer-body">
				{@render children()}
			</div>

			{#if footer}
				<div class="drawer-footer">
					{@render footer()}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.drawer-backdrop {
		position: fixed;
		inset: 0;
		background: rgb(0 0 0 / 0.5);
		z-index: 1050;
		display: flex;
		animation: backdrop-in 0.2s ease;
	}

	@keyframes backdrop-in {
		from { opacity: 0; }
		to   { opacity: 1; }
	}

	.drawer-backdrop-right   { justify-content: flex-end; }
	.drawer-backdrop-left    { justify-content: flex-start; }
	.drawer-backdrop-bottom  { align-items: flex-end; }
	.drawer-backdrop-top     { align-items: flex-start; }

	.drawer {
		background: white;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.15);
	}

	.drawer-right  { border-radius: 12px 0 0 12px; animation: slide-in-right 0.25s ease; }
	.drawer-left   { border-radius: 0 12px 12px 0; animation: slide-in-left 0.25s ease; }
	.drawer-bottom { border-radius: 12px 12px 0 0; animation: slide-in-bottom 0.25s ease; }
	.drawer-top    { border-radius: 0 0 12px 12px; animation: slide-in-top 0.25s ease; }

	@keyframes slide-in-right  { from { transform: translateX(100%); } to { transform: translateX(0); } }
	@keyframes slide-in-left   { from { transform: translateX(-100%); } to { transform: translateX(0); } }
	@keyframes slide-in-bottom { from { transform: translateY(100%); } to { transform: translateY(0); } }
	@keyframes slide-in-top    { from { transform: translateY(-100%); } to { transform: translateY(0); } }

	.drawer-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px 20px;
		border-bottom: 1px solid #f3f4f6;
		flex-shrink: 0;
	}

	.drawer-title {
		font-size: 16px;
		font-weight: 600;
		color: #111827;
		margin: 0;
	}

	.drawer-body {
		padding: 20px;
		overflow-y: auto;
		flex: 1;
	}

	.drawer-footer {
		padding: 16px 20px;
		border-top: 1px solid #f3f4f6;
		display: flex;
		justify-content: flex-end;
		gap: 8px;
		flex-shrink: 0;
	}
</style>
