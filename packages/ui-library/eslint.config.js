import { defineConfig } from 'eslint/config';
import eslintConfig from '@smtf/eslint-config';

const onlySrc = (arr) => arr.map((c) => ({ ...c, files: ['src/**/*'] }));

export default defineConfig([
  ...onlySrc(eslintConfig.configs.recommended),
  ...onlySrc(eslintConfig.configs.react),
  ...onlySrc(eslintConfig.configs.vitest),
  {
    name: 'custom-rules',
    rules: {
      '@typescript-eslint/ban-ts-comment': ['off'],
      '@typescript-eslint/no-explicit-any': ['off'],
    },
  },
  {
    name: 'ignore-list',
    ignores: [
      'dist',
      'eslint.config.js',
      'postcss.config.cjs',
      'tailwind.config.cjs',
      '.prettierrc.cjs',
      'stencil',
      'storybook-static',
    ],
  },
]);
