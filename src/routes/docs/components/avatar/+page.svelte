<script lang="ts">
import { Avatar, AvatarGroup, Tag } from '$lib/index.js';
import type { Color } from '$lib/types.js';
import CodeBlock from '$lib/site/CodeBlock.svelte';
</script>

<svelte:head><title>Avatar — Svelte UI</title></svelte:head>

<div class="page-header">
<span class="badge">Components</span>
<h1>Avatar</h1>
<p class="lead">Avatar, AvatarGroup, and Tag display components.</p>
</div>

<h2>Avatar</h2>
<div class="demo-block">
<div class="demo" style="align-items:flex-end">
<Avatar name="Alice Johnson" size="sm" />
<Avatar name="Bob Smith" size="md" color="purple" />
<Avatar name="Carol White" size="lg" color="green" />
<Avatar src="https://i.pravatar.cc/80?img=3" name="Dave Brown" size="lg" />
</div>
<CodeBlock code={`<Avatar name="Alice Johnson" />
<Avatar name="Bob Smith" color="purple" />
<Avatar src="/avatar.jpg" name="Dave Brown" />`} />
</div>

<h2>AvatarGroup</h2>
<div class="demo-block">
<div class="demo">
<AvatarGroup max={4}>
<Avatar name="Alice Johnson" color="blue" />
<Avatar name="Bob Smith" color="purple" />
<Avatar name="Carol White" color="green" />
<Avatar name="Dave Brown" color="red" />
<Avatar name="Eve Davis" color="orange" />
</AvatarGroup>
</div>
<CodeBlock code={`<AvatarGroup max={4}>
  <Avatar name="Alice Johnson" />
  <Avatar name="Bob Smith" />
</AvatarGroup>`} />
</div>

<h2>Tag</h2>
<div class="demo-block">
<div class="demo">
{#each ['blue','green','red','purple','orange','gray'] as color}
<Tag color={color as Color}>{color}</Tag>
{/each}
<Tag color="blue" closable onclose={() => {}}>Closable</Tag>
</div>
<CodeBlock code={`<Tag color="blue">Tag</Tag>
<Tag color="green" closable onclose={handleClose}>Closable</Tag>`} />
</div>
