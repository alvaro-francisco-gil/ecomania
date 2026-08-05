import { cp, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Rive's web runtime loads a `.riv` over HTTP, so the file has to sit under `public/`. Copying
 * it at build time — rather than committing a second copy — keeps `packages/shared/assets/` the
 * single source of truth, which is what makes "same file, both renderers" true rather than
 * aspirational.
 *
 * The copy is gitignored. If it were committed, the two would drift the first time someone
 * updated the asset and rebuilt only the app.
 */
const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, '../../../packages/shared/assets');
const destination = join(here, '../public/rive');

await mkdir(destination, { recursive: true });
await cp(join(source, 'avatar.sample.riv'), join(destination, 'avatar.sample.riv'));
