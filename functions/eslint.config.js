import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['lib/**', 'node_modules/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      /**
       * The build gate. Cloud Logging cannot query an unstructured line, so every log goes
       * through `src/lib/logger.ts`, which forces a `handler` field. `npm run build` runs lint
       * first, so a raw console call fails the build rather than shipping an unqueryable log.
       * See `cloud-function-logging`.
       */
      'no-console': 'error',
    },
  },
);
