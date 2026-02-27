const FOCUSABLE_SELECTORS = [
	'a[href]',
	'button:not([disabled])',
	'input:not([disabled])',
	'select:not([disabled])',
	'textarea:not([disabled])',
	'[tabindex]:not([tabindex="-1"])',
	'[contenteditable="true"]'
].join(', ');

function getFocusable(node: HTMLElement): HTMLElement[] {
	return Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)).filter(
		(el) => !el.closest('[hidden]') && getComputedStyle(el).display !== 'none'
	);
}

/**
 * Svelte action that traps keyboard focus within a node.
 * Restores focus to the previously focused element on cleanup.
 *
 * Usage: <div use:focusTrap>...</div>
 */
export function focusTrap(node: HTMLElement) {
	const previouslyFocused = document.activeElement as HTMLElement | null;

	// Focus the first focusable element inside the node
	const focusable = getFocusable(node);
	if (focusable.length > 0) {
		focusable[0].focus();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key !== 'Tab') return;

		const focusable = getFocusable(node);
		if (focusable.length === 0) {
			event.preventDefault();
			return;
		}

		const first = focusable[0];
		const last = focusable[focusable.length - 1];

		if (event.shiftKey) {
			if (document.activeElement === first) {
				event.preventDefault();
				last.focus();
			}
		} else {
			if (document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		}
	}

	node.addEventListener('keydown', handleKeydown);

	return {
		destroy() {
			node.removeEventListener('keydown', handleKeydown);
			previouslyFocused?.focus();
		}
	};
}
