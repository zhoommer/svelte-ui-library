<script lang="ts">
import { Toaster, toast, Button } from '$lib/index.js';
import CodeBlock from '$lib/site/CodeBlock.svelte';
</script>

<svelte:head><title>Toast — Svelte UI</title></svelte:head>

<Toaster />

<div class="page-header">
<span class="badge">Components</span>
<h1>Toast</h1>
<p class="lead">Non-blocking notification toasts via a Svelte store. Add <code>&lt;Toaster /&gt;</code> once to your layout.</p>
</div>

<h2>Toast types</h2>
<div class="demo-block">
<div class="demo">
<Button color="blue" variant="solid" onclick={() => toast.info('Here is some information.')}>Info</Button>
<Button color="green" variant="solid" onclick={() => toast.success('Operation completed successfully!')}>Success</Button>
<Button color="red" variant="solid" onclick={() => toast.error('Something went wrong.')}>Error</Button>
<Button color="yellow" variant="solid" onclick={() => toast.warning('Please proceed with caution.')}>Warning</Button>
</div>
<CodeBlock code={`import { toast } from 'svelte-components';

toast.info('Here is some information.');
toast.success('Saved successfully!');
toast.error('Something went wrong.');
toast.warning('Proceed with caution.');`} lang="typescript" />
</div>

<h2>Setup</h2>
<p>Add <code>&lt;Toaster /&gt;</code> once to your root layout:</p>
<CodeBlock code={`<!-- src/routes/+layout.svelte -->
<script>
  import { Toaster } from 'svelte-components';
<\/script>

<slot />
<Toaster placement="bottom-right" maxToasts={5} />`} />

<h2>API</h2>
<div class="props-table">
<table>
<thead><tr><th>Method</th><th>Signature</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>toast.success()</code></td><td><code>(message, options?) => string</code></td><td>Green success toast</td></tr>
<tr><td><code>toast.error()</code></td><td><code>(message, options?) => string</code></td><td>Red error toast</td></tr>
<tr><td><code>toast.warning()</code></td><td><code>(message, options?) => string</code></td><td>Yellow warning toast</td></tr>
<tr><td><code>toast.info()</code></td><td><code>(message, options?) => string</code></td><td>Blue info toast</td></tr>
<tr><td><code>toast.remove()</code></td><td><code>(id: string) => void</code></td><td>Remove by ID</td></tr>
<tr><td><code>toast.clear()</code></td><td><code>() => void</code></td><td>Remove all toasts</td></tr>
</tbody>
</table>
</div>
