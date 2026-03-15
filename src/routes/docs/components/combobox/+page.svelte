<script lang="ts">
	import { Combobox } from '$lib/index.js';
	import type { ComboboxOption } from '$lib/index.js';
	import CodeBlock from '$lib/site/CodeBlock.svelte';

	const frameworks: ComboboxOption[] = [
		{ value: 'svelte', label: 'Svelte' },
		{ value: 'react', label: 'React' },
		{ value: 'vue', label: 'Vue' },
		{ value: 'angular', label: 'Angular' },
		{ value: 'solid', label: 'Solid' },
		{ value: 'qwik', label: 'Qwik' }
	];

	const countries: ComboboxOption[] = [
		{ value: 'us', label: 'United States' },
		{ value: 'uk', label: 'United Kingdom' },
		{ value: 'ca', label: 'Canada' },
		{ value: 'au', label: 'Australia' },
		{ value: 'de', label: 'Germany' },
		{ value: 'fr', label: 'France' },
		{ value: 'jp', label: 'Japan' },
		{ value: 'br', label: 'Brazil' }
	];

	const withDisabled: ComboboxOption[] = [
		{ value: 'free', label: 'Free tier' },
		{ value: 'pro', label: 'Pro' },
		{ value: 'enterprise', label: 'Enterprise', disabled: true },
	];

	let framework = $state('');
	let country = $state('');
	let plan = $state('');
	let clearable = $state('');
	let errored = $state('');
	let custom = $state('');

	function countryFlag(code: string): string {
		const flags: Record<string, string> = {
			us: '🇺🇸', uk: '🇬🇧', ca: '🇨🇦', au: '🇦🇺',
			de: '🇩🇪', fr: '🇫🇷', jp: '🇯🇵', br: '🇧🇷'
		};
		return flags[code] ?? '🏳️';
	}
</script>

<svelte:head><title>Combobox — Svelte UI</title></svelte:head>

<div class="page-header">
	<span class="badge">Components</span>
	<h1>Combobox</h1>
	<p class="lead">
		Searchable select with keyboard navigation, filtering, and full ARIA support.
	</p>
</div>

