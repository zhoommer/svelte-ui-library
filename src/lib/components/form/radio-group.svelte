<script lang="ts">
	import type { Snippet } from 'svelte';
	import { setContext } from 'svelte';

	interface RadioGroupContext {
		name: string;
		value: string | number | undefined;
		disabled: boolean;
		onChange: (val: string | number) => void;
	}

	interface Props {
		name: string;
		value?: string | number;
		orientation?: 'horizontal' | 'vertical';
		disabled?: boolean;
		legend?: string;
		children: Snippet;
	}

	let {
		name,
		value = $bindable(undefined),
		orientation = 'vertical',
		disabled = false,
		legend,
		children
	}: Props = $props();

	setContext<RadioGroupContext>('radio-group', {
		get name() { return name; },
		get value() { return value; },
		get disabled() { return disabled; },
		onChange(val) { value = val; }
	});
</script>

<fieldset class="radio-group radio-group-{orientation}" {disabled}>
	{#if legend}
		<legend class="radio-group-legend">{legend}</legend>
	{:else}
		<legend class="visually-hidden">{name}</legend>
	{/if}
	{@render children()}
</fieldset>

<style>
	.radio-group {
		border: none;
		padding: 0;
		margin: 0;
		display: flex;
		gap: 8px;
	}

	.radio-group-horizontal { flex-direction: row; flex-wrap: wrap; }
	.radio-group-vertical   { flex-direction: column; }

	.radio-group-legend {
		font-size: 14px;
		font-weight: 500;
		color: #374151;
		margin-bottom: 8px;
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
