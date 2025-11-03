# @smtf/ui-library

A UI library to build and ship a unified design system as both:
- Framework‑agnostic Web Components (built with Stencil)
- React components

This package centralizes your system’s primitives, components, and styles so the same set of building blocks can be used across apps and frameworks.


## Why Stencil?
Stencil provides:
- Excellent TypeScript support and DX
- Standards‑based Custom Elements that work in any modern framework or no framework at all
- An official React output target that generates ergonomic React wrappers for your Web Components

With this setup, you author components once in Stencil and consume them as:
- `<my-component />` in plain HTML or other frameworks
- `<MyComponent />` in React, with proper typing and JSX integration


## Key features
- Single source for React components and Web Components
- Built‑in Storybook for local development, documentation, and visual review
- Unified build: `pnpm build` emits both React and Web Component bundles
- Exported global styles you can import in consumer apps
- Code quality baked in: ESLint (via `@smtf/eslint-config`) and Prettier


## Installation
Using pnpm (recommended):

```bash
pnpm add @smtf/ui-library
```

Using npm:

```bash
npm i @smtf/ui-library
```

Using yarn:

```bash
yarn add @smtf/ui-library
```

Peer dependencies for React usage:
- `react@18`
- `react-dom@18`


## Usage

### 1) React
React wrappers are generated from Stencil components, so you can import and use them like regular React components. Example shape:

```tsx
// App.tsx
import React from 'react';
import '@smtf/ui-library/styles.css'; // bring in UI library base styles
// import { Button } from '@smtf/ui-library'; // example import; see Storybook/docs for available components

export function App() {
  return (
    <div>
      {/* <Button variant="primary">Click me</Button> */}
      {/* Use generated React components from the library */}
    </div>
  );
}
```

Notes:
- The exact component names depend on what’s implemented in the library. Open Storybook to discover available components and their props.
- TypeScript typings are included (`dist/index.d.ts`).


### 2) Web Components (framework‑agnostic)
All components are authored as Web Components with Stencil and can be used directly in any app that supports Custom Elements:

```html
<!-- index.html (illustrative) -->
<link rel="stylesheet" href="/path/to/node_modules/@smtf/ui-library/dist/ui-library.css" />

<!-- Assuming the library script is loaded in your bundler or via a script tag -->
<my-component some-prop="value"></my-component>
```

Authoring and deeper guidance for Web Components live in the dedicated Stencil sub‑package:
- See `packages/ui-library/stencil/readme.md` for how to create and evolve Stencil components.


## Styles
This package exports its base stylesheet that consumers should include once:

- Export path: `@smtf/ui-library/styles.css`
- Resolved file: `dist/ui-library.css`

Import examples:

```ts
// Vite/React entry file
import '@smtf/ui-library/styles.css';
```

```css
/* Or in a global CSS file */
@import '@smtf/ui-library/styles.css';
```

The package marks CSS as a side effect so styles are preserved during bundling.


## Storybook
This package ships with an embedded Storybook for the design system.

- Start Storybook locally:
  ```bash
  pnpm storybook
  ```
- Build a static Storybook site:
  ```bash
  pnpm build-storybook
  ```

Why Storybook matters for design systems:
- Single source of truth for component documentation and usage examples
- Visual regression prevention via manual review and add‑ons/testing integrations
- Discoverability for designers and developers (props, states, variations)
- Safer iteration: develop components in isolation, independent of app runtime


## Development workflows
- To develop Web Components (Stencil): work inside `packages/ui-library/stencil/`. There is a dedicated README there describing how to create and test Stencil components.
- To develop React wrappers: implement or update Stencil components and re‑build; the React wrappers are generated from Stencil via the React output target.


## Build
`pnpm build` from the `@smtf/ui-library` folder will:
- Build the Vite bundle for the React entry points
- Emit TypeScript declarations
- Build the Stencil project (Web Components) via `pnpm run build:stencil`

Relevant `package.json` fields and exports:
- Main (CJS UMD): `dist/index.umd.cjs`
- Module (ESM): `dist/index.es.js`
- Types: `dist/index.d.ts`
- Styles export: `@smtf/ui-library/styles.css` → `dist/ui-library.css`


## Scripts
From the package directory you can run:

- `pnpm build` — build React bundle, types, and Stencil web components
- `pnpm build:stencil` — build only the Stencil Web Components
- `pnpm storybook` — run Storybook (dev server)
- `pnpm build-storybook` — generate static Storybook site
- `pnpm lint` — run ESLint
- `pnpm lint:fix` — auto‑fix ESLint issues where possible
- `pnpm type-check` — run TypeScript checks without emitting
- `pnpm format` — format code with Prettier


## Code quality
- ESLint: this package uses the shared `@smtf/eslint-config` to enforce consistent, modern best practices across TypeScript, React, and tests.
- Prettier: formatting is enforced via the `format` script and integrated into the lint config. Keeping code style automatic reduces diffs and improves readability.


## Notes
- React consumers must have `react` and `react-dom` installed (peer dependencies).
- Consumers should import `@smtf/ui-library/styles.css` once per application.
- In monorepos, ensure your bundler resolves ESM/CJS correctly. The package exposes both `module` and `main` entries.
- When adding new components in Stencil, re-run `pnpm build` to update both the Web Components and React wrappers.


## Publishing (pnpm workspace)
This package is part of the pnpm workspace. You can publish it individually:

- From the package directory:
  ```bash
  pnpm publish --access public
  ```
- Or from the workspace root using a filter:
  ```bash
  pnpm -w --filter @smtf/ui-library publish --access public
  ```

Refer to the official pnpm docs for more options (tags, dry runs, etc.):
https://pnpm.io/cli/publish

Before publishing, ensure the version in `packages/ui-library/package.json` is updated and the build artifacts exist (`pnpm build`).


## License
MIT
