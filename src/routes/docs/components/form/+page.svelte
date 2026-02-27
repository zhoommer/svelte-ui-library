<script lang="ts">
import { Input, Textarea, Select, NumberInput } from '$lib/index.js';
import CodeBlock from '$lib/site/CodeBlock.svelte';

let numVal = $state(0);
</script>

<svelte:head><title>Inputs — Svelte UI</title></svelte:head>

<div class="page-header">
<span class="badge">Components</span>
<h1>Inputs</h1>
<p class="lead">Text input, textarea, select, and number input form controls.</p>
</div>

<h2>Input</h2>
<div class="demo-block">
<div class="demo" style="flex-direction:column;align-items:stretch;max-width:320px">
<Input placeholder="Default input" />
<Input placeholder="With error" error="This field is required" />
<Input placeholder="Disabled" disabled />
</div>
<CodeBlock code={`<Input placeholder="Your name" />
<Input placeholder="Error state" error="This field is required" />
<Input disabled />`} />
</div>

<h2>Sizes</h2>
<div class="demo-block">
<div class="demo" style="flex-direction:column;align-items:stretch;max-width:320px">
<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />
</div>
<CodeBlock code={`<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />`} />
</div>

<h2>Textarea</h2>
<div class="demo-block">
<div class="demo" style="flex-direction:column;align-items:stretch;max-width:320px">
<Textarea placeholder="Enter a description…" rows={4} />
</div>
<CodeBlock code={`<Textarea placeholder="Enter a description…" rows={4} />`} />
</div>

<h2>Select</h2>
<div class="demo-block">
<div class="demo" style="flex-direction:column;align-items:stretch;max-width:320px">
<Select>
<option value="">Choose an option</option>
<option value="a">Option A</option>
<option value="b">Option B</option>
<option value="c">Option C</option>
</Select>
</div>
<CodeBlock code={`<Select>
  <option value="">Choose an option</option>
  <option value="a">Option A</option>
</Select>`} />
</div>

<h2>NumberInput</h2>
<div class="demo-block">
<div class="demo" style="max-width:180px">
<NumberInput bind:value={numVal} min={0} max={100} step={1} />
</div>
<CodeBlock code={`<NumberInput bind:value min={0} max={100} step={1} />`} />
</div>
