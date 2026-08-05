import { AvatarPreview } from './AvatarPreview';

/**
 * Placeholder reveal page — it proves the web Rive runtime loads and renders the shared asset.
 *
 * The real reveal (archetype-specific avatar, the shareable OG card, the "continue in app" CTA)
 * is blocked on the archetype taxonomy. See `docs/architecture.md` §9.
 */
export default function RevealPage() {
  return (
    <main style={{ maxWidth: '48rem', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1>Avatar reveal</h1>
      <p>
        Placeholder. This renders <code>avatar.sample.riv</code> — a development stand-in, not
        our avatar.
      </p>
      <AvatarPreview />
    </main>
  );
}
