<script lang="ts">
	let { children } = $props();
</script>

<div class="docs-page">
	{@render children()}
</div>

<style>
	.docs-page {
		padding: 2.5rem 3rem;
		max-width: 860px;
	}

	:global(.docs-page h1) {
		font-size: 2rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		margin: 0 0 0.75rem;
		color: var(--text);
	}

	:global(.docs-page h2) {
		font-size: 1.375rem;
		font-weight: 600;
		margin: 2.5rem 0 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--border);
		color: var(--text);
	}

	:global(.docs-page h3) {
		font-size: 1.0625rem;
		font-weight: 600;
		margin: 2rem 0 0.75rem;
		color: var(--text);
	}

	:global(.docs-page p) {
		margin: 0 0 1rem;
		color: var(--text-muted);
		line-height: 1.7;
		font-size: 0.9375rem;
	}

	:global(.docs-page code) {
		font-family: 'Geist Mono', 'Fira Code', ui-monospace, monospace;
		font-size: 0.8125rem;
		background: var(--bg-hover);
		border: 1px solid var(--border);
		border-radius: 4px;
		padding: 1px 5px;
		color: var(--text);
	}

	:global(.docs-page .lead) {
		font-size: 1.0625rem;
		color: var(--text-muted);
		margin-bottom: 2rem;
		line-height: 1.65;
	}

	:global(.docs-page .demo) {
		padding: 2rem;
		background: var(--demo-bg);
		border: 1px solid var(--demo-border);
		border-radius: 10px 10px 0 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		align-items: center;
	}

	:global(.docs-page .demo-block) {
		margin: 2rem 0;
	}

	:global(.docs-page .demo-block .code-block) {
		border-radius: 0 0 10px 10px;
		border-top: none;
	}

	:global(.docs-page table) {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.875rem;
		margin: 1rem 0 2rem;
	}

	:global(.docs-page th) {
		text-align: left;
		padding: 0.625rem 1rem;
		font-weight: 600;
		font-size: 0.8125rem;
		color: var(--text-muted);
		border-bottom: 1px solid var(--border);
		background: var(--bg-subtle);
	}

	:global(.docs-page td) {
		padding: 0.625rem 1rem;
		border-bottom: 1px solid var(--border);
		color: var(--text);
		vertical-align: top;
	}

	:global(.docs-page td code) {
		font-size: 0.8rem;
	}

	:global(.docs-page tr:last-child td) {
		border-bottom: none;
	}

	:global(.docs-page .props-table) {
		border: 1px solid var(--border);
		border-radius: 8px;
		overflow: hidden;
	}

	:global(.docs-page .page-header) {
		margin-bottom: 2.5rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--border);
	}

	:global(.docs-page .page-header .badge) {
		display: inline-block;
		padding: 2px 8px;
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		border-radius: 4px;
		background: var(--bg-hover);
		color: var(--text-muted);
		margin-bottom: 0.75rem;
	}

	@media (max-width: 768px) {
		:global(.docs-page) {
			padding: 1.5rem 1.25rem;
		}
	}
</style>
