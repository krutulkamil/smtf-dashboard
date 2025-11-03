# @smtf/eslint-config

A simple, opinionated collection of best‑practice ESLint rules for modern front‑end (TypeScript + React) development using the new ESLint v9+ Flat Config.

It combines and wires together:
- ESLint "recommended" rules
- TypeScript ESLint recommended rules (+ sensible TypeScript tweaks)
- React + React Hooks + JSX a11y
- Vitest (for `*.test.*` / `*.spec.*` files)
- Import plugin (with TS resolver and import order)
- Unicorn (a few pragmatic improvements)
- Prettier integration (via `eslint-plugin-prettier/recommended` and `eslint-config-prettier`)

The package is designed to be spread into your project’s `eslint.config.{js,ts}` and used as building blocks.


## Requirements
- ESLint >= 9 (Flat Config)
- Node.js >= 18
- TypeScript >= 5

> Note: In a monorepo, keep `eslint` and `typescript` available to the app/package that runs ESLint.


## Installation
Using pnpm (recommended):

```bash
pnpm add -D @smtf/eslint-config
```

Using npm:

```bash
npm i -D @smtf/eslint-config
```

Using yarn:

```bash
yarn add -D @smtf/eslint-config
```


## Usage (Flat Config)
Create or update `eslint.config.js` (or `.ts`) in your project. You can import `configs` either as a default or a named import.

Minimal example:

```js
// eslint.config.js
import config from '@smtf/eslint-config';

export default [
  ...config.configs.recommended,
  ...config.configs.react,
  ...config.configs.vitest,
  // your custom rules and ignores...
  {
    name: 'project/ignores',
    ignores: ['dist', 'coverage', '**/*.snap'],
  },
];
```

Or with a named import:

```js
import { configs } from '@smtf/eslint-config';

export default [
  ...configs.recommended,
  ...configs.react,
  ...configs.vitest,
];
```

Scope to `src/` only (optional):

```js
import { defineConfig } from 'eslint/config';
import config from '@smtf/eslint-config';

const onlySrc = (arr) => arr.map((c) => ({ ...c, files: ['src/**/*'] }));

export default defineConfig([
  ...onlySrc(config.configs.recommended),
  ...onlySrc(config.configs.react),
  ...onlySrc(config.configs.vitest),
]);
```


## What’s included

### `configs.recommended`
A solid base for any modern TS/JS project:
- ESLint `recommended` plus a few extras:
  - `no-console` / `no-debugger`: `error` in production, `warn` otherwise
  - `prefer-const`, `no-use-before-define`, `no-nested-ternary`, `no-duplicate-imports`
- Prettier integration:
  - `eslint-plugin-prettier/recommended` + `eslint-config-prettier`
- TypeScript ESLint `recommended` plus customizations:
  - `@typescript-eslint/explicit-module-boundary-types`: off
  - `@typescript-eslint/no-explicit-any`: error
  - `@typescript-eslint/no-unsafe-*` rules: error (return/call/member-access/assignment)
  - `@typescript-eslint/consistent-type-imports`: error (prefer type‑only, inline)
  - `@typescript-eslint/no-unused-vars`: error (ignores `_`-prefixed args/vars/caught errors)
  - `@typescript-eslint/consistent-type-definitions`: warn (`type`), but turned off in `*.d.ts`
  - `@typescript-eslint/no-restricted-types`: error (`Array` → prefer `T[]`)
  - `@typescript-eslint/naming-convention`: boolean variables must be `PascalCase` and start with one of: `is/should/has/can/did/will/are`
- Import plugin:
  - `eslint-plugin-import` recommended + TypeScript config
  - TS resolver enabled (`eslint-import-resolver-typescript` with `alwaysTryTypes: true`)
  - `import/order`: groups and newlines enforced; `import/no-named-as-default` and `import/namespace` disabled
- Language options & globals:
  - `ecmaVersion: 'latest'`, modules + JSX enabled, `projectService: true`
  - `globals`: browser + node
- Unicorn plugin (selected rules):
  - `unicorn/no-useless-promise-resolve-reject`: warn
  - `unicorn/prefer-node-protocol`: warn

### `configs.react`
For React projects (JS or TS):
- React plugin flat `recommended` with tweaks:
  - `react/hook-use-state`: warn (allows destructured state)
  - `react/react-in-jsx-scope`: off
  - `react/no-array-index-key`: error
  - `react/display-name`, `react/prop-types`: off
- React Hooks plugin `recommended`
- Testing Library `flat/react`
- JSX a11y flat `recommended` with project‑friendly settings:
  - Auto‑detect React version
  - Treat `Link` and `RouterLink` as anchor‑like components (`href`/`to`)
  - Polymorphic component mapping (e.g. `Image` → `img`, `Icon` → `svg`, etc.)
  - Stricter `jsx-a11y/anchor-is-valid` for router links

### `configs.vitest`
For test files only (`**/*.spec.*`, `**/*.test.*`):
- `@vitest/eslint-plugin` `recommended`
- Enforces `expect` usage via `vitest/expect-expect` (`expect*` functions allowed)
- Self‑contained language options so it can be used standalone if needed


## Scripts available in this package
This repo publishes the config and also includes some helper scripts you can run from the package root (useful when developing the config itself):

- `build`: Type‑checks and emits `dist/`
- `prebuild`: Cleans `dist/`
- `lint`: Runs ESLint
- `lint:fix`: Runs ESLint with `--fix`
- `test:unit`: Runs Vitest
- `type-check`: Runs TypeScript type check with no emit
- `pre-commit`: Type checks and runs lint‑staged
- `format`: Formats with Prettier

> Projects that consume this config typically only need `eslint` scripts in their own package.


## Example ignore patterns
You can add your project’s ignores at the end of your config, e.g.:

```js
{
  name: 'project/ignores',
  ignores: ['dist', 'coverage', 'storybook-static', '**/*.snap'],
}
```


## Notes
- Flat Config only: this package is designed for `eslint.config.js` (ESLint v9+). `.eslintrc` is not supported.
- Works well with Vite projects out of the box.
- If you use path aliases/TS project references, make sure your `tsconfig` is discoverable by ESLint (`parserOptions.projectService: true` is already enabled here).


## License
MIT