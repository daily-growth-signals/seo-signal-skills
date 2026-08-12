---
name: decide-content-opportunities
description: Generate evidence-constrained keyword and content-opportunity decisions through the Daily Growth Signals Decision MCP, with a traceable stance, qualitative confidence, counter-evidence, conditions, risks, and a next validation test. Use when deciding whether or how to prioritize a keyword opportunity. Do not use for collecting SEO signals alone, writing finished content, publishing, or making the user's final business decision.
---

# Decide Content Opportunities

Use the independent Daily Growth Signals Decision MCP to produce a conditional
keyword recommendation. Make a decision when the evidence supports one; do not
hide behind an unranked summary. Preserve the boundary between observation,
inference, recommendation, and expected outcome.

## Decision Contract

- Use `submit_keyword_decision_report` and `get_keyword_decision_report` from
  the Decision MCP. Do not use the SEO MCP merely to manufacture a
  recommendation.
- Start from the keyword, target domain, market, language, business goal,
  audience, channel constraints, and time horizon.
- Reuse a prior Decision MCP `request_id` for the same logical decision before
  submitting. Keep one stable `idempotency_key` across retries.
- Select the smallest sufficient SEO `data_scopes`; omit it only when the
  decision genuinely needs every SEO evidence family.
- Treat live `field_semantics`, evidence IDs, request IDs, limitations, and
  timestamps as authoritative.
- Recommend an action only within the evidence coverage. State conditions that
  would change the recommendation.
- Use `high`, `medium`, or `low` as qualitative confidence labels. Never
  present them as calibrated probabilities.

## Hard Rules

1. Never invent demand, audience needs, commercial value, expected performance,
   evidence, or source coverage.
2. Never convert search volume, ranking, trend interest, post count, or
   engagement directly into revenue or purchase intent.
3. Never cite an SEO claim without its available `request_id` and
   `evidence_id`.
4. Never describe absent or unrequested evidence as negative evidence.
5. Never hide counter-evidence, stale data, `partial` results, sparse samples,
   ranking effects, or market-language mismatch.
6. Never combine evidence from different markets, languages, audiences, or time
   windows without labeling the mismatch.
7. Never rank options by an unexplained score. Show the decision criteria and
   decisive tradeoffs.
8. Never use numeric confidence unless the user provides a calibrated model and
   its methodology.
9. Never produce finished copy, fabricate product experience, publish content,
   or execute the recommendation.
10. Never submit a second decision job merely because the first is `pending` or
    `running`; poll the same `request_id`.
11. Never present a terminal result without `decision_report` as a completed
    recommendation. Report the missing Skill output or failure instead.
12. Keep one primary recommendation. Include alternatives only when they
    represent meaningfully different choices.

## Workflow

1. Define the decision and normalize the keyword, hostname-only domain, ISO
   alpha-2 market, research/report language, horizon, audience, eligible
   channels, and material constraints.
2. Select the smallest sufficient `data_scopes`: `keyword_overview`,
   `related_keywords`, `serp`, and/or `google_trends`.
3. Build a stable key:
   `keyword-decision:` + keyword + `|` + domain + `|` + market + `|` +
   language + `|` + sorted scopes.
4. Reuse gate: if the conversation already contains a matching `request_id`,
   call only `get_keyword_decision_report`.
5. Otherwise call `submit_keyword_decision_report` once with the normalized
   inputs and stable key. Preserve its `request_id`, `poll_after_seconds`, and
   `execution_deadline_at`.
6. Poll `get_keyword_decision_report` with the same `request_id` until
   `is_terminal=true`; never resubmit while pending or running.
7. On `complete` or `partial`, verify that `result.query` matches the requested
   identity, inventory evidence and limitations, and require a non-null
   `result.decision_report`.
8. Evaluate the report using
   [references/evidence-evaluation.md](references/evidence-evaluation.md) and
   [references/confidence-rubric.md](references/confidence-rubric.md). Do not
   silently strengthen the MCP report.
9. Return the stance, decision basis, confidence, counter-evidence, conditions,
   risks, recommended actions, stop conditions, missing inputs, and source
   `request_id`. Use
   [references/content-decision-template.md](references/content-decision-template.md)
   when saving a durable artifact.

## Evidence Sufficiency

Proceed with a recommendation when the available evidence directly addresses
the decision and its limitations can be bounded.

Proceed with `low` confidence when action is reversible and a small test is
more useful than additional research. Make the exploratory nature explicit.

Preserve a `run_validation_test` or `defer` stance when:

- the business goal or target audience is unknown and different answers would
  reverse the recommendation;
- evidence cannot be traced to the terminal result;
- compared options use incompatible markets, languages, or time windows;
- the proposed action is costly or difficult to reverse and decisive evidence
  is missing.

Do not require social evidence for a keyword decision. If the user needs
cross-channel comparison, collect social evidence with the separate
`research-social-signals` Skill and label it as supplemental context; do not
imply that it was consumed by the Decision MCP unless the live schema supports
it.

## Response Format

Default to:

1. `Recommendation`: the report stance and one primary action.
2. `Decision basis`: decisive observations and inferences with evidence IDs.
3. `Confidence`: qualitative label plus strengthening and weakening factors.
4. `Counter-evidence and conditions`: facts or assumptions that could reverse
   the recommendation.
5. `Risks and missing inputs`: material uncertainty and unavailable evidence.
6. `Next test`: recommended action, expected observable signal, and explicit
   stop condition.
7. `Source job`: reused `request_id`, selected SEO scopes, freshness, and
   limitations.

Do not disguise an evidence-gap report as a confident recommendation.

## Examples

```text
Use $decide-content-opportunities to decide whether "AI SEO tools" should be prioritized for example.com in the US English market.
```

```text
Use $decide-content-opportunities to generate a conditional keyword decision with confidence, counter-evidence, conditions, and a next validation test.
```

```text
Use $decide-content-opportunities to query the existing Decision MCP request_id again and summarize its stop conditions.
```

## Reference

Read [references/mcp-contract.md](references/mcp-contract.md) before the first
live Decision MCP call or when diagnosing request-state errors.
