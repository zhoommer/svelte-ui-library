<script lang="ts">
	import type { Color } from '$lib/types.js';
	import { browser } from '$app/environment';
	import Alert from '$lib/components/feedback/alert.svelte';
	import { portal } from '$lib/utils/portal.js';
	import { toast, type ToastItem } from '$lib/stores/toast.js';
	import type { HTMLAttributes } from 'svelte/elements';

	type Placement =
		| 'top-right' | 'top-left' | 'top-center'
		| 'bottom-right' | 'bottom-left' | 'bottom-center';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		placement?: Placement;
		maxToasts?: number;
	}

	let {
		placement = 'top-right',
		maxToasts = 5,
		class: className
	}: Props = $props();

	const placementStyles: Record<Placement, string> = {
		'top-right':    'top: 16px; right: 16px;',
		'top-left':     'top: 16px; left: 16px;',
		'top-center':   'top: 16px; left: 50%; transform: translateX(-50%);',
		'bottom-right': 'bottom: 16px; right: 16px;',
		'bottom-left':  'bottom: 16px; left: 16px;',
		'bottom-center':'bottom: 16px; left: 50%; transform: translateX(-50%);'
	};

	const typeColor: Record<ToastItem['type'], Color> = {
		success: 'green', error: 'red', warning: 'yellow', info: 'blue'
	};

	let timers = new Map<string, ReturnType<typeof setTimeout>>();

	function startTimer(t: ToastItem) {
		if (t.duration > 0 && !timers.has(t.id)) {
			timers.set(t.id, setTimeout(() => toast.remove(t.id), t.duration));
		}
	}

	function stopTimer(id: string) {
		const timer = timers.get(id);
		if (timer) { clearTimeout(timer); timers.delete(id); }
	}

	$effect(() => {
		const toasts = $toast;
		toasts.slice(0, maxToasts).forEach(startTimer);
		// Remove excess
		toasts.slice(maxToasts).forEach((t) => toast.remove(t.id));
		return () => timers.forEach((t) => clearTimeout(t));
	});
</script>

{#if browser}
	<div
		use:portal
		class="toaster {className || ''}"
		style={placementStyles[placement]}
		role="region"
		aria-label="Notifications"
		aria-live="polite"
	>
		{#each $toast.slice(0, maxToasts) as t (t.id)}
			<div
				class="toast-item"
				role="region"
				aria-label="Toast notification"
				onmouseenter={() => stopTimer(t.id)}
				onmouseleave={() => startTimer(t)}
			>
				<Alert
					color={typeColor[t.type]}
					variant="surface"
					title={t.title}
					closable={t.closable}
					onclose={() => toast.remove(t.id)}
					role={t.type === 'error' ? 'alert' : 'status'}
				>
					{t.message}
				</Alert>
			</div>
		{/each}
	</div>
{/if}

<style>
	.toaster {
		position: fixed;
		display: flex;
		flex-direction: column;
		gap: 8px;
		z-index: 1080;
		pointer-events: none;
		width: 360px;
		max-width: calc(100vw - 32px);
	}

	.toast-item {
		pointer-events: all;
		animation: toast-in 0.2s ease;
		box-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
		border-radius: 8px;
		overflow: hidden;
	}

	@keyframes toast-in {
		from { opacity: 0; transform: translateY(-8px); }
		to   { opacity: 1; transform: translateY(0); }
	}
</style>
