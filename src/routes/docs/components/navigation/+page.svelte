<script lang="ts">
import { Tabs, Tab, TabPanel, Breadcrumb, BreadcrumbItem, Pagination } from '$lib/index.js';
import CodeBlock from '$lib/site/CodeBlock.svelte';

let activeTab = $state('tab1');
let page = $state(1);
</script>

<svelte:head><title>Navigation — Svelte UI</title></svelte:head>

<div class="page-header">
<span class="badge">Components</span>
<h1>Navigation</h1>
<p class="lead">Tabs, Breadcrumb, and Pagination navigation components.</p>
</div>

<h2>Tabs</h2>
<div class="demo-block">
<div class="demo" style="flex-direction:column;align-items:stretch">
<Tabs bind:value={activeTab}>
<Tab value="tab1">Account</Tab>
<Tab value="tab2">Password</Tab>
<Tab value="tab3">Notifications</Tab>
<TabPanel value="tab1">Manage your account settings.</TabPanel>
<TabPanel value="tab2">Update your password here.</TabPanel>
<TabPanel value="tab3">Configure your notification preferences.</TabPanel>
</Tabs>
</div>
<CodeBlock code={`<Tabs bind:value>
  <Tab value="account">Account</Tab>
  <Tab value="password">Password</Tab>
  <TabPanel value="account">Account settings content.</TabPanel>
  <TabPanel value="password">Password content.</TabPanel>
</Tabs>`} />
</div>

<h2>Breadcrumb</h2>
<div class="demo-block">
<div class="demo">
<Breadcrumb>
<BreadcrumbItem href="/">Home</BreadcrumbItem>
<BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
<BreadcrumbItem current>Navigation</BreadcrumbItem>
</Breadcrumb>
</div>
<CodeBlock code={`<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
  <BreadcrumbItem current>Navigation</BreadcrumbItem>
</Breadcrumb>`} />
</div>

<h2>Pagination</h2>
<div class="demo-block">
<div class="demo">
<Pagination bind:page total={100} onpagechange={(p) => (page = p)} />
</div>
<CodeBlock code={`<Pagination bind:page total={100} onpagechange={(p) => page = p} />`} />
</div>
