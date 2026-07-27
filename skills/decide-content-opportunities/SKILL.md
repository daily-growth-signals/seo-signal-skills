---
name: decide-content-opportunities
description: Turn existing Daily Growth Signals SEO and social evidence into content-opportunity decisions with traceable rationale, qualitative confidence, counter-evidence, alternatives, tradeoffs, and a next validation test. Use when choosing what topic, audience need, angle, format, or channel to prioritize; comparing content opportunities; deciding whether evidence is strong enough to act; or translating completed research into a recommendation. Do not use for collecting signals alone, writing finished content, publishing, or analyzing content that has no traceable source evidence.
---

# Decide Content Opportunities

Convert existing SEO and social research into a conditional recommendation. Make a decision when the evidence supports one; do not hide behind an unranked summary. Preserve the boundary between observation, inference, recommendation, and expected outcome.

## Decision Contract

- Start from the user's business goal, audience, market, language, channel constraints, time horizon, and available evidence.
- Reuse evidence already present in the conversation or provided artifacts. Do not refresh or recollect data merely to make a decision.
- When new research is essential, name the exact evidence gap and use the matching research Skill only after the user asks to fill it. Preserve its reuse, idempotency, pagination, and cost controls.
- Treat live research fields, `field_semantics`, evidence IDs, request IDs, post URLs, limitations, and timestamps as authoritative.
- Recommend an action only within the coverage of the evidence. State conditions that would change the recommendation.
- Use `high`, `medium`, or `low` as qualitative confidence labels. Never present them as calibrated probabilities.

## Hard Rules

1. Never invent demand, audience needs, commercial value, expected performance, evidence, or source coverage.
2. Never convert search volume, ranking, trend interest, post count, or engagement directly into revenue or purchase intent.
3. Never cite an SEO claim without its available `request_id` and `evidence_id`, or a social claim without its query and source URL or `post_id`.
4. Never describe absent or unrequested evidence as negative evidence.
5. Never hide counter-evidence, stale data, `partial` results, sparse samples, ranking effects, or market-language mismatch.
6. Never combine evidence from different markets, languages, audiences, or time windows without labeling the mismatch.
7. Never rank options by an unexplained score. Show the decision criteria and decisive tradeoffs.
8. Never use numeric confidence unless the user provides a calibrated model and its methodology.
9. Never produce finished copy, fabricate product experience, or publish content as part of this Skill.
10. Keep one primary recommendation. Include alternatives only when they represent meaningfully different choices.

## Workflow

1. Define the decision: identify the outcome being optimized, decision horizon, audience, market, language, eligible channels, and material constraints.
2. Inventory available evidence by source, query identity, scope, freshness, coverage, and limitations.
3. Separate direct observations from interpretations already present in the source material.
4. Create only materially distinct content opportunities. For each, specify the audience need, topic, angle, proposed format or channel, and intended role in the user journey.
5. Evaluate every option against the same decision criteria. Read [references/evidence-evaluation.md](references/evidence-evaluation.md) for evidence admissibility and comparison rules.
6. Assign qualitative confidence using [references/confidence-rubric.md](references/confidence-rubric.md). Record supporting factors, weakening factors, counter-evidence, and conditions.
7. Select one primary recommendation. Explain why it best fits the stated goal and why the strongest alternative is not first.
8. Define the cheapest useful next test, including a success signal, failure signal, and the decision that each outcome would change.
9. Return the decision, alternatives, evidence trace, confidence rationale, risks, and next test. Use [assets/content-decision-template.md](assets/content-decision-template.md) when saving a durable decision artifact.

## Evidence Sufficiency

Proceed with a recommendation when the available evidence directly addresses the decision and its limitations can be bounded.

Proceed with `low` confidence when action is reversible and a small test is more useful than additional research. Make the exploratory nature explicit.

Stop and request missing context when:

- the business goal or target audience is unknown and different answers would reverse the recommendation;
- evidence cannot be traced to a result, query, or source;
- compared options use incompatible markets, languages, or time windows;
- the proposed action is costly or difficult to reverse and decisive evidence is missing.

Do not require both SEO and social evidence for every decision. One evidence family can be sufficient when it directly fits the question; disclose the missing perspective instead of fabricating corroboration.

## Opportunity Comparison

Compare only criteria relevant to the stated goal. Typical criteria include:

- demonstrated audience need;
- fit with search or conversation intent;
- evidence breadth and independence;
- target-domain or product fit;
- freshness and likely durability;
- competitive or SERP differentiation;
- channel and format fit;
- production cost, time sensitivity, and reversibility;
- material counter-evidence or compliance risk.

Do not average incompatible metrics into a synthetic opportunity score. Use a short decision matrix and explain which criteria are decisive.

## Response Format

Default to:

1. `Recommendation`: one action, its intended audience outcome, and why it is preferred.
2. `Decision basis`: decisive observations and inferences, each with traceable references.
3. `Confidence`: `high`, `medium`, or `low`, plus supporting and weakening factors.
4. `Alternatives`: up to two materially different options, their advantages, tradeoffs, and choose-when conditions.
5. `Counter-evidence and risks`: evidence or constraints that could reverse the decision.
6. `Next test`: the smallest useful experiment, success signal, failure signal, and resulting decision.
7. `Source coverage`: reused request IDs, SEO scopes, social queries, time coverage, and limitations.

When evidence is insufficient for a responsible recommendation, return a provisional direction and the minimum evidence needed to decide. Do not disguise an evidence-gap report as a confident recommendation.

## Examples

```text
Use $decide-content-opportunities to compare the opportunities in these completed SEO and social research results and recommend one topic to test first.
```

```text
Use $decide-content-opportunities to decide whether we should publish a durable search guide or a timely pain-point response, including confidence, counter-evidence, and alternatives.
```

```text
Use $decide-content-opportunities to rank these content angles for product education. Reuse the existing request_id and social results; do not collect fresh data.
```
