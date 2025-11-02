import { defineConfig } from 'eslint/config';
import eslintConfig from '@smtf/eslint-config';

export default defineConfig([
  ...eslintConfig.configs.recommended,
  {
    name: 'custom-rules',
    rules: {
      '@typescript-eslint/ban-ts-comment': ['off'],
      '@typescript-eslint/no-explicit-any': ['off'],
    },
  },
  {
    name: 'ignore-list',
    ignores: ['dist', 'eslint.config.js', '.prettierrc.cjs'],
  },
]);
