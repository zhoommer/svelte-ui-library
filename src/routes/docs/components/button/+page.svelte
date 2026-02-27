<script lang="ts">
import { Button, IconButton, CloseButton, ButtonGroup } from '$lib/index.js';
import CodeBlock from '$lib/site/CodeBlock.svelte';
</script>

<svelte:head><title>Button — Svelte UI</title></svelte:head>

<div class="page-header">
<span class="badge">Components</span>
<h1>Button</h1>
<p class="lead">Trigger actions and navigation. Supports multiple variants, colors, sizes, and states.</p>
</div>

<h2>Button variants</h2>
<div class="demo-block">
<div class="demo">
<Button variant="solid" color="blue">Solid</Button>
<Button variant="outline" color="blue">Outline</Button>
<Button variant="ghost" color="blue">Ghost</Button>
<Button variant="surface" color="blue">Surface</Button>
</div>
<CodeBlock code={`<Button variant="solid" color="blue">Solid</Button>
<Button variant="outline" color="blue">Outline</Button>
<Button variant="ghost" color="blue">Ghost</Button>
<Button variant="surface" color="blue">Surface</Button>`} />
</div>

<h2>Colors</h2>
<div class="demo-block">
<div class="demo">
{#each ['blue','green','red','yellow','orange','purple','pink','cyan','gray'] as color}
<Button variant="solid" color={color as any}>{color}</Button>
{/each}
</div>
<CodeBlock code={`<Button color="blue">Blue</Button>
<Button color="green">Green</Button>
<Button color="red">Red</Button>`} />
</div>

<h2>Sizes</h2>
<div class="demo-block">
<div class="demo" style="align-items:flex-end">
<Button size="xs" color="blue" variant="solid">xs</Button>
<Button size="sm" color="blue" variant="solid">sm</Button>
<Button size="md" color="blue" variant="solid">md</Button>
<Button size="lg" color="blue" variant="solid">lg</Button>
<Button size="xl" color="blue" variant="solid">xl</Button>
</div>
<CodeBlock code={`<Button size="xs">xs</Button>
<Button size="sm">sm</Button>
<Button size="md">md</Button>
<Button size="lg">lg</Button>
<Button size="xl">xl</Button>`} />
</div>

<h2>States</h2>
<div class="demo-block">
<div class="demo">
<Button color="blue" variant="solid" loading>Loading</Button>
<Button color="blue" variant="solid" disabled>Disabled</Button>
</div>
<CodeBlock code={`<Button loading>Loading</Button>
<Button disabled>Disabled</Button>`} />
</div>

<h2>ButtonGroup</h2>
<div class="demo-block">
<div class="demo">
<ButtonGroup>
<Button variant="outline" color="blue">Left</Button>
<Button variant="outline" color="blue">Center</Button>
<Button variant="outline" color="blue">Right</Button>
</ButtonGroup>
</div>
<CodeBlock code={`<ButtonGroup>
  <Button variant="outline" color="blue">Left</Button>
  <Button variant="outline" color="blue">Center</Button>
  <Button variant="outline" color="blue">Right</Button>
</ButtonGroup>`} />
</div>

<h2>IconButton</h2>
<div class="demo-block">
<div class="demo">
<IconButton aria-label="Close" color="blue" variant="solid">
<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/></svg>
</IconButton>
<CloseButton color="gray" variant="ghost" />
</div>
<CodeBlock code={`<IconButton aria-label="Close" color="blue" variant="solid">
  <!-- SVG icon -->
</IconButton>
<CloseButton color="gray" variant="ghost" />`} />
</div>

<h2>Props</h2>
<div class="props-table">
<table>
<thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>variant</code></td><td><code>'solid' | 'outline' | 'ghost' | 'surface'</code></td><td><code>'solid'</code></td><td>Visual style</td></tr>
<tr><td><code>color</code></td><td><code>Color</code></td><td><code>'blue'</code></td><td>Color palette</td></tr>
<tr><td><code>size</code></td><td><code>Size</code></td><td><code>'md'</code></td><td>Button size</td></tr>
<tr><td><code>radius</code></td><td><code>Radius</code></td><td><code>'md'</code></td><td>Border radius</td></tr>
<tr><td><code>loading</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Shows spinner, disables button</td></tr>
<tr><td><code>disabled</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Disables the button</td></tr>
<tr><td><code>href</code></td><td><code>string</code></td><td>—</td><td>Renders as <code>&lt;a&gt;</code></td></tr>
</tbody>
</table>
</div>
