import { ESLint } from 'eslint';
import { describe, expect, it } from 'vitest';

/**
 * The gate itself is the deliverable, so it gets a test. Without this, someone relaxes
 * `no-console` to "warn" during an unrelated lint cleanup and every future function is free to
 * ship unqueryable logs.
 */
const eslint = new ESLint({ cwd: new URL('..', import.meta.url).pathname });

async function ruleIdsFor(code: string): Promise<string[]> {
  const [result] = await eslint.lintText(code, { filePath: 'src/generated-for-test.ts' });
  return (result?.messages ?? []).map((message) => message.ruleId ?? '');
}

describe('the no-console build gate', () => {
  it('rejects a raw console call as an error, not a warning', async () => {
    const [result] = await eslint.lintText('console.log("hello");\n', {
      filePath: 'src/generated-for-test.ts',
    });

    expect(result?.errorCount).toBeGreaterThan(0);
    expect((result?.messages ?? []).map((m) => m.ruleId)).toContain('no-console');
  });

  it('rejects every console method, not just log', async () => {
    for (const method of ['log', 'info', 'warn', 'error', 'debug']) {
      expect(await ruleIdsFor(`console.${method}("x");\n`)).toContain('no-console');
    }
  });

  it('accepts a call through the structured logger', async () => {
    expect(
      await ruleIdsFor('import { logger } from "./lib/logger.js";\nlogger.info("ok", { handler: "h" });\n'),
    ).not.toContain('no-console');
  });
});
