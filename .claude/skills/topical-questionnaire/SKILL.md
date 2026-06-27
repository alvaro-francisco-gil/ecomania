---
name: topical-questionnaire
description: Use whenever authoring or changing an ecology questionnaire, its per-answer value-axis weights, or how answers update the value vector. Encodes versioned questionnaires, per-answer value-axis weights, and a value-vector update via moving-average that is DECOUPLED from XP. Reach for it on "add a survey question", "value axis", "value vector", "questionnaire version". Companion to `awarding-xp` (XP is separate), `values-privacy` (the vector is special-category data), and `funnel-handoff` (the vector is carried into the app).
---

## STUB — not yet written

Author this skill once **the data models are defined (see docs/architecture.md)**. Writing it earlier would bake in guesses.

What it will encode:
- Questionnaires are versioned; an answered submission records the version it was taken against (never silently re-scored under a new version).
- Per-answer weights across the value axes, and how a submission maps to a value-vector delta.
- Value-vector update via moving-average — and that this is fully decoupled from XP (answering a survey is not an XP event).
- Where the questionnaire definitions live (shared) and how both funnel and app consume them.
