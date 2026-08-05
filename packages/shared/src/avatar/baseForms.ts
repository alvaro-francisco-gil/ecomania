/**
 * The base forms — axis 1 (`moralStanding`) picks which creature you are.
 *
 * This is the one axis that selects an **artboard** rather than driving an input: a topology
 * change cannot be interpolated or graded. It is also the only axis whose change is gated
 * behind a user-consented morph ceremony (`docs/decisions/archetype-morph-consent.md`).
 *
 * The set is **data, not a hardcoded pair**. Growing it is a matter of adding entries and a
 * `.riv`, with no change to the selection rule — which is exactly the "purely additive" property
 * the commission was designed around.
 */

/**
 * Ordered from the most anthropocentric to the most ecocentric — the array order **is** the axis
 * order, and `selectBaseForm` depends on it. Reordering re-assigns every existing user.
 */
export const BASE_FORMS = [
  {
    id: 'person',
    pole: 'anthropocentric',
    riv: 'avatar.person.riv',
  },
  {
    id: 'tree',
    pole: 'ecocentric',
    riv: 'avatar.tree.riv',
  },
] as const;

export type BaseFormId = (typeof BASE_FORMS)[number]['id'];

export interface BaseForm {
  readonly id: BaseFormId;
  readonly pole: string;
  readonly riv: string;
}

/**
 * The count **must stay even**, split evenly across the two poles. An odd count would make the
 * middle form a smuggled neutral, and no axis has a neutral state
 * (`docs/decisions/avatar-rendering.md`).
 */
export const BASE_FORMS_PER_POLE = BASE_FORMS.length / 2;

/**
 * Pick the base form for a `moralStanding` value.
 *
 * The **sign** picks the side; when a side holds more than one form the **magnitude** picks
 * which — the same identity-then-intensity rule every other axis uses, so there is no second
 * rule to learn when the set grows from 2 to 4.
 *
 * `0` resolves to the ecocentric side, consistent with `RIVE_INPUT_BOUNDARY`: a data zero is the
 * faintest positive pole, never a third state.
 */
export function selectBaseForm(moralStanding: number): BaseForm {
  if (!Number.isFinite(moralStanding) || moralStanding < -1 || moralStanding > 1) {
    throw new RangeError(`moralStanding must be within [-1, 1], got ${moralStanding}`);
  }

  const isEcocentric = moralStanding >= 0;
  const magnitude = Math.abs(moralStanding);

  // Which band of this side's forms the magnitude falls into. `magnitude === 1` would land one
  // past the last band, so it is pulled back into it.
  const band = Math.min(Math.floor(magnitude * BASE_FORMS_PER_POLE), BASE_FORMS_PER_POLE - 1);

  const index = isEcocentric
    ? BASE_FORMS_PER_POLE + band
    : BASE_FORMS_PER_POLE - 1 - band;

  const form = BASE_FORMS[index];
  if (form === undefined) {
    throw new Error(`no base form at index ${index} — BASE_FORMS must have an even length`);
  }
  return form;
}
