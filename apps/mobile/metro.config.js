const path = require('node:path');

const { getDefaultConfig } = require('expo/metro-config');

/**
 * Metro does not walk out of the app directory on its own, so a pnpm monorepo needs both the
 * workspace root watched (to pick up edits in `packages/shared`) and the root `node_modules`
 * on the resolution path (that is where pnpm hoists shared deps).
 *
 * Hierarchical lookup stays ENABLED: the repo uses `node-linker=hoisted` (see `.npmrc`), and
 * disabling it stops Metro resolving packages' own transitive dependencies — `expo` fails to
 * find `expo-modules-core` and the bundle dies with an error that reads like a missing install.
 */
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

module.exports = config;
