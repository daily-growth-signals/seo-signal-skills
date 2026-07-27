# Qualitative Confidence Rubric

Confidence describes how strongly the available evidence supports the specific recommendation under its stated conditions. It is not the probability that content will perform.

## Dimensions

Assess four dimensions:

| Dimension | Question |
|---|---|
| Coverage | Does the evidence cover the claims decisive to this recommendation? |
| Corroboration | Do independent observations support the same audience need or intent? |
| Relevance | Does the evidence match the target audience, market, language, channel, and goal? |
| Freshness | Is the evidence current enough and durable enough for the decision horizon? |

Also record reversibility. A reversible low-cost test may be responsible at lower confidence; an expensive or irreversible action requires stronger evidence.

## High

Use `high` only when:

- decisive claims have direct, traceable evidence;
- coverage is adequate for the stated decision;
- independent observations corroborate the recommendation, or one authoritative evidence family directly answers the question;
- market, language, audience, and time scope fit;
- counter-evidence is weak or has a bounded explanation;
- no material limitation undermines the primary rationale.

High confidence still does not guarantee content performance.

## Medium

Use `medium` when the direction is supported but one or more uncertainties remain:

- only one relevant evidence family is available;
- corroboration is limited or concentrated;
- freshness or durability is uncertain;
- target-domain, product, or channel fit is inferred rather than observed;
- counter-evidence is meaningful but does not outweigh support;
- a `partial` result omits useful but non-decisive coverage.

State the condition most likely to raise or lower confidence.

## Low

Use `low` when:

- evidence is sparse, indirect, stale, mismatched, or dominated by one source;
- decisive claims depend mainly on inference;
- counter-evidence materially competes with support;
- limitations affect the main rationale;
- the recommendation is best understood as a reversible exploratory test.

Do not use low confidence to justify costly or difficult-to-reverse action.

## Insufficient

Do not force a label when:

- the evidence has no traceable source;
- the business objective or audience is missing and plausible choices reverse the answer;
- sources cannot be compared because their scopes are incompatible;
- a material action requires evidence that is entirely absent.

Return the minimum evidence or context needed to decide.

## Reporting

Always report:

```text
Confidence: medium
Supporting factors:
- ...
Weakening factors:
- ...
Would change the decision:
- ...
```

Never calculate a percentage by mapping high, medium, and low to arbitrary numbers. Never average provider metrics into a confidence score.
