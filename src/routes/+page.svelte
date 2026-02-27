<script lang="ts">
	// No imports needed

	const features = [
		{
			icon: `<svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524z"/></svg>`,
			title: 'Accessible by default',
			desc: 'Every component follows WCAG guidelines with proper ARIA attributes, keyboard navigation, and focus management.'
		},
		{
			icon: `<svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="M6.854 4.646a.5.5 0 0 1 0 .708L4.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0zm2.292 0a.5.5 0 0 0 0 .708L11.793 8l-2.647 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708 0z"/></svg>`,
			title: 'Svelte 5 Runes',
			desc: 'Built with the latest Svelte 5 runes API — $props(), $state(), $derived(), $effect(). No legacy syntax.'
		},
		{
			icon: `<svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/></svg>`,
			title: 'Composable',
			desc: 'Compound components, typed Svelte context, and Snippet-based slots for maximum flexibility.'
		},
		{
			icon: `<svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/></svg>`,
			title: 'TypeScript first',
			desc: 'Every component has full TypeScript types with proper prop interfaces extending HTML element attributes.'
		},
		{
			icon: `<svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM9.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383h1.312z"/></svg>`,
			title: 'Zero dependencies',
			desc: 'No CSS framework, no runtime dependencies. Pure Svelte with scoped CSS and CSS custom properties.'
		},
		{
			icon: `<svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z"/></svg>`,
			title: 'Dark mode',
			desc: 'First-class dark mode support via CSS custom properties and a data-theme attribute on the root element.'
		}
	];

	const categories = [
		{
			title: 'Buttons',
			count: 5,
			href: '/docs/components/button',
			icon: `<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/></svg>`
		},
		{
			title: 'Typography',
			count: 3,
			href: '/docs/components/typography',
			icon: `<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M2.244 13.081l-.943 2.901-.946-2.9H0l1.225 3.6h1.056l1.229-3.601h-.266zM12.5 0h-9A1.5 1.5 0 0 0 2 1.5v5.009l.5.5.5-.5V1.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5H9.009l-.5.5.5.5H12.5A1.5 1.5 0 0 0 14 10.5v-9A1.5 1.5 0 0 0 12.5 0z"/></svg>`
		},
		{
			title: 'Layout',
			count: 3,
			href: '/docs/components/layout',
			icon: `<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/></svg>`
		},
		{
			title: 'Form',
			count: 10,
			href: '/docs/components/form',
			icon: `<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/></svg>`
		},
		{
			title: 'Feedback',
			count: 7,
			href: '/docs/components/feedback',
			icon: `<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/></svg>`
		},
		{
			title: 'Overlay',
			count: 4,
			href: '/docs/components/overlay',
			icon: `<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z"/></svg>`
		},
		{
			title: 'Navigation',
			count: 8,
			href: '/docs/components/navigation',
			icon: `<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/></svg>`
		},
		{
			title: 'Data Display',
			count: 6,
			href: '/docs/components/avatar',
			icon: `<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M3 9.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z"/></svg>`
		}
	];
</script>

<svelte:head>
	<title>Svelte UI — Beautiful components for Svelte 5</title>
</svelte:head>

