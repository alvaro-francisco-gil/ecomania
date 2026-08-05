/**
 * The eco-value axis contract.
 *
 * Locked 2026-08-05 — four axes, no fifth. Rationale, literature grounding, and the
 * rejected candidates (Local↔Global, reformist↔radical, fragile↔robust, hope↔doom):
 * `docs/projects/value-system.md`.
 *
 * Sign convention is load-bearing: every axis runs from `negativePole` at -1 to
 * `positivePole` at +1. Flipping a pole silently reverses every stored vector and every avatar
 * visual — treat a pole swap as a data migration.
 *
 * The **sign selects the visual identity and the magnitude only its intensity** — there is no
 * neutral rendering, so a stored 0 is the weakest expression of the positive pole, not a third
 * "neither" state (`docs/plans/ideas/encargo-diseno-avatar.md`). Keep that in mind before
 * treating 0 as "unknown": absence of data and a genuine midpoint are not distinguishable in
 * the vector alone, which is why coverage is tracked separately as a per-axis answered count.
 *
 * Pole and question text here are *developer-facing identifiers*, **never display copy**. Some
 * of these words are valence-imbalanced in ordinary use — nobody self-describes as
 * "technocratic" — so rendering them to a user would bias the answers we are trying to measure.
 * User-facing labels are neutral pairs (Institutional ↔ Community, Vertical ↔ Horizontal) and
 * come from the message catalog once the i18n strategy is decided (architecture §10).
 */

export const VALUE_AXIS_IDS = ['moralStanding', 'means', 'agency', 'power'] as const;

export type ValueAxisId = (typeof VALUE_AXIS_IDS)[number];

/**
 * `visualChannel` is the avatar dimension this axis drives. The channels are deliberately
 * non-overlapping — in Rive each is a separate state-machine layer touching a disjoint set of
 * properties, so any one axis can move without the others visually contradicting it. It is a
 * design constraint, not yet a Rive input name; the Rive input contract lives in `src/avatar/`
 * and is blocked on the archetype taxonomy.
 *
 * `baseForm` is the odd one out: it selects which `.riv` artboard is loaded rather than driving
 * an input on a loaded one, because a topology change cannot be interpolated. It is therefore
 * the only axis whose change is gated behind a user-consented morph ceremony.
 */
export interface ValueAxis {
  readonly id: ValueAxisId;
  readonly negativePole: string;
  readonly positivePole: string;
  readonly question: string;
  readonly visualChannel: string;
}

export const VALUE_AXES: Readonly<Record<ValueAxisId, ValueAxis>> = {
  moralStanding: {
    id: 'moralStanding',
    negativePole: 'anthropocentric',
    positivePole: 'ecocentric',
    question: 'Whose interests have moral standing?',
    visualChannel: 'baseForm',
  },
  means: {
    id: 'means',
    negativePole: 'technological',
    positivePole: 'sufficiency',
    question: 'How do we reconcile prosperity with the planet?',
    visualChannel: 'surface',
  },
  agency: {
    id: 'agency',
    negativePole: 'individual',
    positivePole: 'collective',
    question: 'Where does change come from?',
    visualChannel: 'companions',
  },
  power: {
    id: 'power',
    negativePole: 'technocratic',
    positivePole: 'grassroots',
    question: 'Who should be in charge of solving it?',
    visualChannel: 'geometry',
  },
} as const;

export const VALUE_AXIS_MIN = -1;
export const VALUE_AXIS_MAX = 1;

export function isValueAxisId(candidate: string): candidate is ValueAxisId {
  return (VALUE_AXIS_IDS as readonly string[]).includes(candidate);
}
