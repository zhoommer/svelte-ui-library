<script lang="ts">
	import CodeBlock from '$lib/site/CodeBlock.svelte';
</script>

<svelte:head>
	<title>Installation — Svelte UI</title>
</svelte:head>

<div class="page-header">
	<span class="badge">Docs</span>
	<h1>Installation</h1>
	<p class="lead">Add Svelte UI to your SvelteKit project in minutes.</p>
</div>

<h2>Install</h2>
<CodeBlock lang="typescript" code={`npm install svelte-components`} />

<h2>Import components</h2>
<p>Import any component directly from the package:</p>
<CodeBlock code={`<script lang="ts">
  import { Button, Input, Modal } from 'svelte-components';
<\/script>

<Button color="blue" variant="solid">Click me</Button>`} />

<h2>Dark mode</h2>
<p>
	Set <code>data-theme="dark"</code> on <code>&lt;html&gt;</code> or any parent element
	to enable dark mode. All CSS custom properties will update automatically.
</p>
<CodeBlock lang="typescript" code={`document.documentElement.setAttribute('data-theme', 'dark');`} />

<h2>CSS tokens</h2>
<p>
	Import the tokens stylesheet to use the design system's CSS custom properties in your own styles:
</p>
<CodeBlock lang="typescript" code={`import 'svelte-components/tokens.css';`} />
