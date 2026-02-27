let lockCount = 0;
let scrollbarWidth = 0;

function getScrollbarWidth(): number {
	const outer = document.createElement('div');
	outer.style.overflow = 'scroll';
	outer.style.position = 'absolute';
	outer.style.top = '-9999px';
	document.body.appendChild(outer);
	const width = outer.offsetWidth - outer.clientWidth;
	document.body.removeChild(outer);
	return width;
}

/**
 * Locks body scroll, compensating for scrollbar width to prevent layout shift.
 * Reference-counted — safe to call multiple times (e.g. nested modals).
 */
export function lockScroll(): void {
	if (lockCount === 0) {
		scrollbarWidth = getScrollbarWidth();
		document.body.style.overflow = 'hidden';
		if (scrollbarWidth > 0) {
			document.body.style.paddingRight = `${scrollbarWidth}px`;
		}
	}
	lockCount++;
}

/**
 * Unlocks body scroll. Must be paired with each lockScroll() call.
 */
export function unlockScroll(): void {
	lockCount = Math.max(0, lockCount - 1);
	if (lockCount === 0) {
		document.body.style.overflow = '';
		document.body.style.paddingRight = '';
	}
}
