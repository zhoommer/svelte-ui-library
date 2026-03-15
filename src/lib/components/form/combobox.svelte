<script lang="ts">
	import type { Color, Size } from '$lib/types.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type InputVariant = 'outline' | 'surface' | 'plain';

	export interface ComboboxOption {
		value: string;
		label: string;
		disabled?: boolean;
	}

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'size'> {
		options: ComboboxOption[];
		value?: string;
		size?: Size;
		variant?: InputVariant;
		color?: Color;
		disabled?: boolean;
		placeholder?: string;
		error?: boolean | string;
		clearable?: boolean;
		emptyMessage?: string;
		loading?: boolean;
		option?: Snippet<[{ option: ComboboxOption; highlighted: boolean }]>;
	}

	let {
		options,
		value = $bindable(undefined),
		size = 'md',
		variant = 'outline',
		color = 'blue',
		disabled = false,
		placeholder,
		error = false,
		clearable = false,
		emptyMessage = 'No options found',
		loading = false,
		option: optionSnippet,
		class: className,
		...restProps
	}: Props = $props();

	const listboxId = `combobox-listbox-${Math.random().toString(36).slice(2)}`;
	const errorId = `error-${Math.random().toString(36).slice(2)}`;

	let open = $state(false);
	let query = $state('');
	let highlightedIndex = $state(-1);
	let inputEl: HTMLInputElement | undefined = $state();
	let listboxEl: HTMLUListElement | undefined = $state();
	let wrapperEl: HTMLDivElement | undefined = $state();

	const selectedOption = $derived(options.find((o) => o.value === value));

	const filtered = $derived(
		query.trim() === ''
			? options
			: options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
	);

	const hasError = $derived(!!error);

	const highlightedOptionId = $derived(
		highlightedIndex >= 0 && filtered[highlightedIndex]
			? `${listboxId}-option-${highlightedIndex}`
			: undefined
	);

	const displayValue = $derived(open ? query : (selectedOption?.label ?? ''));

	// Sync input element value when displayValue changes (handles open/close transitions)
	$effect(() => {
		if (inputEl) inputEl.value = displayValue;
	});

	function openDropdown() {
		if (disabled) return;
		open = true;
		query = '';
		highlightedIndex = value ? filtered.findIndex((o) => o.value === value) : -1;
	}

	function selectOption(opt: ComboboxOption) {
		if (opt.disabled) return;
		value = opt.value;
		query = '';
		open = false;
		inputEl?.focus();
	}

	function clearValue(e: MouseEvent) {
		e.stopPropagation();
		value = undefined;
		query = '';
		inputEl?.focus();
	}

	function handleInput(e: Event) {
		query = (e.target as HTMLInputElement).value;
		if (!open) open = true;
		highlightedIndex = filtered.length > 0 ? 0 : -1;
	}

	function handleKeydown(e: KeyboardEvent) {
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				if (!open) {
					open = true;
					break;
				}
				highlightedIndex = Math.min(highlightedIndex + 1, filtered.length - 1);
				scrollHighlighted();
				break;
			case 'ArrowUp':
				e.preventDefault();
				if (!open) {
					open = true;
					break;
				}
				highlightedIndex = Math.max(highlightedIndex - 1, 0);
				scrollHighlighted();
				break;
			case 'Home':
				if (open) {
					e.preventDefault();
					highlightedIndex = 0;
					scrollHighlighted();
				}
				break;
			case 'End':
				if (open) {
					e.preventDefault();
					highlightedIndex = filtered.length - 1;
					scrollHighlighted();
				}
				break;
			case 'Enter':
				e.preventDefault();
				if (open && highlightedIndex >= 0 && filtered[highlightedIndex]) {
					selectOption(filtered[highlightedIndex]);
				} else if (!open) {
					open = true;
				}
				break;
			case 'Escape':
				if (open) {
					e.preventDefault();
					open = false;
					query = '';
				}
				break;
			case 'Tab':
				open = false;
				query = '';
				break;
		}
	}

	function scrollHighlighted() {
		if (!listboxEl || highlightedIndex < 0) return;
		(listboxEl.children[highlightedIndex] as HTMLElement)?.scrollIntoView({ block: 'nearest' });
	}

	function handleOutside(e: MouseEvent) {
		if (!wrapperEl?.contains(e.target as Node)) {
			open = false;
			query = '';
		}
	}

	$effect(() => {
		if (open) {
			document.addEventListener('mousedown', handleOutside);
			return () => document.removeEventListener('mousedown', handleOutside);
		}
	});

	const sizeMap: Record<Size, { padding: string; fontSize: string; height: string }> = {
		xs: { padding: '4px 8px', fontSize: '12px', height: '28px' },
		sm: { padding: '5px 10px', fontSize: '14px', height: '32px' },
		md: { padding: '7px 12px', fontSize: '14px', height: '38px' },
		lg: { padding: '9px 14px', fontSize: '16px', height: '44px' },
		xl: { padding: '11px 16px', fontSize: '18px', height: '52px' }
	};
