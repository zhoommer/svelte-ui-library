<script lang="ts">
	import Label from '$lib/components/form/label.svelte';
	import type { Size } from '$lib/types.js';
	import type { Snippet } from 'svelte';
	import { setContext } from 'svelte';

	interface FormFieldContext {
		inputId: string;
		errorId: string | undefined;
		hintId: string | undefined;
		required: boolean;
		disabled: boolean;
	}

	interface Props {
		label: string;
		required?: boolean;
		error?: string;
		hint?: string;
		disabled?: boolean;
		id?: string;
		size?: Size;
		children: Snippet;
	}

	let {
		label,
		required = false,
		error,
		hint,
		disabled = false,
		id,
		size = 'md',
		children
	}: Props = $props();

	const inputId = $derived(id ?? `field-${Math.random().toString(36).slice(2)}`);
	const errorId = $derived(error !== undefined ? `${inputId}-error` : undefined);
	const hintId = $derived(hint !== undefined ? `${inputId}-hint` : undefined);
	setContext<FormFieldContext>('form-field', {
		get inputId() { return inputId; },
		get errorId() { return error !== undefined ? `${inputId}-error` : undefined; },
		get hintId() { return hint !== undefined ? `${inputId}-hint` : undefined; },
		get required() { return required; },
		get disabled() { return disabled; }
	});
</script>

<div class="form-field {disabled ? 'form-field-disabled' : ''}">
	<Label for={inputId} {required} {disabled} {size}>
		{label}
	</Label>

	<div class="form-field-control">
		{@render children()}
	</div>

	{#if hint && !error}
		<span id={hintId} class="form-field-hint">{hint}</span>
	{/if}

	{#if error}
		<span id={errorId} class="form-field-error" role="alert">{error}</span>
	{/if}
</div>

<style>
	.form-field {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.form-field-disabled {
		opacity: 0.6;
	}

	.form-field-control {
		width: 100%;
	}

	.form-field-hint {
		font-size: 12px;
		color: #6b7280;
	}

	.form-field-error {
		font-size: 12px;
		color: #ef4444;
	}
</style>
