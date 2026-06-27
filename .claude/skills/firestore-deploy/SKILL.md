---
name: firestore-deploy
description: Safely deploy Firestore rules, indexes, Storage rules, or Cloud Functions to the development Firebase project. Use when the user asks to deploy any of these or runs/asks about the `deploy:*` scripts or `firebase deploy --only ...`. Refuses beta/prod deploys (CI owns those) unless the user explicitly insists in this conversation. For gcloud CLI operations against the same projects (Secret Manager, IAM, Cloud Logging) use `gcloud-ecomania` instead — different CLI, different auth store. Companion to `add-firestore-collection` and `denormalized-read-model`.
---

## STUB — not yet written

Author this skill once **the Firebase config + deploy scripts** exist. Writing it earlier would bake in guesses.

What it will encode:
- Default and only target is `development`; beta/prod are deployed by CI.
- Hard refusals: any beta/prod deploy, any `:all` script that loops dev→beta→prod, `--force` on storage, raw `firebase deploy --project <id>` bypassing aliases — unless the user explicitly insists, with a read-back confirmation.
- Procedure: confirm active alias (`firebase use`), show the diff of the file(s) going live, run the narrowest `deploy:*` script, surface post-deploy notes (indexes build async, rules propagate ~60s, functions cold-start).
- Out of scope: app/funnel builds, EAS submissions, automated rollback.
