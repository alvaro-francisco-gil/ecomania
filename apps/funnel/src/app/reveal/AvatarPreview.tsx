'use client';

import { useRive } from '@rive-app/react-canvas';

/**
 * The Rive canvas must be a client component — the runtime needs a real canvas and WebGL/2D
 * context, neither of which exists during server rendering.
 *
 * The `.riv` is served from `/rive/`, copied there at build time from
 * `packages/shared/assets/` so both renderers load the same file (see that directory's README).
 */
export function AvatarPreview() {
  const { RiveComponent } = useRive({
    src: '/rive/avatar.sample.riv',
    autoplay: true,
  });

  return (
    <div style={{ width: '100%', aspectRatio: '1 / 1', maxWidth: '24rem' }}>
      <RiveComponent />
    </div>
  );
}
