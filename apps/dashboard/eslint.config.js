import { tanstackConfig } from '@tanstack/eslint-config'

export default [
    ...tanstackConfig,
    {
        // Custom rules go here
    },
    {
        name: 'ignore-list',
        ignores: [
            'dist',
            'eslint.config.js',
            'postcss.config.js',
            'tailwind.config.js',
            '.prettierrc.cjs',
        ],
    },
]