import { logger as functionsLogger } from 'firebase-functions';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { logger } from '../src/lib/logger.js';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('logger', () => {
  it('forwards the structured context to the underlying logger', () => {
    const spy = vi.spyOn(functionsLogger, 'info').mockImplementation(() => undefined);

    logger.info('xp awarded', { handler: 'awardXp', uidHash: 'abc123', amount: 10 });

    expect(spy).toHaveBeenCalledWith('xp awarded', {
      handler: 'awardXp',
      uidHash: 'abc123',
      amount: 10,
    });
  });

  it('serializes an Error cause into queryable fields', () => {
    const spy = vi.spyOn(functionsLogger, 'error').mockImplementation(() => undefined);

    logger.error('submit failed', { handler: 'submitSurvey', cause: new TypeError('boom') });

    const [message, context] = spy.mock.calls[0] as [string, Record<string, unknown>];
    expect(message).toBe('submit failed');
    expect(context.handler).toBe('submitSurvey');
    expect(context.cause).toMatchObject({ name: 'TypeError', message: 'boom' });
    expect(context.cause).toHaveProperty('stack');
  });

  it('serializes a non-Error cause rather than dropping it', () => {
    const spy = vi.spyOn(functionsLogger, 'error').mockImplementation(() => undefined);

    logger.error('submit failed', { handler: 'submitSurvey', cause: 'string thrown' });

    const [, context] = spy.mock.calls[0] as [string, Record<string, unknown>];
    expect(context.cause).toEqual({ value: 'string thrown' });
  });

  it('omits cause entirely when none was given', () => {
    const spy = vi.spyOn(functionsLogger, 'error').mockImplementation(() => undefined);

    logger.error('submit failed', { handler: 'submitSurvey' });

    const [, context] = spy.mock.calls[0] as [string, Record<string, unknown>];
    expect(context).not.toHaveProperty('cause');
  });
});
