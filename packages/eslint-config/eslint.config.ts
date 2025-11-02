import { configs } from './src/index';

export default [
  ...configs.recommended,
  ...configs.vitest,
  {
    ignores: ['node_modules', 'dist', 'tests', '**/*.snap'],
  },
];
