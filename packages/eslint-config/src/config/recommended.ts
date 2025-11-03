import { type Linter } from 'eslint';
import eslint from '@eslint/js';
import { configs as tseslint } from 'typescript-eslint';
import globals from 'globals';
import * as importPlugin from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

import { configName } from '../utils/configName.js';

import { eslintPluginUnicornConfig } from './unicorn';

const JS_GLOB_INCLUDE = ['**/*.{js,jsx,ts,tsx}'];

const recommendedConfigName = (...args: string[]) => configName('recommended', ...args);

const config = [
  {
    files: JS_GLOB_INCLUDE,
    ...eslint.configs.recommended,
    name: recommendedConfigName('eslint'),
    rules: {
      ...eslint.configs.recommended.rules,
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'prefer-const': ['error'],
      'no-use-before-define': ['error'],
      'no-nested-ternary': ['error'],
      'no-duplicate-imports': ['error'],
    },
  },

  {
    ...eslintPluginPrettierRecommended,
    name: recommendedConfigName('prettier'),
  },

  // typescript rules
  ...(tseslint.recommended.map((conf) => ({
    ...conf,
    name: recommendedConfigName(conf.name ?? ''),
  })) as Linter.Config[]),
  {
    name: recommendedConfigName('typescript-eslint/custom-rules'),
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': ['off'],
      '@typescript-eslint/no-explicit-any': ['error'],
      '@typescript-eslint/no-non-null-asserted-optional-chain': ['error'],
      '@typescript-eslint/no-extra-non-null-assertion': ['error'],
      '@typescript-eslint/no-shadow': ['warn'],
      '@typescript-eslint/no-unnecessary-condition': ['warn'],
      '@typescript-eslint/no-unnecessary-type-assertion': ['warn'],
      '@typescript-eslint/no-unsafe-return': ['error'],
      '@typescript-eslint/no-unsafe-call': ['error'],
      '@typescript-eslint/no-unsafe-member-access': ['error'],
      '@typescript-eslint/no-unsafe-assignment': ['error'],
      '@typescript-eslint/prefer-optional-chain': ['error'],
      '@typescript-eslint/prefer-nullish-coalescing': ['warn'],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: ['is', 'should', 'has', 'can', 'did', 'will', 'are'],
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-restricted-types': [
        'error',
        {
          types: {
            Array: {
              message: 'Use yourType[] instead. So for Array<string> you need to use string[]',
            },
          },
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
    },
  },
  {
    name: recommendedConfigName('typescript-eslint/custom-dts-rules'),
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
    },
  },

  // import rules
  {
    ...importPlugin.flatConfigs.recommended,
    name: recommendedConfigName('import-plugin/recommended'),
  },

  {
    ...importPlugin.flatConfigs.typescript,
    name: recommendedConfigName('import-plugin/typescript'),
  },
  {
    name: recommendedConfigName('import'),
    settings: {
      'import/resolver': {
        'eslint-import-resolver-typescript': {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      'import/no-named-as-default': 'off',
      'import/namespace': ['off'],
      'import/order': [
        'error',
        {
          groups: [
            ['external', 'builtin'],
            ['parent', 'internal'],
            ['index', 'sibling'],
          ],
          'newlines-between': 'always',
        },
      ],
    },
  },

  {
    name: recommendedConfigName('languageOptions'),
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        projectService: true,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  {
    name: recommendedConfigName('unicorn'),
    ...eslintPluginUnicornConfig,
  },
] satisfies Linter.Config[];

export default config;