</script>

<div bind:this={wrapperEl} class="combobox-root {className || ''}" {...restProps}>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="combobox-control combobox-control-{variant} combobox-control-{variant}-{color} combobox-control-{size} {hasError ? 'combobox-control-error' : ''} {disabled ? 'combobox-control-disabled' : ''}"
		onclick={() => !disabled && inputEl?.focus()}
	>
		<input
			bind:this={inputEl}
			role="combobox"
			aria-autocomplete="list"
			aria-expanded={open}
			aria-controls={listboxId}
			aria-activedescendant={highlightedOptionId}
			aria-invalid={hasError || undefined}
			aria-describedby={typeof error === 'string' ? errorId : undefined}
			class="combobox-input combobox-input-{size}"
			{disabled}
			placeholder={open && selectedOption ? selectedOption.label : placeholder}
			oninput={handleInput}
			onkeydown={handleKeydown}
			onfocus={openDropdown}
		/>

		<span class="combobox-icons" aria-hidden="true">
			{#if clearable && value && !disabled}
				<button
					type="button"
					class="combobox-clear"
					tabindex="-1"
					onclick={clearValue}
					aria-label="Clear selection"
				>
					<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
						<path
							d="M2 2l8 8M10 2l-8 8"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
						/>
					</svg>
				</button>
			{/if}
			<span class="combobox-chevron" class:combobox-chevron-open={open}>
				<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
					<path
						d="M2 4l4 4 4-4"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</span>
		</span>
	</div>

	{#if open}
		<ul
			bind:this={listboxEl}
			id={listboxId}
			role="listbox"
			class="combobox-listbox"
			aria-label="Options"
		>
			{#if loading}
				<li class="combobox-state-message">
					<span class="combobox-spinner" aria-hidden="true"></span>
					Loading…
				</li>
			{:else if filtered.length === 0}
				<li class="combobox-state-message">{emptyMessage}</li>
			{:else}
				{#each filtered as opt, i}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<li
						id="{listboxId}-option-{i}"
						role="option"
						aria-selected={opt.value === value}
						aria-disabled={opt.disabled || undefined}
						class="combobox-option {opt.value === value ? 'combobox-option-selected' : ''} {i === highlightedIndex ? 'combobox-option-highlighted' : ''} {opt.disabled ? 'combobox-option-disabled' : ''}"
						onmousedown={(e) => {
							e.preventDefault();
							selectOption(opt);
						}}
						onmouseenter={() => {
							highlightedIndex = i;
						}}
					>
						{#if optionSnippet}
							{@render optionSnippet({ option: opt, highlighted: i === highlightedIndex })}
						{:else}
							<span>{opt.label}</span>
							{#if opt.value === value}
								<span class="combobox-check" aria-hidden="true">
									<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
										<path
											d="M2 7l3.5 3.5L12 3"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</span>
							{/if}
						{/if}
					</li>
				{/each}
			{/if}
		</ul>
	{/if}
</div>

{#if typeof error === 'string'}
	<span id={errorId} class="combobox-error-msg">{error}</span>
{/if}

<style>
	.combobox-root {
		position: relative;
		display: inline-block;
		width: 100%;
	}

	.combobox-control {
		position: relative;
		display: flex;
		align-items: center;
		border-radius: 6px;
		background: white;
		transition: border-color 0.15s ease, box-shadow 0.15s ease;
		cursor: text;
	}

	.combobox-input {
		width: 100%;
		border: none;
		outline: none;
		background: transparent;
		color: #1f2937;
		box-sizing: border-box;
		font-family: inherit;
		cursor: inherit;
		border-radius: 6px;
	}

	.combobox-input::placeholder { color: #9ca3af; }

	/* Sizes — matches Input component size scale */
	.combobox-input-xs { padding: 4px 36px 4px 8px;   font-size: 12px; height: 28px; }
	.combobox-input-sm { padding: 5px 36px 5px 10px;  font-size: 14px; height: 32px; }
	.combobox-input-md { padding: 7px 40px 7px 12px;  font-size: 14px; height: 38px; }
	.combobox-input-lg { padding: 9px 44px 9px 14px;  font-size: 16px; height: 44px; }
	.combobox-input-xl { padding: 11px 48px 11px 16px; font-size: 18px; height: 52px; }

	.combobox-control-disabled { opacity: 0.5; cursor: not-allowed; background: #f9fafb; }
	.combobox-control-disabled .combobox-input { pointer-events: none; }

	/* Outline variant */
	.combobox-control-outline { border: 1px solid #d1d5db; }
	.combobox-control-outline:focus-within { border-color: #3b82f6; box-shadow: 0 0 0 3px rgb(59 130 246 / 0.15); }

	.combobox-control-outline-blue:focus-within   { border-color: #3b82f6; box-shadow: 0 0 0 3px rgb(59 130 246 / 0.15); }
	.combobox-control-outline-gray:focus-within   { border-color: #6b7280; box-shadow: 0 0 0 3px rgb(107 114 128 / 0.15); }
	.combobox-control-outline-red:focus-within    { border-color: #ef4444; box-shadow: 0 0 0 3px rgb(239 68 68 / 0.15); }
	.combobox-control-outline-green:focus-within  { border-color: #22c55e; box-shadow: 0 0 0 3px rgb(34 197 94 / 0.15); }
	.combobox-control-outline-teal:focus-within   { border-color: #14b8a6; box-shadow: 0 0 0 3px rgb(20 184 166 / 0.15); }
	.combobox-control-outline-pink:focus-within   { border-color: #ec4899; box-shadow: 0 0 0 3px rgb(236 72 153 / 0.15); }
	.combobox-control-outline-purple:focus-within { border-color: #a855f7; box-shadow: 0 0 0 3px rgb(168 85 247 / 0.15); }
	.combobox-control-outline-cyan:focus-within   { border-color: #06b6d4; box-shadow: 0 0 0 3px rgb(6 182 212 / 0.15); }
	.combobox-control-outline-orange:focus-within { border-color: #f97316; box-shadow: 0 0 0 3px rgb(249 115 22 / 0.15); }
	.combobox-control-outline-yellow:focus-within { border-color: #eab308; box-shadow: 0 0 0 3px rgb(234 179 8 / 0.15); }

	/* Surface variant */
	.combobox-control-surface { border: 1px solid transparent; background: #f3f4f6; }
	.combobox-control-surface:focus-within { background: white; border-color: #3b82f6; box-shadow: 0 0 0 3px rgb(59 130 246 / 0.15); }

	/* Plain variant */
	.combobox-control-plain { border: none; border-bottom: 1px solid #d1d5db; border-radius: 0; background: transparent; }
	.combobox-control-plain:focus-within { border-bottom-color: #3b82f6; box-shadow: none; }

	/* Error state */
	.combobox-control-error { border-color: #ef4444 !important; }
	.combobox-control-error:focus-within { box-shadow: 0 0 0 3px rgb(239 68 68 / 0.15) !important; }

	.combobox-error-msg {
		display: block;
		margin-top: 4px;
		font-size: 12px;
		color: #ef4444;
	}

	/* Icons (chevron + optional clear button) */
	.combobox-icons {
		position: absolute;
		right: 8px;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		align-items: center;
		gap: 2px;
		pointer-events: none;
	}

	.combobox-clear {
		all: unset;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		border-radius: 4px;
		color: #9ca3af;
		cursor: pointer;
		pointer-events: auto;
	}

	.combobox-clear:hover { color: #374151; background: #f3f4f6; }

	.combobox-chevron {
		display: flex;
		align-items: center;
		color: #6b7280;
		transition: transform 0.15s ease;
	}

	.combobox-chevron-open { transform: rotate(180deg); }

	/* Listbox dropdown */
	.combobox-listbox {
		position: absolute;
		top: calc(100% + 4px);
		left: 0;
		right: 0;
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 8px;
		box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
		z-index: 1060;
		max-height: 260px;
		overflow-y: auto;
		list-style: none;
		margin: 0;
		padding: 4px;
		animation: listbox-in 0.1s ease;
	}

	@keyframes listbox-in {
		from { opacity: 0; transform: translateY(-4px); }
		to   { opacity: 1; transform: translateY(0); }
	}

	.combobox-option {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 8px 10px;
		border-radius: 6px;
		font-size: 14px;
		color: #1f2937;
		cursor: pointer;
		user-select: none;
	}

	.combobox-option-highlighted { background: #f3f4f6; }
	.combobox-option-selected { color: #2563eb; font-weight: 500; }
	.combobox-option-selected.combobox-option-highlighted { background: #eff6ff; }
	.combobox-option-disabled { opacity: 0.4; cursor: not-allowed; }

	.combobox-check {
		display: flex;
		align-items: center;
		color: #3b82f6;
		flex-shrink: 0;
	}

	.combobox-state-message {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px;
		font-size: 14px;
		color: #6b7280;
	}

	.combobox-spinner {
		width: 14px;
		height: 14px;
		border: 2px solid #e5e7eb;
		border-top-color: #3b82f6;
		border-radius: 50%;
		animation: spin 0.6s linear infinite;
		flex-shrink: 0;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}
</style>
