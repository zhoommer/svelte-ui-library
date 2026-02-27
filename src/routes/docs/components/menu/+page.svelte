<script lang="ts">
import { Menu, MenuItem, Button } from '$lib/index.js';
import CodeBlock from '$lib/site/CodeBlock.svelte';
</script>

<svelte:head><title>Menu — Svelte UI</title></svelte:head>

<div class="page-header">
<span class="badge">Components</span>
<h1>Menu</h1>
<p class="lead">Dropdown menu with keyboard navigation using Menu and MenuItem.</p>
</div>

<h2>Dropdown menu</h2>
<div class="demo-block">
<div class="demo">
<Menu>
{#snippet trigger()}<Button variant="outline" color="gray">Options ▾</Button>{/snippet}
<MenuItem onclick={() => alert('Profile clicked')}>Profile</MenuItem>
<MenuItem onclick={() => alert('Settings clicked')}>Settings</MenuItem>
<MenuItem href="/docs">Documentation</MenuItem>
<MenuItem onclick={() => alert('Logout')} disabled>Logout (disabled)</MenuItem>
</Menu>
</div>
<CodeBlock code={`<Menu>
  {#snippet trigger()}
    <Button variant="outline">Options ▾</Button>
  {/snippet}
  <MenuItem onclick={handleProfile}>Profile</MenuItem>
  <MenuItem onclick={handleSettings}>Settings</MenuItem>
  <MenuItem href="/help">Help</MenuItem>
</Menu>`} />
</div>
