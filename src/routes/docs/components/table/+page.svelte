<script lang="ts">
import { Table } from '$lib/index.js';
import CodeBlock from '$lib/site/CodeBlock.svelte';

const users = [
{ name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
{ name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Active' },
{ name: 'Carol White', email: 'carol@example.com', role: 'User', status: 'Inactive' },
];
</script>

<svelte:head><title>Table — Svelte UI</title></svelte:head>

<div class="page-header">
<span class="badge">Components</span>
<h1>Table</h1>
<p class="lead">A styled native HTML table wrapper with simple, striped, and bordered variants.</p>
</div>

<h2>Simple</h2>
<div class="demo-block">
<div class="demo" style="flex-direction:column;align-items:stretch;padding:0">
<Table>
<thead>
<tr>
<th>Name</th><th>Email</th><th>Role</th><th>Status</th>
</tr>
</thead>
<tbody>
{#each users as user}
<tr>
<td>{user.name}</td>
<td>{user.email}</td>
<td>{user.role}</td>
<td>{user.status}</td>
</tr>
{/each}
</tbody>
</Table>
</div>
<CodeBlock code={`<Table>
  <thead>
    <tr><th>Name</th><th>Email</th><th>Role</th></tr>
  </thead>
  <tbody>
    {#each users as user}
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
      </tr>
    {/each}
  </tbody>
</Table>`} />
</div>

<h2>Striped</h2>
<div class="demo-block">
<div class="demo" style="flex-direction:column;align-items:stretch;padding:0">
<Table variant="striped">
<thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
<tbody>
{#each users as user}
<tr><td>{user.name}</td><td>{user.email}</td><td>{user.role}</td></tr>
{/each}
</tbody>
</Table>
</div>
<CodeBlock code={`<Table variant="striped">...</Table>`} />
</div>
