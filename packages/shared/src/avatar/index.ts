/**
 * The Rive contract — how a user's stored state becomes an avatar, identically in both
 * renderers.
 *
 * The design this implements: `docs/decisions/avatar-rendering.md` (sign is identity, magnitude
 * is intensity), `docs/decisions/avatar-element.md` (the one thing the user picks), and
 * `docs/plans/ideas/encargo-diseno-avatar.md` (the designer's specification).
 *
 * **The input names are frozen.** Renaming one breaks the app and the funnel simultaneously and
 * desynchronises them from the `.riv`. See `rive-avatar-contract`.
 */
export {
  RIVE_AURA_INPUT,
  RIVE_INPUTS,
  RIVE_INPUT_BOUNDARY,
  RIVE_INPUT_MAX,
  RIVE_INPUT_MIN,
  axisToRiveInput,
} from './inputs.js';

export {
  BASE_FORMS,
  BASE_FORMS_PER_POLE,
  selectBaseForm,
  type BaseForm,
  type BaseFormId,
} from './baseForms.js';

export {
  ELEMENTS,
  getElement,
  isElementId,
  type Element,
  type ElementId,
} from './elements.js';

export {
  computeAvatarInputs,
  type AvatarPresentation,
  type AvatarSource,
} from './computeInputs.js';
