import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    /**
     * `no-console-gate.test.ts` runs ESLint programmatically, and a cold start — loading the
     * flat config plus typescript-eslint — takes several seconds on a busy machine. The default
     * 5s timeout makes that test flaky rather than failing honestly, which is worse than slow:
     * an intermittent red build teaches people to re-run CI instead of reading it.
     */
    testTimeout: 30_000,
  },
});
