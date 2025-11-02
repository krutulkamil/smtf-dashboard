import { type Linter } from 'eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import testingLibraryPlugin from 'eslint-plugin-testing-library';

import { configName } from '../utils/configName';

const JS_GLOB_INCLUDE = ['**/*.{js,jsx,ts,tsx}'];

const reactConfigName = (...args: string[]) => configName('react', ...args);

const config = [
  {
    ...reactPlugin.configs.flat.recommended,
    files: JS_GLOB_INCLUDE,
    name: reactConfigName('react'),
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      'react/hook-use-state': ['warn', { allowDestructuredState: true }],
      'react/react-in-jsx-scope': ['off'],
      'react/no-array-index-key': ['error'],
      'react/display-name': ['off'],
      'react/prop-types': ['off'],
    },
  },

  {
    name: reactConfigName('hooks'),
    plugins: {
      'react-hooks': reactHooksPlugin,
    },
    rules: reactHooksPlugin.configs.recommended.rules,
  },

  // testing-library/react
  {
    ...testingLibraryPlugin.configs['flat/react'],
    name: reactConfigName('testing-library'),
  },

  // jsx-a11y rules & settings
  {
    ...jsxA11yPlugin.flatConfigs.recommended,
    name: reactConfigName('jsx-a11y'),
    settings: {
      react: {
        version: 'detect',
      },
      linkComponents: [
        { name: 'RouterLink', linkAttribute: ['href', 'to'] },
        { name: 'Link', linkAttribute: ['href', 'to'] },
      ],
      'jsx-a11y': {
        polymorphicPropName: 'component',
        components: {
          Link: 'a',
          Button: 'button',
          Image: 'img',
          Avatar: 'img',
          Icon: 'svg',
          Field: 'input',
        },
      },
    },
    rules: {
      ...jsxA11yPlugin.flatConfigs.recommended.rules,
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link', 'RouterLink'],
          specialLink: ['to'],
          aspects: ['noHref', 'invalidHref', 'preferButton'],
        },
      ],
    },
  },
] satisfies Linter.Config[];

export default config;
