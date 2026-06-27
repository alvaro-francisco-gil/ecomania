---
name: moderation-pipeline
description: Use whenever adding or changing a write path that accepts user-generated content — any comment, post, or other UGC. Encodes UGC moderation as a REQUIRED step on every such write path, plus the report queue. Reach for it on "add comments", "let users post", "social feed", "report this". Companion to `guardrail-enforcement` (moderation is a server-side guardrail) and `touch-service` (the write must route through moderation, not bypass it).
---

## STUB — not yet written

Author this skill once **the data models are defined (see docs/architecture.md)**. Writing it earlier would bake in guesses.

What it will encode:
- Every UGC write path (comment, post, profile text) passes through moderation before the content becomes visible — no write path bypasses it.
- Where moderation runs (callable / trigger) and what the synchronous vs. asynchronous decision looks like.
- The report queue: how users flag content, where reports land, and the reviewer workflow.
- States a piece of UGC moves through (pending / approved / rejected / reported) and what each state exposes.
- That client rules forbid writing a "visible/approved" state directly — moderation owns it.
