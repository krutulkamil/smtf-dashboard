import { defineConfig, coverageConfigDefaults, defaultExclude } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    clearMocks: true,
    exclude: ['tests/**', 'commitlint.config', ...defaultExclude],
    watch: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: 'coverageReport',
      enabled: true,
      exclude: [...coverageConfigDefaults.exclude],
    },
  },
});
