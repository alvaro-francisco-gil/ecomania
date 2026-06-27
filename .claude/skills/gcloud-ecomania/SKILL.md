---
name: gcloud-ecomania
description: Use for gcloud CLI operations against ecomania's GCP/Firebase projects — Cloud Logging, Secret Manager, IAM, BigQuery, ADC. Encodes the account, project IDs, and the dev-default / prod-explicit guardrail. Reach for it when investigating a works-in-dev/fails-in-beta incident (config drift, not code) or managing secrets. For `firebase deploy` of rules/indexes/functions use `firestore-deploy` instead — different CLI, different auth store. Routed to from `fix-bug` for backend incidents.
---

## STUB — not yet written

Author this skill once **the GCP project + a named gcloud config** exist. Writing it earlier would bake in guesses.

What it will encode:
- The expected account and the dev / beta / prod project IDs, and how to confirm the active config before any command.
- Dev is the default target; beta/prod operations require explicit user confirmation.
- Secret Manager conventions: where secrets live, naming, how functions read them.
- Application Default Credentials (ADC) setup for local scripts and tests.
- Cloud Logging query recipes for investigating incidents (filter by `handler`, severity, time window).
