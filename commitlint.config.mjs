/**
 * Conventional commits, enforced by the husky `commit-msg` hook.
 *
 * `functions/` is npm-managed and outside the pnpm workspace, so it is not a valid scope target
 * for pnpm filters — but it is a perfectly good commit scope. Scopes are not enumerated here on
 * purpose: an allow-list goes stale the moment a directory is added.
 */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'refactor', 'test', 'docs', 'chore', 'perf', 'build', 'ci', 'revert'],
    ],
  },
};
