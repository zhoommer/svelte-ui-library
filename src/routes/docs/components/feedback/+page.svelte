<script lang="ts">
import { Alert, Badge, Progress, ProgressCircle, Skeleton } from '$lib/index.js';
import type { Color } from '$lib/types.js';
import CodeBlock from '$lib/site/CodeBlock.svelte';
</script>

<svelte:head><title>Feedback — Svelte UI</title></svelte:head>

<div class="page-header">
<span class="badge">Components</span>
<h1>Feedback</h1>
<p class="lead">Alert, Badge, Progress, ProgressCircle, and Skeleton feedback components.</p>
</div>

<h2>Alert</h2>
<div class="demo-block">
<div class="demo" style="flex-direction:column;align-items:stretch;gap:0.75rem">
<Alert color="blue" variant="surface" title="Info">Here is some helpful information.</Alert>
<Alert color="green" variant="surface" title="Success">Your changes have been saved.</Alert>
<Alert color="red" variant="surface" title="Error">Something went wrong. Please try again.</Alert>
<Alert color="yellow" variant="surface" title="Warning">Please review before proceeding.</Alert>
</div>
<CodeBlock code={`<Alert color="blue" title="Info">Here is some helpful information.</Alert>
<Alert color="green" title="Success">Your changes have been saved.</Alert>
<Alert color="red" title="Error">Something went wrong.</Alert>
<Alert color="yellow" title="Warning">Please review before proceeding.</Alert>`} />
</div>

<h2>Badge</h2>
<div class="demo-block">
<div class="demo">
{#each ['blue','green','red','yellow','purple','gray'] as color}
<Badge color={color as Color}>{color}</Badge>
{/each}
<Badge color="green" dot>Online</Badge>
</div>
<CodeBlock code={`<Badge color="blue">New</Badge>
<Badge color="green" dot>Online</Badge>`} />
</div>

<h2>Progress</h2>
<div class="demo-block">
<div class="demo" style="flex-direction:column;align-items:stretch;gap:0.75rem;width:100%">
<Progress value={30} color="blue" />
<Progress value={65} color="green" />
<Progress color="blue" />
</div>
<CodeBlock code={`<Progress value={30} color="blue" />
<Progress value={65} color="green" />
<Progress color="blue" /> <!-- indeterminate -->`} />
</div>

<h2>ProgressCircle</h2>
<div class="demo-block">
<div class="demo">
<ProgressCircle value={25} color="blue" size={64} />
<ProgressCircle value={60} color="green" size={64} />
<ProgressCircle value={85} color="red" size={64} />
</div>
<CodeBlock code={`<ProgressCircle value={60} color="green" size={64} />`} />
</div>

<h2>Skeleton</h2>
<div class="demo-block">
<div class="demo" style="flex-direction:column;align-items:stretch;gap:0.5rem;width:260px">
<Skeleton variant="text" width="100%" />
<Skeleton variant="text" width="80%" />
<Skeleton variant="text" width="60%" />
<Skeleton variant="rectangular" width="100%" height="80px" />
<Skeleton variant="circular" width="48px" height="48px" />
</div>
<CodeBlock code={`<Skeleton variant="text" />
<Skeleton variant="rectangular" height="80px" />
<Skeleton variant="circular" width="48px" height="48px" />`} />
</div>
