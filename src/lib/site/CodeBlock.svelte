<script lang="ts">
	import hljs from 'highlight.js/lib/core';
	import xml from 'highlight.js/lib/languages/xml';
	import typescript from 'highlight.js/lib/languages/typescript';
	import { onMount } from 'svelte';

	hljs.registerLanguage('xml', xml);
	hljs.registerLanguage('svelte', xml);
	hljs.registerLanguage('typescript', typescript);

	interface Props {
		code: string;
		lang?: string;
	}

	let { code, lang = 'svelte' }: Props = $props();

	let copied = $state(false);
	let highlighted = $state('');

	onMount(() => {
		try {
			highlighted = hljs.highlight(code.trim(), { language: lang }).value;
		} catch {
			highlighted = code.trim();
		}
	});

	function copy() {
		navigator.clipboard.writeText(code.trim()).then(() => {
			copied = true;
			setTimeout(() => (copied = false), 2000);
		});
	}
</script>

<div class="code-block">
	<button class="copy-btn" onclick={copy} aria-label="Copy code">
		{#if copied}
			<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
				<path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z"/>
			</svg>
			Copied
		{:else}
			<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
				<path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"/>
				<path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"/>
			</svg>
			Copy
		{/if}
	</button>
	<pre><code class="hljs language-{lang}">{@html highlighted || code.trim()}</code></pre>
</div>

<style>
	.code-block {
		position: relative;
		background: var(--code-bg, #0d1117);
		border-radius: 8px;
		overflow: hidden;
		border: 1px solid var(--border);
	}

	pre {
		margin: 0;
		padding: 1.25rem 1.5rem;
		overflow-x: auto;
		font-size: 0.8125rem;
		line-height: 1.7;
	}

	code {
		font-family: 'Geist Mono', 'Fira Code', 'Cascadia Code', ui-monospace, monospace;
		background: none;
	}

	.copy-btn {
		position: absolute;
		top: 0.625rem;
		right: 0.625rem;
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 4px 10px;
		font-size: 0.75rem;
		font-family: inherit;
		cursor: pointer;
		border-radius: 6px;
		border: 1px solid var(--border);
		background: var(--bg-subtle);
		color: var(--text-muted);
		transition: color 0.15s, background 0.15s;
	}

	.copy-btn:hover {
		color: var(--text);
		background: var(--bg-hover);
	}
</style>
