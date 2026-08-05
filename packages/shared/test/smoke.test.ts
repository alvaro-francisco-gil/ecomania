import { expect, it } from 'vitest';

import * as shared from '../src/index.js';

it('resolves every sub-barrel through the package entry point', () => {
  expect(shared.VALUE_AXIS_IDS).toHaveLength(4);
});
