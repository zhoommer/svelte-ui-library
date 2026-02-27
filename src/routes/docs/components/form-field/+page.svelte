<script lang="ts">
import { FormField, Input, Textarea } from '$lib/index.js';
import CodeBlock from '$lib/site/CodeBlock.svelte';
</script>

<svelte:head><title>Form Field — Svelte UI</title></svelte:head>

<div class="page-header">
<span class="badge">Components</span>
<h1>Form Field</h1>
<p class="lead">Wraps form controls with a label, hint text, and error message with automatic ID wiring.</p>
</div>

<h2>Basic usage</h2>
<div class="demo-block">
<div class="demo" style="flex-direction:column;align-items:stretch;max-width:360px">
<FormField label="Email address" hint="We'll never share your email.">
<Input type="email" placeholder="you@example.com" />
</FormField>
<FormField label="Message" error="Message is required">
<Textarea placeholder="Your message…" rows={3} />
</FormField>
</div>
<CodeBlock code={`<FormField label="Email address" hint="We'll never share your email.">
  <Input type="email" placeholder="you@example.com" />
</FormField>

<FormField label="Message" error="Message is required">
  <Textarea placeholder="Your message…" rows={3} />
</FormField>`} />
</div>

<h2>Required field</h2>
<div class="demo-block">
<div class="demo" style="flex-direction:column;align-items:stretch;max-width:360px">
<FormField label="Full name" required>
<Input placeholder="John Doe" />
</FormField>
</div>
<CodeBlock code={`<FormField label="Full name" required>
  <Input placeholder="John Doe" />
</FormField>`} />
</div>
