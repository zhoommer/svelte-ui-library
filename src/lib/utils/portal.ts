import { browser } from '$app/environment';

/**
 * Svelte action that teleports a node to a target element (defaults to document.body).
 * SSR-safe: no-op on the server.
 *
 * Usage: <div use:portal>...</div>
 * Usage: <div use:portal={document.getElementById('portal-root')}>...</div>
 */
export function portal(node: HTMLElement, target: HTMLElement | null = null) {
	if (!browser) return {};

	const destination = target ?? document.body;
	destination.appendChild(node);

	return {
		update(newTarget: HTMLElement | null) {
			const dest = newTarget ?? document.body;
			dest.appendChild(node);
		},
		destroy() {
			if (node.parentNode) {
				node.parentNode.removeChild(node);
			}
		}
	};
}
