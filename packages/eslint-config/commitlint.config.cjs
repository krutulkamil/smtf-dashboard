/** @type {import('@commitlint/types').UserConfig} */
const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [2, 'always', 200],
    'references-empty': [2, 'never'],
    'subject-case': [2, 'never', ['start-case', 'pascal-case']],
  },
  parserPreset: {
    parserOpts: {
      referenceActions: null,
      issuePrefixes: [],
    },
  },
};

module.exports = config;
