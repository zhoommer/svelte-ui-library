<script lang="ts">
	import { page } from '$app/state';
	import { theme } from '$lib/site/theme.svelte.js';
	import { nav } from '$lib/site/nav.js';
	import { onMount } from 'svelte';

	let { children } = $props();

	let mobileMenuOpen = $state(false);

	onMount(() => {
		theme.init();
	});
</script>

<svelte:head>
	<title>Svelte UI</title>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/github-dark.min.css" />
</svelte:head>

<div class="site" class:dark={theme.dark}>
	<!-- Top Navbar -->
	<header class="navbar">
		<div class="navbar-inner">
			<div class="navbar-left">
				<button class="mobile-menu-btn" onclick={() => (mobileMenuOpen = !mobileMenuOpen)} aria-label="Toggle menu">
					<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
						<path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
					</svg>
				</button>
				<a href="/" class="logo">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
						<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
					<span>Svelte UI</span>
				</a>
			</div>
			<nav class="navbar-links">
				<a href="/docs" class:active={page.url.pathname.startsWith('/docs')}>Docs</a>
				<a href="/docs/components/button" class:active={page.url.pathname.includes('/components')}>Components</a>
			</nav>
			<div class="navbar-right">
				<a href="https://github.com" class="icon-btn" aria-label="GitHub" target="_blank" rel="noreferrer">
					<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
						<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
					</svg>
				</a>
				<button class="icon-btn" onclick={theme.toggle} aria-label="Toggle theme">
					{#if theme.dark}
						<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
							<path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
						</svg>
					{:else}
						<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
							<path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
						</svg>
					{/if}
				</button>
			</div>
		</div>
	</header>

	<div class="body">
		<!-- Sidebar -->
		<aside class="sidebar" class:open={mobileMenuOpen}>
			<nav class="sidebar-nav">
				{#each nav as section}
					<div class="nav-section">
						<p class="nav-section-title">{section.title}</p>
						{#each section.items as item}
							<a
								href={item.href}
								class="nav-link"
								class:active={page.url.pathname === item.href}
								onclick={() => (mobileMenuOpen = false)}
							>{item.title}</a>
						{/each}
					</div>
				{/each}
			</nav>
		</aside>

		{#if mobileMenuOpen}
			<div class="overlay" onclick={() => (mobileMenuOpen = false)} role="presentation"></div>
		{/if}

		<!-- Main content -->
		<main class="main">
			{@render children()}
		</main>
	</div>
</div>

<style>
	:global(*, *::before, *::after) { box-sizing: border-box; }
	:global(body) {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif;
		font-size: 15px;
		-webkit-font-smoothing: antialiased;
	}

	/* Light theme */
	:global(:root), :global([data-theme='light']) {
		--bg: #ffffff;
		--bg-subtle: #f9fafb;
		--bg-hover: #f3f4f6;
		--border: #e5e7eb;
		--text: #111827;
		--text-muted: #6b7280;
		--text-light: #9ca3af;
		--accent: #3b82f6;
		--accent-hover: #2563eb;
		--sidebar-bg: #f9fafb;
		--navbar-bg: rgba(255,255,255,0.85);
		--code-bg: #0d1117;
		--demo-bg: #f9fafb;
		--demo-border: #e5e7eb;
		--shadow-sm: 0 1px 2px rgba(0,0,0,.05);
		--shadow: 0 4px 6px -1px rgba(0,0,0,.1);
	}

	/* Dark theme */
	:global([data-theme='dark']) {
		--bg: #09090b;
		--bg-subtle: #18181b;
		--bg-hover: #27272a;
		--border: #27272a;
		--text: #fafafa;
		--text-muted: #a1a1aa;
		--text-light: #71717a;
		--accent: #60a5fa;
		--accent-hover: #93c5fd;
		--sidebar-bg: #09090b;
		--navbar-bg: rgba(9,9,11,0.85);
		--code-bg: #0d1117;
		--demo-bg: #18181b;
		--demo-border: #27272a;
	}

	.site {
		min-height: 100vh;
		background: var(--bg);
		color: var(--text);
	}

	/* Navbar */
	.navbar {
		position: sticky;
		top: 0;
		z-index: 50;
		height: 56px;
		background: var(--navbar-bg);
		backdrop-filter: blur(8px);
		border-bottom: 1px solid var(--border);
	}

	.navbar-inner {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 1.5rem;
		height: 100%;
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.navbar-left {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 8px;
		font-weight: 600;
		font-size: 0.9375rem;
		color: var(--text);
		text-decoration: none;
	}

	.navbar-links {
		display: flex;
		gap: 0.25rem;
	}

	.navbar-links a {
		padding: 4px 12px;
		font-size: 0.875rem;
		color: var(--text-muted);
		text-decoration: none;
		border-radius: 6px;
		transition: color 0.15s, background 0.15s;
	}

	.navbar-links a:hover, .navbar-links a.active {
		color: var(--text);
		background: var(--bg-hover);
	}

	.navbar-right {
		margin-left: auto;
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.icon-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 34px;
		height: 34px;
		border-radius: 6px;
		border: none;
		background: transparent;
		color: var(--text-muted);
		cursor: pointer;
		text-decoration: none;
		transition: color 0.15s, background 0.15s;
	}

	.icon-btn:hover { color: var(--text); background: var(--bg-hover); }

	.mobile-menu-btn {
		display: none;
		align-items: center;
		justify-content: center;
		width: 34px;
		height: 34px;
		border-radius: 6px;
		border: none;
		background: transparent;
		color: var(--text-muted);
		cursor: pointer;
	}

	/* Body layout */
	.body {
		max-width: 1400px;
		margin: 0 auto;
		display: flex;
		min-height: calc(100vh - 56px);
	}

	/* Sidebar */
	.sidebar {
		width: 240px;
		flex-shrink: 0;
		padding: 1.5rem 0;
		position: sticky;
		top: 56px;
		height: calc(100vh - 56px);
		overflow-y: auto;
		border-right: 1px solid var(--border);
		background: var(--sidebar-bg);
	}

	.sidebar-nav {
		padding: 0 0.75rem;
	}

	.nav-section {
		margin-bottom: 1.5rem;
	}

	.nav-section-title {
		margin: 0 0 0.375rem 0.5rem;
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--text-light);
	}

	.nav-link {
		display: block;
		padding: 0.3125rem 0.5rem;
		font-size: 0.875rem;
		color: var(--text-muted);
		text-decoration: none;
		border-radius: 6px;
		transition: color 0.15s, background 0.15s;
	}

	.nav-link:hover { color: var(--text); background: var(--bg-hover); }
	.nav-link.active { color: var(--text); background: var(--bg-hover); font-weight: 500; }

	/* Main */
	.main {
		flex: 1;
		min-width: 0;
	}

	/* Mobile */
	.overlay {
		display: none;
		position: fixed;
		inset: 0;
		background: rgba(0,0,0,0.4);
		z-index: 40;
	}

	@media (max-width: 768px) {
		.mobile-menu-btn { display: flex; }
		.navbar-links { display: none; }

		.sidebar {
			position: fixed;
			top: 56px;
			left: -260px;
			height: calc(100vh - 56px);
			width: 240px;
			z-index: 50;
			transition: left 0.25s ease;
			box-shadow: var(--shadow);
		}

		.sidebar.open { left: 0; }
		.overlay { display: block; }
	}
</style>
