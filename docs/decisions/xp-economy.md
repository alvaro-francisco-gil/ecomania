# The XP economy: one uncapped clock, fed only by finite content

## Context

The avatar has two independent systems: the **value vector**, which *measures* what kind of
ecologist you are ([`avatar-rendering.md`](avatar-rendering.md)), and the **XP clock**, which
rewards *how much you play*. This decision covers only the second. They are updated by the same
submission and share nothing else — XP is earned and capped, the vector is measured and
uncapped. Fusing them would make an identity measurement gameable.

The original sketch (architecture §6) listed seven XP sources each with its own daily cap. That
design assumed posts, comments, likes and referrals existed. They do not, and the cap machinery
was solving a problem the content model can solve structurally instead.

## Decision

**The level curve is uncapped and geometric at 8% per level**, from a 100 XP base.

| Level | Cumulative XP |
|---|---|
| 10 | 1,249 |
| 30 | 10,399 |
| 50 | 53,039 |
| 100 | 2,544,775 |

**No daily caps. Supply is the cap.** XP-bearing content arrives on a **global content
calendar** — every user sees the same items, published on our cadence. Farming is structurally
impossible because there is nothing to farm: you cannot answer a questionnaire that has not been
published. This removes the entire per-source cap table and its tuning.

**News is content only.** It carries no XP and does not touch the value vector. It exists to
inform and to give the feed something to be about. Only questionnaires measure and reward.

**Each questionnaire declares its own XP value.** The amount is authored per item rather than
fixed globally, so a ten-question deep dive can be worth more than a quick take without a
separate rule.

**One level, three aspect counters.** `voice` / `knowledge` / `community` accumulate in parallel
and drive their own visual carriers, but they do not have levels of their own. There is a single
XP total, a single curve, and a single number for leaderboards and the aura.

## Consequences

- **Content production is the growth constraint.** XP throughput is bounded by editorial output.
  If the calendar goes quiet, so does the economy — there is no grind to fall back on. This is
  the price of not needing anti-cheat machinery, and it is the right trade at this stage.
- **The two accepted risks of a global calendar**: a new user has only the current items, with no
  backlog to catch up on; and everyone progresses at a similar rate, which flattens leaderboards
  toward "who joined first". Both are revisitable by adding a personal backlog later — additive,
  not a redesign.
- **Retuning the curve is a migration.** `LEVEL_GROWTH_RATE` and `BASE_LEVEL_XP` are one line
  each, but changing either silently moves every existing user's level. After launch it needs a
  communication plan, not a commit.
- **The aura mapping is deliberately not decided here.** `computeAvatarInputs` takes
  `auraIntensity` as a parameter. The level→aura curve waits on the animator, and lives in this
  package when it lands rather than inside a rendering function.
- **`knowledge` is currently the only aspect with an XP source.** `voice` and `community` are
  fed by posting, commenting and referrals, none of which exist. Until they do, those two
  counters stay at zero — which is honest, not broken, but means the "how you play shapes how it
  grows" promise is only a third alive.

## Rejected alternatives

- **15% growth.** What was first asked for, and rejected once the numbers were computed: level 50
  costs 627,541 XP and level 100 costs 680 million. Compounding at 15% doubles the cost every
  five levels, so the curve stops being a progression around level 35 and the rest is decoration.
  8% keeps the early hook identical (1,249 vs 1,678 XP to level 10 — indistinguishable in play)
  while making the late game exist.
- **Per-source daily caps.** The original design. Correct for an economy fed by unbounded
  user-generated actions; unnecessary machinery for one fed by a publishing calendar. Revisit if
  and when posts or comments earn XP.
- **A capped ladder with prestige/seasons.** Bounds the aura design problem to a known number of
  levels, but requires a whole seasonal-content system that does not exist. Hitting a cap with
  nothing beyond it is worse than no cap.
- **News reactions earning XP.** Rejected in favour of news carrying nothing at all. A light
  reaction tier would have given a daily-habit surface, but reactions that earn XP without
  measuring anything are pure grind, and reactions that nudge the vector let casual taps drown
  out considered answers in a GDPR special-category measurement.

## Revisit when

- **Posts, comments or referrals ship.** They are unbounded by nature, so the supply-as-cap
  argument does not cover them. Either they earn no XP, or per-source caps come back for those
  sources specifically. Decide before they ship, not after.
- **Real engagement data exists.** The open empirical question is whether 8% feels right in play.
  It is one constant, but it is a migration after launch.
- **The animator specifies the aura.** That is what unblocks the level→aura mapping.
