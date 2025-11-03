# @smtf/dashboard

A small showcase application built with TanStack Start and TanStack Router. It renders a one‑page, responsive dashboard that:
- Fetches and displays live data from the backend service in `services/dashboard-api`
- Showcases UI components from `@smtf/ui-library` (React wrappers and shared styles)
- Demonstrates loading states, error boundaries, and basic routing

This app is meant to be a simple, opinionated example of how the pieces of this monorepo work together.


## Why TanStack Start + TanStack Router?
TanStack Start is a lightweight application framework around TanStack Router that brings modern routing ergonomics to React apps without the heavy framework lock‑in.

Highlights:
- File‑based routing and nested layouts for clean structure
- Data loading at the route level (loaders) with first‑class pending/loading UI
- Error boundaries per route/layout for robust failure handling
- Great DX with Router Devtools and React 18 support
- Works great with Vite for fast local development

Learn more:
- TanStack Start: https://tanstack.com/router/latest/docs/framework/react-start
- TanStack Router: https://tanstack.com/router


## Features in this app
- Dashboard data fetched from the NestJS backend: `services/dashboard-api`
- Components from the shared UI library: `@smtf/ui-library`
- Responsive layout and charts (e.g. with `recharts`)
- Loading states and error boundaries via TanStack Router patterns
- Code quality: ESLint (shared config) and Prettier


## Getting started
From this directory:

First, create your environment file:
```bash
cp .env.example .env
```

Then install dependencies and start the dev server:
```bash
pnpm install
pnpm dev
```

This starts the app in development mode at the port configured by Vite (commonly http://localhost:5173). Edits trigger fast HMR.

Build for production:
```bash
pnpm build
```

Start a preview server (if applicable in your setup):
```bash
pnpm start
```

> Note: For dashboard data to load, run the backend as well. See `services/dashboard-api/README.md` for environment setup and run commands. The API defaults to `http://localhost:3000` with Swagger at `/api`.


## Using the shared UI library
Import the base styles once and consume components as regular React components.

```tsx
// src/main.tsx or your app entry
import '@smtf/ui-library/styles.css'
// import { Button } from '@smtf/ui-library'
```

Refer to `packages/ui-library/README.md` and Storybook for the list of available components and their props.


## Project structure (simplified)
- `src/` — React app source (routes, components, lib)
  - `routes/` — file‑based routes for TanStack Router (loaders, pending UIs, error boundaries)
  - `components/` — local UI building blocks composed with `@smtf/ui-library`
  - `lib/` — helpers/utilities


## Working with data
The app fetches dashboard data from the NestJS backend (`services/dashboard-api`). Typical flow for a route loader:

```tsx
// Example shape (illustrative)
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  loader: async () => {
    const res = await fetch('http://localhost:3000/dashboard')
    if (!res.ok) throw new Error('Failed to load dashboard')
    return (await res.json()) as unknown
  },
  // You can declare pending and error components per route
})
```

Route boundaries make it easy to provide:
- Pending/loading UI while the loader runs
- Error UI when the loader throws


## Scripts
These commands are available (see `package.json`):
- `pnpm dev` — start the Vite dev server
- `pnpm build` — build the app (Vite) and type‑check (`tsc --noEmit`)
- `pnpm start` — start the Vite preview server
- `pnpm lint` — run ESLint
- `pnpm lint:fix` — run ESLint with `--fix`
- `pnpm format` — format with Prettier


## Code quality
- ESLint: uses the shared `@smtf/eslint-config` for consistent rules across the monorepo (TypeScript, React, Testing)
- Prettier: enforced via the `format` script to keep diffs clean and styling consistent


## Related packages
- Backend API: `services/dashboard-api` — simple NestJS service with Swagger and validation
- UI Library: `packages/ui-library` — shared components and styles; includes Storybook


## License
UNLICENSED
