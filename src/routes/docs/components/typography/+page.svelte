<script lang="ts">
import { Text, Heading, Divider } from '$lib/index.js';
import CodeBlock from '$lib/site/CodeBlock.svelte';
</script>

<svelte:head><title>Typography — Svelte UI</title></svelte:head>

<div class="page-header">
<span class="badge">Components</span>
<h1>Typography</h1>
<p class="lead">Text, Heading, and Divider components for consistent typographic styles.</p>
</div>

<h2>Heading</h2>
<div class="demo-block">
<div class="demo" style="flex-direction:column;align-items:flex-start;gap:0.5rem">
<Heading level={1} size="2xl">Heading 1 (2xl)</Heading>
<Heading level={2} size="xl">Heading 2 (xl)</Heading>
<Heading level={3} size="lg">Heading 3 (lg)</Heading>
<Heading level={4} size="md">Heading 4 (md)</Heading>
</div>
<CodeBlock code={`<Heading level={1} size="2xl">Heading 1</Heading>
<Heading level={2} size="xl">Heading 2</Heading>
<Heading level={3} size="lg">Heading 3</Heading>`} />
</div>

<h2>Text</h2>
<div class="demo-block">
<div class="demo" style="flex-direction:column;align-items:flex-start">
<Text size="lg">Large text</Text>
<Text size="md">Medium text (default)</Text>
<Text size="sm" color="gray">Small muted text</Text>
<Text weight="bold">Bold text</Text>
<Text truncate style="max-width:200px">This text will truncate when it gets too long</Text>
</div>
<CodeBlock code={`<Text size="lg">Large text</Text>
<Text size="sm" color="gray">Small muted text</Text>
<Text weight="bold">Bold text</Text>
<Text truncate style="max-width:200px">Truncated text</Text>`} />
</div>

<h2>Divider</h2>
<div class="demo-block">
<div class="demo" style="flex-direction:column;width:100%;gap:1rem">
<Divider />
<Divider label="OR" />
</div>
<CodeBlock code={`<Divider />
<Divider label="OR" />`} />
</div>
