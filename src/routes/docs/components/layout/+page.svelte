<script lang="ts">
import { Stack, Container, Card } from '$lib/index.js';
import CodeBlock from '$lib/site/CodeBlock.svelte';
</script>

<svelte:head><title>Layout — Svelte UI</title></svelte:head>

<div class="page-header">
<span class="badge">Components</span>
<h1>Layout</h1>
<p class="lead">Stack, Container, and Card — primitive layout building blocks.</p>
</div>

<h2>Stack</h2>
<div class="demo-block">
<div class="demo">
<Stack direction="row" gap={4}>
<div style="padding:8px 16px;background:var(--bg-hover);border-radius:6px;border:1px solid var(--border)">Item 1</div>
<div style="padding:8px 16px;background:var(--bg-hover);border-radius:6px;border:1px solid var(--border)">Item 2</div>
<div style="padding:8px 16px;background:var(--bg-hover);border-radius:6px;border:1px solid var(--border)">Item 3</div>
</Stack>
</div>
<CodeBlock code={`<Stack direction="row" gap={4}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>`} />
</div>

<h2>Card</h2>
<div class="demo-block">
<div class="demo">
<Card style="width:280px">
{#snippet header()}<strong>Card Title</strong>{/snippet}
<p style="margin:0;font-size:0.875rem;color:var(--text-muted)">Card body content goes here.</p>
{#snippet footer()}<span style="font-size:0.8rem;color:var(--text-muted)">Card footer</span>{/snippet}
</Card>
</div>
<CodeBlock code={`<Card>
  {#snippet header()}Card Title{/snippet}
  <p>Card body content.</p>
  {#snippet footer()}Footer{/snippet}
</Card>`} />
</div>

<h2>Container</h2>
<CodeBlock code={`<Container maxWidth="xl">
  <!-- content centered with max-width -->
</Container>`} />
