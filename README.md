# smtf-dashboard monorepo

A pnpm workspace powered by Turborepo that hosts apps, services, and shared packages for a small dashboard product. Prefer pnpm (v10) to get correct workspace linking and the best DX.


## Why pnpm workspaces?
This repo uses pnpm workspaces to manage a monorepo of packages, apps, and shared libraries. It's a lightweight and efficient solution for building modular projects.

### Why we use pnpm (and not npm/yarn)?
- Fast, disk-efficient: pnpm uses symlinks and a content-addressable store, meaning shared dependencies are only installed once on disk — huge speed and disk space benefits.
- Strict & predictable: Dependencies must be explicitly declared; no accidental hoisting or hidden dependencies between packages.
- Built-in workspaces: No need for extra tools — pnpm natively supports monorepo-style linking, versioning, publishing and running scripts.

### Why workspaces (instead of separate repos)?
Keeping related packages/services/apps together in a single monorepo offers huge benefits:

- Modular structure, shared tooling
  Each package or service is isolated (with its own `package.json`), but shares common tools (TypeScript configs, linters, build scripts).
- Local development workflow
  Changes in one package (e.g. a shared UI lib or schema) are instantly available to others — no need to publish while developing.
- Publishable packages
  Each package in the workspace can be independently built, tested, and published to npm or another registry.
- Unified CI/CD and deployment
  You can deploy individual packages without affecting others — or deploy multiple apps from a single pipeline.


## Repository layout
- `apps/`
  - `dashboard/` — TanStack Start + TanStack Router app that renders a responsive one‑page dashboard and consumes the API and UI library.
- `services/`
  - `dashboard-api/` — simple NestJS backend that serves dashboard data; ships Swagger and uses `@smtf/schemas` for validation; prepared for Vercel.
- `packages/`
  - `ui-library/` — design system that ships both Web Components (Stencil) and React components + exported styles; includes Storybook.
  - `schemas/` — shared Zod validation schemas used across FE and BE; built with tsup to ESM+CJS.
  - `eslint-config/` — shared ESLint flat config presets for TS, React, Vitest, imports, Prettier, Unicorn.

See individual READMEs for details:
- apps: `apps/dashboard/README.md`
- service: `services/dashboard-api/README.md`
- packages: `packages/ui-library/README.md`, `packages/schemas/README.md`, `packages/eslint-config/README.md`


## Prerequisites
- Node.js 18+ (22.x used in the API service)
- pnpm 10.x (recommended): `corepack enable && corepack prepare pnpm@10 --activate`


## Getting started
From the workspace root:

```bash
# Install all deps using workspace mode
pnpm install

# Start both Dashboard (frontend) and API (backend) together
pnpm dev

# Alternatively, start them in separate terminals
pnpm -w --filter @smtf/dashboard dev      # Frontend app (Vite)
pnpm -w --filter @smtf/dashboard-api dev  # Backend (NestJS)

# Or run a single package
pnpm -w --filter ./packages/ui-library storybook
```


## Common workflows

### Build all
```bash
# Using turbo via pnpm
pnpm exec turbo build
```

### Develop (watch) all
```bash
pnpm exec turbo dev
```

### Filter tasks to a specific package
```bash
# By name
pnpm exec turbo build --filter=@smtf/ui-library

# Or run the package’s own script through the workspace
pnpm -w --filter @smtf/ui-library build
```

### Publish from a workspace
Any package can be published individually. Examples:
```bash
# From the package directory
pnpm publish --access public

# From the workspace root using a filter
pnpm -w --filter @smtf/ui-library publish --access public
```
See pnpm docs for options (tags, dry runs, etc.):
https://pnpm.io/cli/publish

### Code quality
This repo standardizes linting and formatting:
- ESLint via `@smtf/eslint-config` (Flat Config: TS, React, Vitest, imports, Prettier, Unicorn)
- Prettier for formatting

Run per package, e.g.:
```bash
pnpm -w --filter @smtf/dashboard lint
pnpm -w --filter @smtf/dashboard format
```


## Notes about the stack
- The frontend app uses TanStack Start + TanStack Router (file‑based routing, loaders, pending UI, error boundaries) and the shared design system from `@smtf/ui-library`.
- The backend (`@smtf/dashboard-api`) exposes Swagger at `/api`, enables CORS, and validates data using the shared `@smtf/schemas` Zod package. It includes an `api/index.ts` entry for Vercel compatibility (see service README and Vercel docs).
- The UI library builds both React components and Web Components (Stencil) in a single `pnpm build` and ships a styles export: `@smtf/ui-library/styles.css`.
- The schemas package is built with tsup and publishes both ESM (`.mjs`) and CJS (`.js`) plus `.d.ts` types.


## Remote caching (optional)
Turborepo supports local and remote caching to speed up CI and team workflows. If you use Vercel Remote Cache:
```bash
pnpm exec turbo login
pnpm exec turbo link
```
Learn more: https://turborepo.dev/docs


## License
- Apps and services: UNLICENSED (see service/app READMEs)
- Packages: see individual package READMEs (most use MIT)
