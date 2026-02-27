<script lang="ts">
import { Modal, Drawer, Tooltip, Button } from '$lib/index.js';
import CodeBlock from '$lib/site/CodeBlock.svelte';

let modalOpen = $state(false);
let drawerOpen = $state(false);
</script>

<svelte:head><title>Modal & Drawer — Svelte UI</title></svelte:head>

<Modal bind:open={modalOpen} title="Confirm Action">
<p style="margin:0 0 1.5rem;color:var(--text-muted)">Are you sure you want to proceed? This action cannot be undone.</p>
<div style="display:flex;gap:0.75rem;justify-content:flex-end">
<Button variant="outline" color="gray" onclick={() => (modalOpen = false)}>Cancel</Button>
<Button variant="solid" color="red" onclick={() => (modalOpen = false)}>Delete</Button>
</div>
</Modal>

<Drawer bind:open={drawerOpen} title="Navigation">
<p style="color:var(--text-muted)">Drawer content goes here.</p>
</Drawer>

<div class="page-header">
<span class="badge">Components</span>
<h1>Overlay</h1>
<p class="lead">Modal, Drawer, Tooltip, and Popover overlay components with focus trapping and scroll locking.</p>
</div>

<h2>Modal</h2>
<div class="demo-block">
<div class="demo">
<Button color="blue" variant="solid" onclick={() => (modalOpen = true)}>Open Modal</Button>
</div>
<CodeBlock code={`<Modal bind:open title="Confirm Action">
  <p>Are you sure you want to proceed?</p>
  <div>
    <Button onclick={() => open = false}>Cancel</Button>
    <Button color="red" onclick={() => open = false}>Delete</Button>
  </div>
</Modal>

<Button onclick={() => open = true}>Open Modal</Button>`} />
</div>

<h2>Drawer</h2>
<div class="demo-block">
<div class="demo">
<Button color="purple" variant="solid" onclick={() => (drawerOpen = true)}>Open Drawer</Button>
</div>
<CodeBlock code={`<Drawer bind:open title="Navigation" placement="left">
  <p>Drawer content.</p>
</Drawer>`} />
</div>

<h2>Tooltip</h2>
<div class="demo-block">
<div class="demo">
<Tooltip label="This is a tooltip">
<Button variant="outline" color="gray">Hover me</Button>
</Tooltip>
<Tooltip label="Top placement" placement="top">
<Button variant="outline" color="gray">Top</Button>
</Tooltip>
</div>
<CodeBlock code={`<Tooltip label="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>`} />
</div>
