---
name: svelte-ui-library-patterns
description: Coding patterns extracted from svelte-ui-library — a Svelte 5 UI component library
version: 1.0.0
source: local-git-analysis
analyzed_commits: 2
---

# Svelte UI Library Patterns

## Project Overview

A publishable Svelte 5 UI component library built with SvelteKit, TypeScript, and scoped CSS. Components are distributed via npm using `@sveltejs/package`.

## Code Architecture

```
src/
├── lib/
│   ├── components/
│   │   ├── buttons/        # Button variants (button.svelte, icon-button.svelte, ...)
│   │   └── feedback/       # Feedback components (spinner.svelte, ...)
│   └── index.ts            # Public exports — re-export all public components here
├── routes/
│   └── +page.svelte        # Dev/demo page for manual testing
└── app.html / app.d.ts     # SvelteKit app shell
dist/                       # Built output (do not edit manually)
```

## Component Authoring Patterns

### Props Interface

Always define a typed `Props` interface. Extend the appropriate HTML element attributes so consumers get full native HTML attribute support:

```svelte
<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';

  interface Props extends HTMLButtonAttributes {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'solid' | 'surface' | 'outline' | 'ghost' | 'plain';
    color?: 'gray' | 'red' | 'green' | 'blue' | 'teal' | 'pink' | 'purple' | 'cyan' | 'orange' | 'yellow';
  }

  let { size = 'md', variant = 'solid', color = 'blue', ...restProps }: Props = $props();
</script>
```

- Spread `...restProps` onto the root HTML element so all native attributes pass through.
- Accept `class: className` to allow callers to append extra classes.

### Svelte 5 Runes

Use Svelte 5 runes exclusively — no legacy `export let` props:

```svelte
let { loading = false, disabled = false }: Props = $props();
const isDisabled = $derived(disabled || loading);
```

### Snippets for Children

Use `Snippet` from `svelte` (not `<slot>`):

```svelte
import type { Snippet } from 'svelte';

interface Props {
  children: Snippet;
}
let { children }: Props = $props();

// In template:
{@render children()}
```

### CSS Class Naming

Use a BEM-like pattern with variant and color encoded in class names. Apply classes dynamically via template expressions:

```svelte
class="button button-{size} button-{variant} button-{variant}-{color} button-radius-{radius} {className || ''}"
```

Define all variant+color combinations in the component's `<style>` block (scoped CSS). Do **not** use a CSS framework — all styles are handwritten and scoped.

### Accessibility

- Always include `aria-busy={loading}` when a loading state exists.
- Always include `aria-disabled={isDisabled}` mirroring the `disabled` attribute.
- `IconButton` **requires** an `aria-label` prop (typed as mandatory in `Props`).
- Use `focus-visible` for keyboard-only focus rings.

### Spinner Integration

Import `Spinner` from `$lib/components/feedback/spinner.svelte`. Pass the `size` (number in px) mapped from the button's size prop:

```ts
const spinnerSizes = { xs: 12, sm: 14, md: 16, lg: 18, xl: 20 };
```

## Adding a New Component

1. Create `src/lib/components/{category}/{component-name}.svelte`
2. Build the Props interface (extend HTML attributes if wrapping an element)
3. Use `$props()` with defaults and `$derived()` for computed state
4. Write all styles in the component's `<style>` block (scoped CSS)
5. Export from `src/lib/index.ts`:
   ```ts
   export { default as MyComponent } from '$lib/components/{category}/{component-name}.svelte';
   ```
6. Demo the component in `src/routes/+page.svelte`

## Workflows

### Dev Server
```bash
npm run dev
```

### Build & Package (for npm publish)
```bash
npm run build       # vite build + svelte-package + publint
```

### Type Check
```bash
npm run check
```

### Lint & Format
```bash
npm run lint        # prettier check + eslint
npm run format      # prettier write
```

## Code Style

Configured in `.prettierrc`:
- **Indentation**: Tabs (not spaces)
- **Quotes**: Single quotes
- **Trailing commas**: None
- **Print width**: 100
- **Svelte parser**: `prettier-plugin-svelte`

ESLint stack: `typescript-eslint` + `eslint-plugin-svelte` + `eslint-config-prettier`.

## Supported Props Vocabulary

All button-family components share this vocabulary (use consistent values across new components):

| Prop | Values |
|------|--------|
| `size` | `xs` \| `sm` \| `md` \| `lg` \| `xl` |
| `variant` | `solid` \| `surface` \| `outline` \| `ghost` \| `plain` |
| `color` | `gray` \| `red` \| `green` \| `blue` \| `teal` \| `pink` \| `purple` \| `cyan` \| `orange` \| `yellow` |
| `radius` | `sm` \| `md` \| `lg` \| `xl` \| `2xl` \| `full` |

## Package Distribution

- Entry: `dist/index.js` (types: `dist/index.d.ts`)
- Peer dependency: `svelte ^5.0.0`
- Build tool: `@sveltejs/package`
- Published files: `dist/` (test and spec files excluded)
