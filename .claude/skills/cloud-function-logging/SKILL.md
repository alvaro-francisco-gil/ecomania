---
name: cloud-function-logging
description: Use whenever adding or modifying log statements in `functions/src/**`. Encodes the `console.* -> logger.info(msg, { handler, ...fields })` structured-logging rule, the required `handler` field, severity-level conventions, and why a no-console build gate fails the build when violated. Companion to `denormalized-read-model` and any work that writes Cloud Functions; see [AGENTS.md](../../../AGENTS.md) for the logging rule.
---

## STUB — not yet written

Author this skill once **`functions/src/`** exists. Writing it earlier would bake in guesses.

What it will encode:
- Never `console.*` in `functions/src/` — use the structured v2 `logger` with a typed second argument so Cloud Logging can query `jsonPayload` fields.
- Required `handler` field on every log call (set to the exported function name) so filters can isolate one function.
- Severity conventions: `info` (noteworthy success), `warn` (recoverable anomaly), `error` (bailed out), `debug` (verbose, off in prod).
- No string concatenation or `JSON.stringify` in the message — fields go in the structured arg; no PII at `info` or above.
- The no-console build gate that fails CI on any `console.*` under `functions/src/`.
