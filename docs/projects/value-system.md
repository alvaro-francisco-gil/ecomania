---
title: "The ecomania Value System: Five Research-Grounded Axes of Ecological Worldview"
subtitle: "A design specification for the avatar value space"
date: 2026-06-28
bibliography: value-system.bib
status: exploration / proposed
---

# The ecomania Value System

**A five-axis model of ecological worldview for the ecoavatar.**

> **Product decision (2026-08-05) — the shipped model is FOUR axes.** Axis 5
> (*Local ↔ Global*) was proposed here as *secondary* and *droppable* (§4, §6/L3); it has been
> **dropped**. It reads as a near-duplicate of Axis 4 (grid): the correlation sits on the
> grassroots-local ↔ technocratic-global diagonal, and the off-diagonal cells don't justify an
> extra axis, an extra Rive channel and extra survey length. Its "global systems thinker"
> flavor moves into **archetype motif** rather than axis geometry. §3's Axis 5 section is
> retained as the record of what was considered and why it lost. See
> `docs/plans/ideas/value-axes-fourth-axis.md` for the decision.

## Abstract

ecomania positions each user in a shared *value-axis space* derived from an onboarding survey,
snaps them to the nearest **archetype** (the avatar's base form), and thereafter nudges a
**live position** via topical questionnaires. This requires a small set of axes that (a) are
grounded in validated environmental-psychology instruments, (b) are mutually near-independent
so the avatar space does not collapse, and (c) each map cleanly to one *non-overlapping*
visual register that can drive a Rive state machine. We review ~15 frameworks and propose
**five axes**: *Anthropocentric–Ecocentric*, *Technological–Sufficiency*,
*Individual–Collective*, *Technocratic–Grassroots*, and *Local–Global*. We give each axis a
definition, the policy debate it captures, its empirical grounding, an independence argument,
and its avatar channel; we then analyse residual collinearity and the design implications.

## 1. Motivation: why a *small, deliberately chosen* axis set

The most rigorously factor-analysed instrument in the field, the Environmental Attitudes
Inventory ([Milfont & Duckitt 2010](#milfont2010)), collapses **12** attitude facets into just
**two** correlated higher-order factors — *Preservation* and *Utilization*. The New Ecological
Paradigm scale ([Dunlap et al. 2000](#dunlap2000)) is treated by its authors as essentially a
**single** general "ecological worldview" dimension. The lesson is that environmental ideology
is **low-dimensional**: naively chosen axes will each be a facet of "how green are you" and the
population will collapse onto a diagonal, making archetypes indistinguishable.

This is especially acute for ecomania, whose users self-select into an ecology app and are
therefore already green — the general-greenness dimension has little variance among them. The
design discipline that follows is:

- spend axes on **what *kind* of green** (orientation → archetype + surface), and
- let **how *much* green** (intensity/urgency) live on a separate **engagement clock** — the
  segmentation captured by Global Warming's Six Americas ([Leiserowitz et al. 2009](#leiserowitz2009)),
  which is a single Alarmed→Dismissive engagement gradient, *not* a values space.

Each axis below is therefore an *orientation* axis, and each is assigned to a distinct visual
channel. Mutual visual non-overlap is the practical test that the axes are well-separated: a
designer can move any one Rive input without the others visually contradicting it.

## 2. Approach

This is a *synthesis*, not new empirical work. Axes were selected by triangulating recurring
dimensions across value theory ([De Groot & Steg 2008](#degroot2008)), attitude structure
([Milfont & Duckitt 2010](#milfont2010); [Dunlap et al. 2000](#dunlap2000)), political-theory
discourse typologies ([Dryzek 2013](#dryzek2013)), cultural theory of risk
([Douglas & Wildavsky 1982](#douglas1982); [Kahan et al. 2011](#kahan2011)), and
environmental-spatial cognition ([Uzzell 2000](#uzzell2000)). Where multiple independent
frameworks "rediscover" the same dimension, we treat it as robust. Independence claims are
qualitative (directional), drawn from the cited studies, not from a new factor analysis.

## 3. The five axes

### Axis 1 — Anthropocentric ↔ Ecocentric
*Whose interests have moral standing?*

| | |
|---|---|
| **− pole (Anthropocentric)** | Nature matters for human benefit — health, food, economy, recreation, future human generations. |
| **+ pole (Ecocentric)** | Nature has intrinsic value; species, rivers, ecosystems warrant moral consideration in their own right. |
| **Policy debate** | Rights-of-nature law and intrinsic-value conservation vs ecosystem-services / natural-capital accounting. |
| **Contested case** | Spain's [**Mar Menor lagoon**](https://www.boell.de/en/2025/02/05/mar-menor-europes-first-ecosystem-legal-personhood) became Europe's first ecosystem with legal personhood (Law 19/2022, born of a 640,000-signature citizen initiative; upheld by the Constitutional Court in Nov 2024). *Ecocentric* reading: the lagoon holds intrinsic rights "to exist, evolve, be protected and restored." *Anthropocentric* counter: the farming, tourism and property interests whose nutrient run-off had collapsed it. (Sister case: New Zealand's Whanganui River, 2017.) |
| **Grounding** | [O'Riordan 1976](#oriordan1976)'s master ecocentric–technocentric spectrum; the biospheric-vs-altruistic value split of [De Groot & Steg 2008](#degroot2008); the EAI "ecocentric concern" vs "human utilization" facets ([Milfont & Duckitt 2010](#milfont2010)); NEP anti-anthropocentrism ([Dunlap et al. 2000](#dunlap2000)). |
| **Independence** | A *value* about ends, silent on *means* — orthogonal to Axes 2–5. [Thompson & Barton 1994](#thompson1994) show ecocentric and anthropocentric motives predict behaviour independently. |
| **Avatar channel** | **Silhouette / kingdom** — humanoid/built/geometric ↔ wild/animal/plant/fungal. |

*Note (Limitation L1).* [Thompson & Barton 1994](#thompson1994) find ecocentrism and
anthropocentrism are technically *two* dimensions, not opposite poles (one can score high or
low on both). We model them as one bipolar axis; the degenerate "low–low" corner (cares about
neither) is captured instead by the engagement clock (disengagement), and "high–high" sits at
the axis midpoint.

### Axis 2 — Technological ↔ Sufficiency
*How do we reconcile prosperity with the planet?*

| | |
|---|---|
| **− pole (Technological)** | Innovation and growth can *decouple* wellbeing from harm: nuclear, renewables, lab-grown food, dense cities, carbon capture. |
| **+ pole (Sufficiency)** | Hard biophysical limits exist; efficiency rebounds (Jevons). The answer is to consume less — degrowth, post-growth, voluntary simplicity. |
| **Policy debate** | Ecomodernism ([Asafu-Adjaye et al. 2015](#asafuadjaye2015)) vs degrowth ([D'Alisa et al. 2014](#dalisa2014)); the "bright green" vs "dark green" split. |
| **Contested case** | **Nuclear power.** Germany shut its [last three reactors on 15 April 2023](https://www.npr.org/2023/04/15/1170244609/germany-begins-powering-down-nuclear-plants), while the EU [labelled nuclear "green"](https://www.europarl.europa.eu/news/en/press-room/20220701IPR34365/taxonomy-meps-do-not-object-to-inclusion-of-gas-and-nuclear-activities) in its investment taxonomy (Parliament declined to block it, 328–278, July 2022). *Technological/ecomodernist*: nuclear is essential clean baseload. *Sufficiency/dark-green*: a costly distraction from consuming less (Greenpeace sued, alleging "greenwashing"). A second front: [Italy (2023)](https://www.foodnavigator.com/Article/2023/11/21/Italy-bans-cultivated-meat-restricts-plant-based-meat-labelling/) and [Florida (2024)](https://www.foodsafetynews.com/2024/05/florida-first-to-ban-lab-grown-meat-in-state/) banned cultivated meat — engineered-food optimism vs precaution/tradition. |
| **Grounding** | The ecomodernist/degrowth literatures above; the EAI "confidence in science and technology" facet ([Milfont & Duckitt 2010](#milfont2010)). |
| **Independence** | A *means* question, orthogonal to Axis 1 (one can be an ecocentric technologist or an anthropocentric degrowther). Its main collinearity is with the *posture* construct (reformist↔radical), which we deliberately route to the engagement clock rather than making it an axis (see §4). |
| **Avatar channel** | **Material / texture** — sleek/metallic/luminous ↔ earthen/woven/mineral/raw. |

### Axis 3 — Individual ↔ Collective *(the "group" dimension)*
*Where does change come from?*

| | |
|---|---|
| **− pole (Individual)** | Change is the sum of personal choices and market signals; responsibility is personal (recycle, fly less, buy an EV). |
| **+ pole (Collective)** | Individual action is marginal against systemic forces; what matters is policy, regulation and organising. |
| **Policy debate** | The carbon-footprint / consumer-responsibility framing vs "system change, not climate change" — the individualization critique of [Maniates 2001](#maniates2001). |
| **Contested case** | The [**"carbon footprint"**](https://www.wbur.org/onpoint/2023/12/19/how-big-oil-helped-push-the-idea-of-a-carbon-footprint) itself: popularised by **BP's 2004–06 Ogilvy & Mather campaign** (and personal footprint calculator) to frame climate as a matter of individual choice — later widely criticised as deflecting from systemic/corporate responsibility, making [Maniates 2001](#maniates2001)'s thesis concrete. *Individual* camp: shrink your footprint, fly less ("flygskam"). *Collective* camp: the responsibility lies with ~100 producers and the policy that enables them. |
| **Grounding** | [Maniates 2001](#maniates2001); [Stern 2000](#stern2000)'s empirically distinct private-sphere, public-sphere and activism behaviour types; the individualism–communitarianism dimension of [Kahan et al. 2011](#kahan2011). |
| **Independence** | Strong. [Lacroix et al. 2022](#lacroix2022) find **near-zero spillover** from private green behaviour to collective action — so this axis separates people a single greenness score would merge. |
| **Avatar channel** | **Multiplicity** — a lone, self-contained creature ↔ accompanied by a flock/colony/mycelial network. |

### Axis 4 — Technocratic ↔ Grassroots *(the "grid" dimension)*
*Who should be in charge of solving it?*

| | |
|---|---|
| **− pole (Technocratic / hierarchical)** | Trust experts, institutions and scale: carbon markets, IPCC-led policy, mega-projects, professional management. |
| **+ pole (Grassroots / egalitarian)** | Trust distributed community power: energy co-ops, indigenous stewardship, commons, citizens' assemblies. |
| **Policy debate** | Top-down carbon pricing and large infrastructure vs community-owned renewables and community/indigenous-led conservation. |
| **Contested case** | France's [**Citizens' Convention for Climate**](https://en.wikipedia.org/wiki/Citizens_Convention_for_Climate) (150 randomly-selected citizens; 149 proposals, 2019–2020). Macron pledged to pass them "unfiltered," but the 2021 Climate & Resilience law kept only ~10 intact and watered down the rest — prompting a public revolt by convention members. *Grassroots/egalitarian*: deliberative citizen assemblies should set climate policy directly. *Technocratic*: expert ministries and Parliament must filter, cost and reconcile proposals. |
| **Grounding** | The hierarchy–egalitarianism dimension of cultural cognition ([Kahan et al. 2011](#kahan2011)); the "grid" axis of cultural theory ([Douglas & Wildavsky 1982](#douglas1982); [Steg & Sievers 2000](#steg2000)). |
| **Independence** | High, and *distinct from Axis 3*: Axis 3 asks individual-vs-collective; Axis 4 asks, given collective action, top-down-vs-bottom-up. Cultural cognition treats grid and group as roughly orthogonal. The off-diagonal cases are real: *global-grassroots* (transnational movements) and *local-technocratic* (municipal expert planning). |
| **Bonus** | Axes 3 × 4 (group × grid) are exactly the plane that generates cultural theory's four "myths of nature" ([Steg & Sievers 2000](#steg2000)) — providing validated archetype anchors (Individualist/Nature-Benign, Egalitarian/Nature-Ephemeral, Hierarchist/Nature-Perverse-Tolerant, Fatalist/Nature-Capricious). |
| **Avatar channel** | **Structure / form-order** — symmetric/architected/crystalline ↔ asymmetric/organic-cluster/rhizomatic. |

*Note (Limitation L2).* Cultural cognition **replicates only weakly outside the US/Anglo
context** ([Pröpper et al. 2022](#propper2022), N = 44,378 across 23 countries). In non-Anglo
markets this axis may carry less signal than the others.

### Axis 5 — Local ↔ Global *(the spatial / scale dimension)*
*At what scale do you locate the problem and the solution?*

| | |
|---|---|
| **− pole (Local)** | The watershed, neighbourhood, bioregion; place-based stewardship; "act local". |
| **+ pole (Global)** | The planet, global systems, international governance; "think planetary". |
| **Policy debate** | Bioregional / localist environmentalism vs cosmopolitan, treaty- and systems-scale framing. |
| **Contested case** | Serbia's [**Jadar lithium project**](https://en.wikipedia.org/wiki/2024_Serbian_environmental_protests) (Rio Tinto, EU-backed). The licence — revoked after 2022 protests — was reinstated in July 2024, bringing tens of thousands onto the streets. *Global*: Europe needs the lithium for EV batteries and the energy transition. *Local*: the mine threatens the Jadar valley's farmland and water. The textbook local-place vs planetary-system clash — and note it cuts *across* Axis 4 (the protests were grassroots, the project EU-technocratic). |
| **Grounding** | Spatial cognition of environmental problems: "environmental hyperopia" — distant problems judged more serious than local ones ([Uzzell 2000](#uzzell2000)); the *spatial-optimism bias* across 18 nations ([Gifford et al. 2009](#gifford2009)); place attachment and local-vs-global framing of engagement ([Scannell & Gifford 2013](#scannell2013)). |
| **Independence** | Moderate (see §4, Limitation L3): it can correlate with both Axis 3 and Axis 4. Retained because it captures a distinct *scale-of-concern* the others do not, and grounds the "global systems thinker" identity. |
| **Avatar channel** | **Scale / rootedness** — rooted, place-bound (tree, soil) ↔ migratory, planetary (ocean-current, migratory bird). |

## 4. Independence and residual collinearity

The five axes were chosen to maximise mutual independence, but the literature is explicit that
environmental ideology is low-dimensional, so residual correlation is expected and *managed*
rather than eliminated.

| Axis pair | Expected collinearity | Why / mitigation |
|---|---|---|
| 1 × (2,3,4,5) | Low | A value about ends; orthogonal to means/agency/governance/scale ([Thompson & Barton 1994](#thompson1994)). |
| 2 × 4 | Low–moderate | Hierarchical-individualists discount environmental risk ([Kahan et al. 2011](#kahan2011)); not deterministic (ecomodernism is often *communitarian-technocratic*, e.g. state-led nuclear). |
| 3 × 4 | Low | Validated as roughly orthogonal (group vs grid); off-diagonal cells populated. |
| 3 × 5 | **Moderate (flag)** | "Local" can read as community/individual scale, "global" as systemic/collective. |
| 4 × 5 | **Moderate (flag)** | "Grassroots" skews local; "technocratic" skews global. |
| (2,*posture*) | **High — handled by design** | Reformist↔radical bundles with tech↔sufficiency ([Dryzek 2013](#dryzek2013); bright/dark green). Posture is an *intensity* construct, so it is assigned to the **engagement clock**, not an axis — this is why the model has 5 axes and not 6. |

**Design consequence.** Axes 1–4 are treated as the *primary* identity basis (high
independence, each backed by multiple frameworks). Axis 5 is *secondary*: included for thematic
richness and the global-thinker identity, but with the lowest empirical weight and the most
overlap, so scoring should down-weight it relative to Axes 1–4, and it is the first candidate
to drop if data shows it is redundant.

*Resolved 2026-08-05: Axis 5 was dropped without waiting for data — the two flagged moderate
collinearities (3×5, 4×5) were judged sufficient. The value space is Axes 1–4. Limitation L3
is therefore closed by removal rather than by measurement.*

## 5. Design implications

- **Archetypes.** Use the Axis 3 × Axis 4 plane (group × grid) to anchor a validated 4-archetype
  core (the myths of nature), then differentiate base forms further with Axes 1–2; Axis 5
  modulates surface/flavour rather than defining new base forms. (Each base form = one `.riv`;
  archetype count = designer cost.)
- **Two clocks.** Orientation (Axes 1–5) → archetype + surface. Intensity/engagement
  (Six Americas gradient; reformist→radical posture) → leveling, aura, charge — the thing
  gameplay grows over time.
- **Visual contract.** Five non-overlapping channels — silhouette, material, multiplicity,
  structure, scale — plus an intensity/aura channel from the clock. Each is a numeric Rive
  input that can be driven independently.
- **GDPR / integrity.** Ecological values are special-category data. Survey item labels must be
  **balanced in valence** across both poles (e.g. avoid pairing a pejorative "technocratic" with
  a warm "communitarian"); neutral pole labels such as *Institutional ↔ Community* or
  *Vertical ↔ Horizontal* are preferred to non-leading the respondent.

## 6. Limitations

- **L1 — Axis 1 bipolarity.** Modelled as one axis though [Thompson & Barton 1994](#thompson1994)
  treat ecocentrism/anthropocentrism as two dimensions (§3, Axis 1).
- **L2 — Axis 4 cross-cultural validity.** Grid replicates weakly outside Anglo contexts
  ([Pröpper et al. 2022](#propper2022)); weigh against early non-Anglo market plans.
- **L3 — Axis 5 weakness.** Thinnest grounding and highest overlap (with Axes 3 and 4);
  flagged as secondary and droppable.
- **L4 — Synthesis, not measurement.** Independence is argued from prior studies, not a new
  factor analysis on the ecomania population. A confirmatory factor analysis on early survey
  data should validate the axis structure and re-estimate the inter-axis correlations.

## References

<a id="asafuadjaye2015"></a>Asafu-Adjaye, J., Blomqvist, L., Brand, S., et al. (2015).
*An Ecomodernist Manifesto.* http://www.ecomodernism.org

<a id="dalisa2014"></a>D'Alisa, G., Demaria, F., & Kallis, G. (Eds.). (2014).
*Degrowth: A Vocabulary for a New Era.* London: Routledge.

<a id="degroot2008"></a>De Groot, J. I. M., & Steg, L. (2008). Value orientations to explain
beliefs related to environmental significant behavior: How to measure egoistic, altruistic,
and biospheric value orientations. *Environment and Behavior, 40*(3), 330–354.

<a id="douglas1982"></a>Douglas, M., & Wildavsky, A. (1982). *Risk and Culture: An Essay on the
Selection of Technological and Environmental Dangers.* Berkeley: University of California Press.

<a id="dryzek2013"></a>Dryzek, J. S. (2013). *The Politics of the Earth: Environmental
Discourses* (3rd ed.). Oxford: Oxford University Press.

<a id="dunlap2000"></a>Dunlap, R. E., Van Liere, K. D., Mertig, A. G., & Jones, R. E. (2000).
Measuring endorsement of the New Ecological Paradigm: A revised NEP scale.
*Journal of Social Issues, 56*(3), 425–442.

<a id="gifford2009"></a>Gifford, R., Scannell, L., Kormos, C., et al. (2009). Temporal pessimism
and spatial optimism in environmental assessments: An 18-nation study.
*Journal of Environmental Psychology, 29*(1), 1–12.

<a id="kahan2011"></a>Kahan, D. M., Jenkins-Smith, H., & Braman, D. (2011). Cultural cognition
of scientific consensus. *Journal of Risk Research, 14*(2), 147–174.

<a id="lacroix2022"></a>Lacroix, K., Carman, J. P., Goldberg, M. H., Gustafson, A.,
Rosenthal, S. A., & Leiserowitz, A. (2022). Does personal climate change mitigation behavior
influence collective behavior? Experimental evidence of no spillover in the United States.
*Energy Research & Social Science, 94*, 102875.

<a id="leiserowitz2009"></a>Leiserowitz, A., Maibach, E., & Roser-Renouf, C. (2009).
*Global Warming's Six Americas 2009: An Audience Segmentation Analysis.* Yale Project on
Climate Change & George Mason University.

<a id="maniates2001"></a>Maniates, M. F. (2001). Individualization: Plant a tree, buy a bike,
save the world? *Global Environmental Politics, 1*(3), 31–52.

<a id="milfont2010"></a>Milfont, T. L., & Duckitt, J. (2010). The environmental attitudes
inventory: A valid and reliable measure to assess the structure of environmental attitudes.
*Journal of Environmental Psychology, 30*(1), 80–94.

<a id="oriordan1976"></a>O'Riordan, T. (1976). *Environmentalism.* London: Pion.

<a id="propper2022"></a>Pröpper, H. Y., Blanken, T. F., Geiger, S. J., & Brick, C. (2022).
Truth over identity? Cultural cognition weakly replicates across 23 countries.
*Journal of Environmental Psychology, 83*, 101865.

<a id="scannell2013"></a>Scannell, L., & Gifford, R. (2013). Personally relevant climate change:
The role of place attachment and local versus global message framing in engagement.
*Environment and Behavior, 45*(1), 60–85.

<a id="steg2000"></a>Steg, L., & Sievers, I. (2000). Cultural theory and individual perceptions
of environmental risks. *Environment and Behavior, 32*(2), 250–269.

<a id="stern2000"></a>Stern, P. C. (2000). Toward a coherent theory of environmentally
significant behavior. *Journal of Social Issues, 56*(3), 407–424.

<a id="thompson1994"></a>Thompson, S. C. G., & Barton, M. A. (1994). Ecocentric and
anthropocentric attitudes toward the environment. *Journal of Environmental Psychology, 14*(2),
149–157.

<a id="uzzell2000"></a>Uzzell, D. L. (2000). The psycho-spatial dimension of global
environmental problems. *Journal of Environmental Psychology, 20*(4), 307–318.

### Contested cases (news & policy)

- **Mar Menor** (Axis 1): Heinrich Böll Stiftung (2025), *Mar Menor: Europe's First Ecosystem with Legal Personhood* — Spain Law 19/2022; Constitutional Court upheld it Nov 2024. https://www.boell.de/en/2025/02/05/mar-menor-europes-first-ecosystem-legal-personhood
- **Nuclear phase-out** (Axis 2): NPR (2023), *Germany Begins Powering Down Its Last Three Nuclear Plants*. https://www.npr.org/2023/04/15/1170244609/germany-begins-powering-down-nuclear-plants — and European Parliament (2022), *Taxonomy: MEPs do not object to inclusion of gas and nuclear activities*. https://www.europarl.europa.eu/news/en/press-room/20220701IPR34365/taxonomy-meps-do-not-object-to-inclusion-of-gas-and-nuclear-activities
- **Cultivated meat** (Axis 2): FoodNavigator (2023), *Italy bans cultivated meat*. https://www.foodnavigator.com/Article/2023/11/21/Italy-bans-cultivated-meat-restricts-plant-based-meat-labelling/ — and Food Safety News (2024), *Florida first to ban lab-grown meat*. https://www.foodsafetynews.com/2024/05/florida-first-to-ban-lab-grown-meat-in-state/
- **Carbon footprint** (Axis 3): WBUR On Point (2023), *How Big Oil Helped Push the Idea of a 'Carbon Footprint'* (BP / Ogilvy & Mather, 2004–06). https://www.wbur.org/onpoint/2023/12/19/how-big-oil-helped-push-the-idea-of-a-carbon-footprint
- **Citizens' Convention for Climate** (Axis 4): *Citizens Convention for Climate* (France, 2019–2021). https://en.wikipedia.org/wiki/Citizens_Convention_for_Climate
- **Jadar lithium** (Axis 5): *2024 Serbian environmental protests* (Rio Tinto / Jadar Valley). https://en.wikipedia.org/wiki/2024_Serbian_environmental_protests
