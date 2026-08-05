import { VALUE_AXIS_MAX, VALUE_AXIS_MIN, type ValueAxisId } from '../values/axes.js';

/**
 * The Rive input contract — **frozen names**.
 *
 * The designer may re-animate, re-rig, and add states freely; renaming one of these breaks both
 * renderers at once. A rename is an explicit request with a PR touching the `.riv`, this file,
 * and both apps — never a silent adjustment. See `docs/plans/ideas/encargo-diseno-avatar.md` §10.
 *
 * Each knob is one numeric input over the **full `0..100` range**, where **`50` is the
 * boundary**: below it you are on the negative pole, at or above it the positive one, and the
 * distance from 50 is the marker's density. One number therefore carries identity *and*
 * intensity, which is what lets a questionnaire visibly move the avatar without crossing a pole
 * (`docs/decisions/avatar-rendering.md`).
 *
 * Axis 1 (`moralStanding`) is deliberately absent: a topology change cannot be interpolated, so
 * it selects which base form's artboard to load rather than driving an input. See
 * `baseForms.ts`.
 */
export const RIVE_INPUTS = {
  means: 'surface',
  agency: 'companions',
  power: 'geometry',
} as const satisfies Partial<Record<ValueAxisId, string>>;

/** The aura's intensity — the XP clock, not a value. Its material comes from the element. */
export const RIVE_AURA_INPUT = 'aura';

export const RIVE_INPUT_MIN = 0;
export const RIVE_INPUT_MAX = 100;

/**
 * The boundary. At exactly `50` the positive pole shows at its faintest — a stored axis value of
 * `0` is a *data* zero (no evidence yet, or evidence that cancels), not a third visual state, so
 * it has to land on one side. Positive is the arbitrary but fixed choice; changing it would
 * silently flip the rendering of every user sitting at zero.
 */
export const RIVE_INPUT_BOUNDARY = 50;

/**
 * Map an axis value in `-1..1` onto its Rive input in `0..100`.
 *
 * Linear and total: `-1 → 0`, `0 → 50`, `+1 → 100`. Deliberately not clamped — an out-of-range
 * axis value means the vector is corrupt, and rendering a plausible avatar from corrupt data
 * hides the bug instead of surfacing it.
 */
export function axisToRiveInput(axisValue: number): number {
  if (!Number.isFinite(axisValue) || axisValue < VALUE_AXIS_MIN || axisValue > VALUE_AXIS_MAX) {
    throw new RangeError(
      `axis value must be within [${VALUE_AXIS_MIN}, ${VALUE_AXIS_MAX}], got ${axisValue}`,
    );
  }
  const span = (RIVE_INPUT_MAX - RIVE_INPUT_MIN) / (VALUE_AXIS_MAX - VALUE_AXIS_MIN);
  return RIVE_INPUT_MIN + (axisValue - VALUE_AXIS_MIN) * span;
}