<div class="home">
	<section class="hero">
		<div class="hero-badge">Svelte 5 · TypeScript · Accessible</div>
		<h1 class="hero-title">
			Build faster with<br /><span class="accent">beautiful components</span>
		</h1>
		<p class="hero-desc">
			A comprehensive UI component library for Svelte 5. Accessible, customizable, and built with
			modern patterns like runes and snippets.
		</p>
		<div class="hero-actions">
			<a href="/docs" class="btn-primary">Get started</a>
			<a href="/docs/components/button" class="btn-outline">Browse components</a>
		</div>
		<div class="hero-stats">
			<div class="stat">
				<span class="stat-num">48+</span><span class="stat-label">Components</span>
			</div>
			<div class="stat-divider"></div>
			<div class="stat">
				<span class="stat-num">Svelte 5</span><span class="stat-label">Runes API</span>
			</div>
			<div class="stat-divider"></div>
			<div class="stat">
				<span class="stat-num">WCAG</span><span class="stat-label">Accessible</span>
			</div>
			<div class="stat-divider"></div>
			<div class="stat">
				<span class="stat-num">0</span><span class="stat-label">Dependencies</span>
			</div>
		</div>
	</section>

	<section class="features">
		<div class="features-grid">
			{#each features as f}
				<div class="feature-card">
					<div class="feature-icon">{@html f.icon}</div>
					<h3>{f.title}</h3>
					<p>{f.desc}</p>
				</div>
			{/each}
		</div>
	</section>

	<section class="components-section">
		<h2>Everything you need</h2>
		<p class="section-desc">
			Browse over 48 components across 9 categories, all built for Svelte 5.
		</p>
		<div class="component-grid">
			{#each categories as cat}
				<a href={cat.href} class="component-card">
					<div class="component-card-icon">{@html cat.icon}</div>
					<div>
						<div class="component-card-title">{cat.title}</div>
						<div class="component-card-count">{cat.count} components</div>
					</div>
				</a>
			{/each}
		</div>
	</section>
</div>

<style>
	.home {
		padding: 0;
	}

	.hero {
		padding: 5rem 2rem 4rem;
		text-align: center;
		max-width: 720px;
		margin: 0 auto;
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 4px 12px;
		font-size: 0.75rem;
		font-weight: 500;
		border-radius: 9999px;
		border: 1px solid var(--border);
		background: var(--bg-subtle);
		color: var(--text-muted);
		margin-bottom: 1.5rem;
	}

	.hero-title {
		font-size: clamp(2.25rem, 5vw, 3.5rem);
		font-weight: 700;
		line-height: 1.1;
		letter-spacing: -0.02em;
		margin: 0 0 1.25rem;
		color: var(--text);
	}

	.accent {
		color: var(--accent);
	}

	.hero-desc {
		font-size: 1.0625rem;
		color: var(--text-muted);
		line-height: 1.65;
		margin: 0 0 2rem;
	}

	.hero-actions {
		display: flex;
		justify-content: center;
		gap: 0.75rem;
		flex-wrap: wrap;
		margin-bottom: 3rem;
	}

	.btn-primary,
	.btn-outline {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.625rem 1.5rem;
		font-size: 0.9375rem;
		font-weight: 500;
		border-radius: 6px;
		text-decoration: none;
		transition:
			background 0.15s,
			border-color 0.15s,
			color 0.15s;
	}

	.btn-primary {
		background: var(--accent);
		color: #fff;
		border: 1px solid transparent;
	}

	.btn-primary:hover {
		background: var(--accent-hover);
	}

	.btn-outline {
		background: transparent;
		color: var(--text);
		border: 1px solid var(--border);
	}

	.btn-outline:hover {
		background: var(--bg-hover);
	}

	.hero-stats {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		flex-wrap: wrap;
	}

	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
	}

	.stat-num {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text);
	}
	.stat-label {
		font-size: 0.75rem;
		color: var(--text-muted);
	}
	.stat-divider {
		width: 1px;
		height: 32px;
		background: var(--border);
	}

	.features {
		padding: 3rem 2rem;
		border-top: 1px solid var(--border);
		background: var(--bg-subtle);
	}

	.features-grid {
		max-width: 1100px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1.5rem;
	}

	.feature-card {
		padding: 1.5rem;
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 10px;
	}

	.feature-icon {
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		background: var(--bg-hover);
		color: var(--accent);
		margin-bottom: 0.875rem;
	}

	.feature-card h3 {
		margin: 0 0 0.5rem;
		font-size: 0.9375rem;
		font-weight: 600;
	}
	.feature-card p {
		margin: 0;
		font-size: 0.875rem;
		color: var(--text-muted);
		line-height: 1.6;
	}

	.components-section {
		padding: 4rem 2rem;
		max-width: 1100px;
		margin: 0 auto;
	}

	.components-section h2 {
		font-size: 1.75rem;
		font-weight: 700;
		margin: 0 0 0.5rem;
	}
	.section-desc {
		font-size: 0.9375rem;
		color: var(--text-muted);
		margin: 0 0 2.5rem;
	}

	.component-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1rem;
	}

	.component-card {
		display: flex;
		align-items: center;
		gap: 0.875rem;
		padding: 1rem 1.25rem;
		background: var(--bg-subtle);
		border: 1px solid var(--border);
		border-radius: 10px;
		text-decoration: none;
		color: var(--text);
		transition:
			border-color 0.15s,
			background 0.15s,
			transform 0.15s;
	}

	.component-card:hover {
		border-color: var(--accent);
		background: var(--bg);
		transform: translateY(-1px);
	}

	.component-card-icon {
		color: var(--accent);
		flex-shrink: 0;
	}
	.component-card-title {
		font-size: 0.875rem;
		font-weight: 500;
	}
	.component-card-count {
		font-size: 0.75rem;
		color: var(--text-muted);
		margin-top: 2px;
	}
</style>
