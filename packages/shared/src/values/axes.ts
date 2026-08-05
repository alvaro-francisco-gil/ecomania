/**
 * The eco-value axis contract.
 *
 * Locked 2026-08-05 — four axes, no fifth. Rationale, literature grounding, and the
 * rejected candidates: `docs/plans/ideas/value-axes-fourth-axis.md`.
 *
 * Sign convention is load-bearing: every axis runs from `negativePole` at -1 to
 * `positivePole` at +1, with 0 meaning "no lean". Flipping a pole silently reverses every
 * stored vector and every avatar visual — treat a pole swap as a data migration.
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
 * non-overlapping — a designer must be able to move any one axis without visually
 * contradicting the others. It is a design constraint, not yet a Rive input name; the Rive
 * input contract lives in `src/avatar/` and is blocked on the archetype taxonomy.
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
    visualChannel: 'silhouette',
  },
  means: {
    id: 'means',
    negativePole: 'technological',
    positivePole: 'sufficiency',
    question: 'How do we reconcile prosperity with the planet?',
    visualChannel: 'material',
  },
  agency: {
    id: 'agency',
    negativePole: 'individual',
    positivePole: 'collective',
    question: 'Where does change come from?',
    visualChannel: 'multiplicity',
  },
  power: {
    id: 'power',
    negativePole: 'technocratic',
    positivePole: 'grassroots',
    question: 'Who should be in charge of solving it?',
    visualChannel: 'structure',
  },
} as const;

export const VALUE_AXIS_MIN = -1;
export const VALUE_AXIS_MAX = 1;

export function isValueAxisId(candidate: string): candidate is ValueAxisId {
  return (VALUE_AXIS_IDS as readonly string[]).includes(candidate);
}
