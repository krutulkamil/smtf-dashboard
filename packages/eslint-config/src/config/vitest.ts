import { type Linter } from 'eslint';
import vitest from '@vitest/eslint-plugin';

import { configName } from '../utils/configName';

const config = [
  {
    name: configName('vitest'),
    files: ['**/*.spec.*', '**/*.test.*'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      'vitest/expect-expect': [
        'error',
        {
          assertFunctionNames: ['expect*'],
        },
      ],
    },
    // languageOptions just to make this eslint config standalone
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        projectService: true,
      },
    },
  },
] satisfies Linter.Config[];

export default config;
