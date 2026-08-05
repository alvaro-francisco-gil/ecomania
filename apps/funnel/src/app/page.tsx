import { VALUE_AXES, VALUE_AXIS_IDS } from '@ecomania/shared';

/**
 * Placeholder landing page.
 *
 * It renders the value-axis contract straight out of `@ecomania/shared` — which makes the
 * workspace dependency a build-time assertion rather than a claim in a README. The real
 * landing → survey → reveal → invite funnel is blocked on the survey instrument and the
 * archetype taxonomy (`docs/architecture.md` §10).
 */
export default function LandingPage() {
  return (
    <main style={{ maxWidth: '48rem', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1>ecomania</h1>
      <p>Funnel scaffold. The survey, the avatar reveal, and the invite pages are not built yet.</p>

      <h2>The value space</h2>
      <p>Four axes, rendered from the shared contract:</p>
      <ul>
        {VALUE_AXIS_IDS.map((id) => {
          const axis = VALUE_AXES[id];
          return (
            <li key={id}>
              <strong>{axis.id}</strong> — {axis.negativePole} ↔ {axis.positivePole}{' '}
              <em>({axis.visualChannel})</em>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
