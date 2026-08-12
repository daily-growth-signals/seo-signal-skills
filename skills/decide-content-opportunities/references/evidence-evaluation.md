# Evidence Evaluation

## Evidence inventory

Record each source before interpreting it:

| Field | SEO evidence | Social evidence |
|---|---|---|
| Identity | `request_id`, query, market, language, scopes | exact query, sort order, page depth |
| Trace | `evidence_id` and returned URL when present | `post_id` and post URL |
| Time | result and source timestamps | post and collection timestamps |
| Coverage | completed and missing families | query, language, ranking, pagination |
| Limitations | terminal limitations and field semantics | retrieval errors and sampling limits |

Keep duplicated observations linked to their original sources. Corroboration requires independent evidence, not the same source field repeated in several summaries.

## Admissibility

Use evidence in a decision only when:

- its source can be traced;
- its market, language, audience, and time scope are known or explicitly bounded;
- its meaning follows the returned field semantics rather than a remembered source definition;
- its limitation does not invalidate the claim being made.

Exclude invented transformations, unsupported sentiment labels, inferred commercial value, and claims copied from a prior synthesis without its underlying source trace.

## Observation and inference

Write direct evidence as observations:

```text
Observation: the terminal SEO result labels the dominant returned intent as X
and links it to evidence_id Y.
```

Write cross-source conclusions as inferences:

```text
Inference: the repeated problem wording in independent social posts is
consistent with the returned search intent, so an educational angle is
plausible for this audience.
```

Do not upgrade an inference into a fact because several summaries repeat it.

## Cross-source comparison

Treat SEO and social evidence as complementary rather than interchangeable:

- SEO evidence can support discoverability, query demand, intent, SERP shape, trend direction, and target-domain presence.
- Social evidence can support current wording, questions, objections, use cases, feedback, and public engagement observations.
- Neither source alone proves conversion, revenue, customer lifetime value, or causal performance.

When they agree, identify the exact shared need or intent. When they conflict, preserve both explanations and lower confidence unless the mismatch is explained by market, language, time, audience, or channel.

## Counter-evidence

Search the available result for evidence that weakens each opportunity:

- declining or unstable interest;
- mixed or incompatible intent;
- sparse or concentrated social evidence;
- target-domain mismatch;
- strong SERP saturation without a clear differentiation;
- audience or market mismatch;
- freshness that is too short for the proposed production cycle;
- limitations affecting a decisive field.

Absence of corroboration is a coverage limitation, not automatically counter-evidence.

## Option construction

Make alternatives differ in at least one decision variable:

- audience need;
- content role;
- topic or angle;
- channel or format;
- freshness strategy;
- production cost or test risk.

Do not create artificial alternatives by rephrasing the same recommendation.

## Decision rule

Prefer the option that best satisfies the user's stated objective under the current constraints, not the option with the largest isolated metric.

When evidence supports different objectives, state the fork explicitly:

```text
Choose A for durable discovery.
Choose B for timely audience learning.
```

Then select a primary option only after applying the user's actual objective.
