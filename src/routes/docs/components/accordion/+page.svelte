<script lang="ts">
import { Accordion, AccordionItem } from '$lib/index.js';
import CodeBlock from '$lib/site/CodeBlock.svelte';
</script>

<svelte:head><title>Accordion — Svelte UI</title></svelte:head>

<div class="page-header">
<span class="badge">Components</span>
<h1>Accordion</h1>
<p class="lead">Collapsible content panels. Supports single and multiple open items.</p>
</div>

<h2>Single mode</h2>
<div class="demo-block">
<div class="demo" style="flex-direction:column;align-items:stretch;width:100%">
<Accordion>
<AccordionItem value="item1" title="What is Svelte UI?">
<p style="margin:0;color:var(--text-muted);font-size:0.875rem">
Svelte UI is a comprehensive component library built from scratch for Svelte 5
using the new runes API.
</p>
</AccordionItem>
<AccordionItem value="item2" title="Is it accessible?">
<p style="margin:0;color:var(--text-muted);font-size:0.875rem">
Yes! Every component follows WCAG guidelines with keyboard navigation and ARIA support.
</p>
</AccordionItem>
<AccordionItem value="item3" title="Does it support dark mode?">
<p style="margin:0;color:var(--text-muted);font-size:0.875rem">
Absolutely. Dark mode is handled via CSS custom properties and a data-theme attribute.
</p>
</AccordionItem>
</Accordion>
</div>
<CodeBlock code={`<Accordion>
  <AccordionItem value="item1" title="What is Svelte UI?">
    <p>A component library for Svelte 5.</p>
  </AccordionItem>
  <AccordionItem value="item2" title="Is it accessible?">
    <p>Yes! WCAG compliant.</p>
  </AccordionItem>
</Accordion>`} />
</div>

<h2>Multiple mode</h2>
<div class="demo-block">
<div class="demo" style="flex-direction:column;align-items:stretch;width:100%">
<Accordion multiple>
<AccordionItem value="a" title="Section A">Content for section A.</AccordionItem>
<AccordionItem value="b" title="Section B">Content for section B.</AccordionItem>
</Accordion>
</div>
<CodeBlock code={`<Accordion multiple>
  <AccordionItem value="a" title="Section A">Content A</AccordionItem>
  <AccordionItem value="b" title="Section B">Content B</AccordionItem>
</Accordion>`} />
</div>
