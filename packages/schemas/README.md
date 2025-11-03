# @smtf/schemas

A small, shared collection of Zod schemas used to validate incoming data from the backend. The schemas are used in both frontend and backend so we keep them in a separate package to have a single source of truth for validation and types.

The package is built with tsup and publishes both ESM (`.mjs`) and CommonJS (`.js`) bundles plus TypeScript typings.


## Why a separate package?
- One source of truth for data contracts between FE and BE
- Runtime validation (Zod) + static types (inferred from the schemas)
- Zero duplication: update a schema once, consume everywhere


## Installation
Using pnpm (recommended):

```bash
pnpm add @smtf/schemas
```

Using npm:

```bash
npm i @smtf/schemas
```

Using yarn:

```bash
yarn add @smtf/schemas
```


## Usage
Import schemas where you need to validate data. All schemas are exported as named exports.

### Example: Backend (Node / NestJS / Express)
```ts
import { DashboardResponseSchema, type DashboardResponse } from '@smtf/schemas';

// Example service/controller logic
async function getDashboard(): Promise<DashboardResponse> {
  const raw = await fetchFromUpstream();

  // Validate at the boundary (throws on invalid structure)
  const data = DashboardResponseSchema.parse(raw);

  // `data` is now typed as DashboardResponse and safe to use
  return data;
}
```

Use `safeParse` when you prefer non-throwing validation:
```ts
import { DashboardResponseSchema } from '@smtf/schemas';

const parsed = DashboardResponseSchema.safeParse(raw);
if (!parsed.success) {
  // handle parsed.error
} else {
  // parsed.data is valid and strongly typed
}
```

### Example: Frontend (React / Vite)
```ts
import { DashboardResponseSchema } from '@smtf/schemas';

async function loadDashboard() {
  const res = await fetch('/api/dashboard');
  const json = await res.json();
  return DashboardResponseSchema.parse(json);
}
```

### Type inference
Every schema can produce a static TypeScript type via `z.infer`.

```ts
import { z } from 'zod';
import { DashboardResponseSchema } from '@smtf/schemas';

type DashboardResponse = z.infer<typeof DashboardResponseSchema>;
```


## What’s currently exported
- `DashboardResponseSchema` — validates the dashboard payload returned by the API
- `TrendPointSchema` — validates a single trend point in the dashboard time series

> This list is illustrative and will grow with more domains. Check the package’s `src/` for the latest set of exports.


## Module formats (ESM and CJS)
This package ships both ESM and CJS builds so it works in modern bundlers and Node runtimes alike.

- ESM consumers (Vite/Next/modern Node ESM):
  ```ts
  import { DashboardResponseSchema } from '@smtf/schemas';
  ```
- CommonJS consumers:
  ```js
  const { DashboardResponseSchema } = require('@smtf/schemas');
  ```

TypeScript typings are included; your editor should pick them up automatically.


## Build details
- Built with `tsup`
- Outputs:
  - ESM: `dist/index.mjs`
  - CJS: `dist/index.js`
  - Types: `dist/index.d.ts`
- All exports are defined at the package root; do not import from internal paths or from `dist/`.


## Scripts available in this package
Useful when developing or releasing the schemas:

- `prebuild`: cleans `dist/`
- `build`: builds ESM + CJS bundles and type declarations via `tsup`
- `lint`: runs ESLint
- `lint:fix`: runs ESLint with `--fix`
- `type-check`: runs TypeScript type checks without emit
- `format`: formats files with Prettier

Run from the package directory, e.g.:
```bash
pnpm run build
```


## Notes
- Zod is used for runtime validation; prefer validating at application boundaries (IO) and deriving types from schemas.
- Keep schemas minimal and composable; collocate domain-specific schemas in their own files and re-export from `src/index.ts`.
- Version changes to schemas can be breaking for consumers; follow semantic versioning when publishing.


## License
MIT
