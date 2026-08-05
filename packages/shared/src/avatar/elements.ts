/**
 * The element — the one thing the user picks (`docs/decisions/avatar-element.md`).
 *
 * It is the **material** of the aura; the XP clock owns the aura's *intensity*. "The material is
 * yours, the intensity is earned." It never touches the body, carries no value information, and
 * is **not special-category data** — which makes it the safe public handle when the value vector
 * is not.
 *
 * **The choice is permanent.** There is no re-pick and no cosmetic override. That lands on the
 * survey, not on this file: an irreversible choice must be an informed one, so the element
 * question has to *show* each aura rather than offer four words on buttons.
 *
 * The set is data, like the base forms. In an ecology app these are the four planetary systems —
 * energy, hydrosphere, atmosphere, lithosphere — not a zodiac.
 */
export const ELEMENTS = [
  { id: 'fire', system: 'energy', auraMaterial: 'embers' },
  { id: 'water', system: 'hydrosphere', auraMaterial: 'droplets' },
  { id: 'air', system: 'atmosphere', auraMaterial: 'motes' },
  { id: 'earth', system: 'lithosphere', auraMaterial: 'dust' },
] as const;

export type ElementId = (typeof ELEMENTS)[number]['id'];

export interface Element {
  readonly id: ElementId;
  readonly system: string;
  readonly auraMaterial: string;
}

export function isElementId(candidate: string): candidate is ElementId {
  return ELEMENTS.some((element) => element.id === candidate);
}

export function getElement(id: ElementId): Element {
  const element = ELEMENTS.find((candidate) => candidate.id === id);
  if (element === undefined) {
    throw new Error(`unknown element "${id}"`);
  }
  return element;
}
