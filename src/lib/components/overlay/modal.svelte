<script lang="ts">
	import { browser } from '$app/environment';
	import CloseButton from '$lib/components/buttons/close-button.svelte';
	import { focusTrap } from '$lib/utils/focus-trap.js';
	import { lockScroll, unlockScroll } from '$lib/utils/scroll-lock.js';
	import { portal } from '$lib/utils/portal.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		open: boolean;
		onclose?: () => void;
		size?: ModalSize;
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
		size = 'md',
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

	const titleId = `modal-title-${Math.random().toString(36).slice(2)}`;

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
	<div use:portal class="modal-backdrop" onclick={handleBackdrop}>
		<div
			use:focusTrap
			role="dialog"
			aria-modal="true"
			aria-labelledby={title || header ? titleId : undefined}
			class="modal modal-{size} {className || ''}"
			{...restProps}
		>
			{#if title || header || closable}
				<div class="modal-header">
					{#if header}
						<div id={titleId}>{@render header()}</div>
					{:else if title}
						<h2 id={titleId} class="modal-title">{title}</h2>
					{:else}
						<span></span>
					{/if}
					{#if closable}
						<CloseButton onclick={close} aria-label="Close dialog" />
					{/if}
				</div>
			{/if}

			<div class="modal-body">
				{@render children()}
			</div>

			{#if footer}
				<div class="modal-footer">
					{@render footer()}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgb(0 0 0 / 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1050;
		padding: 16px;
		animation: backdrop-in 0.15s ease;
	}

	@keyframes backdrop-in {
		from { opacity: 0; }
		to   { opacity: 1; }
	}

	.modal {
		background: white;
		border-radius: 12px;
		box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
		display: flex;
		flex-direction: column;
		max-height: calc(100vh - 32px);
		width: 100%;
		animation: modal-in 0.15s ease;
	}

	@keyframes modal-in {
		from { opacity: 0; transform: scale(0.96) translateY(8px); }
		to   { opacity: 1; transform: scale(1) translateY(0); }
	}

	.modal-sm   { max-width: 400px; }
	.modal-md   { max-width: 560px; }
	.modal-lg   { max-width: 720px; }
	.modal-xl   { max-width: 960px; }
	.modal-full { max-width: 100%; max-height: 100%; border-radius: 0; }

	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px 20px;
		border-bottom: 1px solid #f3f4f6;
		flex-shrink: 0;
	}

	.modal-title {
		font-size: 18px;
		font-weight: 600;
		color: #111827;
		margin: 0;
	}

	.modal-body {
		padding: 20px;
		overflow-y: auto;
		flex: 1;
	}

	.modal-footer {
		padding: 16px 20px;
		border-top: 1px solid #f3f4f6;
		display: flex;
		justify-content: flex-end;
		gap: 8px;
		flex-shrink: 0;
	}
</style>
