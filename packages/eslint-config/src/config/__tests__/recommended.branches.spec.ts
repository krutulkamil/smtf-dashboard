import type { Linter } from 'eslint';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const ORIGINAL_NODE_ENV = process.env.NODE_ENV;

// Utility to load the recommended config fresh each time
async function loadRecommended(): Promise<Linter.Config[]> {
  // ensure fresh evaluation of module-level code
  vi.resetModules();
  const mod = await import('../recommended');
  return (mod.default ?? mod) as unknown as Linter.Config[];
}

describe('recommended.ts branches coverage', () => {
  afterEach(() => {
    // restore env and remove any mocks to avoid cross-test contamination
    process.env.NODE_ENV = ORIGINAL_NODE_ENV;
    vi.resetModules();
    vi.clearAllMocks();
    vi.unstubAllEnvs?.();
  });

  describe('NODE_ENV production vs non-production branches', () => {
    it('sets no-console and no-debugger to error in production', async () => {
      process.env.NODE_ENV = 'production';
      const config = await loadRecommended();
      const base = config[0] as any;
      expect(base?.name).toBe('@smtf-eslint/recommended/eslint');
      expect(base?.rules['no-console']).toBe('error');
      expect(base?.rules['no-debugger']).toBe('error');
    });

    it('sets no-console and no-debugger to warn when not in production', async () => {
      process.env.NODE_ENV = 'test';
      const config = await loadRecommended();
      const base = config[0] as any;
      expect(base?.name).toBe('@smtf-eslint/recommended/eslint');
      expect(base?.rules['no-console']).toBe('warn');
      expect(base?.rules['no-debugger']).toBe('warn');
    });
  });

  describe('typescript-eslint recommended name mapping when name is undefined', () => {
    beforeEach(() => {
      vi.resetModules();
      vi.doMock('typescript-eslint', () => ({
        configs: {
          // Provide a single config without a name to hit the `conf.name ?? ''` branch
          recommended: [
            {
              // name intentionally missing/undefined
              rules: {},
            },
          ],
        },
      }));
    });

    it('maps undefined names to an empty suffix (trailing slash) in configName', async () => {
      const config = await loadRecommended();
      // Find the entry produced by mapping tseslint.recommended
      const hasTrailingSlash = config.some((c: any) => c?.name === '@smtf-eslint/recommended/');
      expect(hasTrailingSlash).toBe(true);
    });
  });
});
