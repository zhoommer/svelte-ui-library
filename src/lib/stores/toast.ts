import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
	id: string;
	message: string;
	title?: string;
	type: ToastType;
	duration: number;
	closable: boolean;
}

function createToastStore() {
	const { subscribe, update } = writable<ToastItem[]>([]);

	function add(item: Omit<ToastItem, 'id'>): string {
		const id = Math.random().toString(36).slice(2);
		update((toasts) => [...toasts, { id, ...item }]);
		return id;
	}

	function remove(id: string) {
		update((toasts) => toasts.filter((t) => t.id !== id));
	}

	function success(message: string, options: Partial<Omit<ToastItem, 'id' | 'message' | 'type'>> = {}): string {
		return add({ message, type: 'success', duration: 4000, closable: true, ...options });
	}

	function error(message: string, options: Partial<Omit<ToastItem, 'id' | 'message' | 'type'>> = {}): string {
		return add({ message, type: 'error', duration: 6000, closable: true, ...options });
	}

	function warning(message: string, options: Partial<Omit<ToastItem, 'id' | 'message' | 'type'>> = {}): string {
		return add({ message, type: 'warning', duration: 5000, closable: true, ...options });
	}

	function info(message: string, options: Partial<Omit<ToastItem, 'id' | 'message' | 'type'>> = {}): string {
		return add({ message, type: 'info', duration: 4000, closable: true, ...options });
	}

	return { subscribe, add, remove, success, error, warning, info };
}

export const toast = createToastStore();
