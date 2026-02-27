<script lang="ts">
import { Checkbox, Radio, RadioGroup, Switch } from '$lib/index.js';
import CodeBlock from '$lib/site/CodeBlock.svelte';

let checked = $state(false);
let radioVal = $state('a');
let toggled = $state(false);
</script>

<svelte:head><title>Checkbox & Radio — Svelte UI</title></svelte:head>

<div class="page-header">
<span class="badge">Components</span>
<h1>Checkbox & Radio</h1>
<p class="lead">Checkbox, Radio, RadioGroup, and Switch selection controls.</p>
</div>

<h2>Checkbox</h2>
<div class="demo-block">
<div class="demo" style="flex-direction:column;align-items:flex-start">
<Checkbox label="Default checkbox" bind:checked />
<Checkbox label="Checked" checked={true} />
<Checkbox label="Indeterminate" indeterminate />
<Checkbox label="Disabled" disabled />
</div>
<CodeBlock code={`<Checkbox label="Accept terms" bind:checked />
<Checkbox label="Indeterminate" indeterminate />
<Checkbox label="Disabled" disabled />`} />
</div>

<h2>RadioGroup</h2>
<div class="demo-block">
<div class="demo">
<RadioGroup name="demo" bind:value={radioVal} legend="Pick one">
<Radio value="a" label="Option A" />
<Radio value="b" label="Option B" />
<Radio value="c" label="Option C" />
</RadioGroup>
</div>
<CodeBlock code={`<RadioGroup name="size" bind:value legend="Size">
  <Radio value="sm" label="Small" />
  <Radio value="md" label="Medium" />
  <Radio value="lg" label="Large" />
</RadioGroup>`} />
</div>

<h2>Switch</h2>
<div class="demo-block">
<div class="demo" style="flex-direction:column;align-items:flex-start">
<Switch label="Notifications" bind:checked={toggled} />
<Switch label="Dark mode" checked={true} color="purple" />
<Switch label="Disabled" disabled />
</div>
<CodeBlock code={`<Switch label="Notifications" bind:checked />
<Switch label="Dark mode" color="purple" />
<Switch disabled />`} />
</div>