<h2>Basic</h2>
<div class="demo-block">
	<div class="demo" style="flex-direction:column;align-items:stretch;max-width:320px">
		<Combobox options={frameworks} bind:value={framework} placeholder="Pick a framework" />
		{#if framework}<p style="font-size:13px;color:#6b7280;margin:4px 0 0">Selected: {framework}</p>{/if}
	</div>
	<CodeBlock code={`<script>
  const frameworks = [
    { value: 'svelte', label: 'Svelte' },
    { value: 'react',  label: 'React'  },
    { value: 'vue',    label: 'Vue'    },
  ];
  let value = $state('');
<\/script>

<Combobox options={frameworks} bind:value placeholder="Pick a framework" />`} />
</div>

<h2>Sizes</h2>
<div class="demo-block">
	<div class="demo" style="flex-direction:column;align-items:stretch;max-width:320px">
		<Combobox options={frameworks} size="sm" placeholder="Small" />
		<Combobox options={frameworks} size="md" placeholder="Medium (default)" />
		<Combobox options={frameworks} size="lg" placeholder="Large" />
	</div>
	<CodeBlock code={`<Combobox options={...} size="sm" placeholder="Small" />
<Combobox options={...} size="md" placeholder="Medium" />
<Combobox options={...} size="lg" placeholder="Large" />`} />
</div>

<h2>Variants</h2>
<div class="demo-block">
	<div class="demo" style="flex-direction:column;align-items:stretch;max-width:320px">
		<Combobox options={frameworks} variant="outline" placeholder="Outline (default)" />
		<Combobox options={frameworks} variant="surface" placeholder="Surface" />
		<Combobox options={frameworks} variant="plain" placeholder="Plain" />
	</div>
	<CodeBlock code={`<Combobox options={...} variant="outline" placeholder="Outline" />
<Combobox options={...} variant="surface" placeholder="Surface" />
<Combobox options={...} variant="plain"   placeholder="Plain" />`} />
</div>

<h2>Clearable</h2>
<div class="demo-block">
	<div class="demo" style="flex-direction:column;align-items:stretch;max-width:320px">
		<Combobox options={countries} bind:value={clearable} clearable placeholder="Select a country" />
	</div>
	<CodeBlock code={`<Combobox options={countries} bind:value clearable placeholder="Select a country" />`} />
</div>

<h2>Disabled options</h2>
<div class="demo-block">
	<div class="demo" style="flex-direction:column;align-items:stretch;max-width:320px">
		<Combobox options={withDisabled} bind:value={plan} placeholder="Select a plan" />
	</div>
	<CodeBlock code={`const options = [
  { value: 'free',       label: 'Free tier' },
  { value: 'pro',        label: 'Pro' },
  { value: 'enterprise', label: 'Enterprise', disabled: true },
];

<Combobox {options} bind:value placeholder="Select a plan" />`} />
</div>

<h2>Error state</h2>
<div class="demo-block">
	<div class="demo" style="flex-direction:column;align-items:stretch;max-width:320px">
		<Combobox options={frameworks} bind:value={errored} error="Please select a framework" placeholder="Pick a framework" />
	</div>
	<CodeBlock code={`<Combobox options={...} bind:value error="Please select a framework" />`} />
</div>

<h2>Custom option rendering</h2>
<div class="demo-block">
	<div class="demo" style="flex-direction:column;align-items:stretch;max-width:320px">
		<Combobox options={countries} bind:value={custom} placeholder="Select a country">
			{#snippet option({ option, highlighted })}
				<span style="display:flex;align-items:center;gap:8px;width:100%">
					<span style="font-size:18px">{countryFlag(option.value)}</span>
					<span style="flex:1">{option.label}</span>
					{#if highlighted}
						<span style="font-size:11px;color:#9ca3af">↵ select</span>
					{/if}
				</span>
			{/snippet}
		</Combobox>
	</div>
	<CodeBlock code={`<Combobox options={countries} bind:value>
  {#snippet option({ option, highlighted })}
    <span style="display:flex;align-items:center;gap:8px">
      <span>{countryFlag(option.value)}</span>
      <span>{option.label}</span>
    </span>
  {/snippet}
</Combobox>`} />
</div>

<h2>Disabled</h2>
<div class="demo-block">
	<div class="demo" style="flex-direction:column;align-items:stretch;max-width:320px">
		<Combobox options={frameworks} disabled placeholder="Disabled combobox" />
	</div>
	<CodeBlock code={`<Combobox options={...} disabled placeholder="Disabled combobox" />`} />
</div>

<h2>Props</h2>
<table class="props-table">
	<thead>
		<tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr>
	</thead>
	<tbody>
		<tr><td><code>options</code></td><td><code>ComboboxOption[]</code></td><td>—</td><td>Array of options to display.</td></tr>
		<tr><td><code>value</code></td><td><code>string | undefined</code></td><td><code>undefined</code></td><td>Selected option value (bindable).</td></tr>
		<tr><td><code>placeholder</code></td><td><code>string</code></td><td>—</td><td>Input placeholder text.</td></tr>
		<tr><td><code>size</code></td><td><code>'xs' | 'sm' | 'md' | 'lg' | 'xl'</code></td><td><code>'md'</code></td><td>Control size.</td></tr>
		<tr><td><code>variant</code></td><td><code>'outline' | 'surface' | 'plain'</code></td><td><code>'outline'</code></td><td>Visual style variant.</td></tr>
		<tr><td><code>color</code></td><td><code>Color</code></td><td><code>'blue'</code></td><td>Focus ring color.</td></tr>
		<tr><td><code>disabled</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Disables the combobox.</td></tr>
		<tr><td><code>clearable</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Shows a clear button when a value is selected.</td></tr>
		<tr><td><code>error</code></td><td><code>boolean | string</code></td><td><code>false</code></td><td>Error state; string shows an error message.</td></tr>
		<tr><td><code>emptyMessage</code></td><td><code>string</code></td><td><code>'No options found'</code></td><td>Message shown when no options match the query.</td></tr>
		<tr><td><code>loading</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Shows a loading spinner in the dropdown.</td></tr>
		<tr><td><code>option</code></td><td><code>Snippet&lt;[&#123; option, highlighted &#125;]&gt;</code></td><td>—</td><td>Custom option slot for rendering individual items.</td></tr>
	</tbody>
</table>

<h2>Keyboard navigation</h2>
<table class="props-table">
	<thead>
		<tr><th>Key</th><th>Action</th></tr>
	</thead>
	<tbody>
		<tr><td><code>↓ / ↑</code></td><td>Open dropdown / move highlight</td></tr>
		<tr><td><code>Enter</code></td><td>Select highlighted option</td></tr>
		<tr><td><code>Escape</code></td><td>Close dropdown</td></tr>
		<tr><td><code>Home / End</code></td><td>Jump to first / last option</td></tr>
		<tr><td><code>Tab</code></td><td>Close and move focus</td></tr>
	</tbody>
</table>

