import { logger as functionsLogger } from 'firebase-functions';

/**
 * Structured logging for Cloud Functions.
 *
 * Every log carries a `handler` — the name of the callable or trigger emitting it — because
 * Cloud Logging queries are useless without a stable field to filter on, and a free-text
 * message is not one. The requirement is enforced by this type, and raw `console.*` is an
 * ESLint error that fails the build (see `eslint.config.js`).
 *
 * Levels:
 * - `debug` — local/emulator diagnostics; not expected to survive review.
 * - `info`  — an action completed. The economy's audit trail lives here.
 * - `warn`  — a rejected-but-expected path: cap hit, replayed idempotency key, denied write.
 * - `error` — the handler failed and someone should look. Pass the caught value as `cause`.
 *
 * Never log a raw eco-value vector, survey answers, or anything else special-category
 * (`values-privacy`). Log a hashed uid and the axis *count* touched, not the values.
 */
export interface LogContext {
  readonly handler: string;
  readonly [field: string]: unknown;
}

export interface ErrorLogContext extends LogContext {
  readonly cause?: unknown;
}

interface SerializedError {
  readonly name: string;
  readonly message: string;
  readonly stack?: string;
}

/** Errors do not survive JSON serialization — unwrap the parts worth keeping. */
function serializeCause(cause: unknown): SerializedError | { readonly value: string } {
  if (cause instanceof Error) {
    return {
      name: cause.name,
      message: cause.message,
      ...(cause.stack === undefined ? {} : { stack: cause.stack }),
    };
  }
  return { value: String(cause) };
}

export const logger = {
  debug(message: string, context: LogContext): void {
    functionsLogger.debug(message, context);
  },

  info(message: string, context: LogContext): void {
    functionsLogger.info(message, context);
  },

  warn(message: string, context: LogContext): void {
    functionsLogger.warn(message, context);
  },

  error(message: string, context: ErrorLogContext): void {
    const { cause, ...rest } = context;
    functionsLogger.error(message, {
      ...rest,
      ...(cause === undefined ? {} : { cause: serializeCause(cause) }),
    });
  },
};
