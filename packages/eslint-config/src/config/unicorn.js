import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';

/**
 * @type {import('eslint').Linter.Config}
 */
const eslintPluginUnicornConfig = {
  languageOptions: {
    globals: globals.builtin,
  },
  plugins: {
    unicorn: eslintPluginUnicorn,
  },
  rules: {
    'unicorn/no-useless-promise-resolve-reject': ['warn'],
    'unicorn/prefer-node-protocol': ['warn'],
  },
};

export { eslintPluginUnicornConfig };
