---
name: research-seo-signals
description: Research evidence-backed SEO demand signals for a keyword, domain, market, and language through the Daily Growth Signals MCP server. Use for keyword validation, search-demand analysis, intent discovery, SERP pattern review, audience evidence, market comparison, opportunity briefs, and any request that needs traceable SEO evidence instead of unsupported recommendations.
---

# Research SEO Signals

Turn a natural-language SEO research goal into one asynchronous Daily Growth Signals request, then return an organized, evidence-linked report. Use the MCP result as evidence, not as permission to invent facts or make the user's final prioritization decision. A short summary never replaces the complete returned data.

## Execution Contract

- Use the Daily Growth Signals MCP tools for live demand-signal research.
- Use only `submit_keyword_research_signals` and `get_keyword_research_signals` for this workflow.
- Treat the MCP tool schema and returned fields as the source of truth.

- Preserve the submitted `request_id` until the task reaches a terminal state.
- Separate observed evidence from interpretation in every answer.
- If this Skill conflicts with the live MCP tool schema, follow the live schema.

## Hard Rules

1. Submit once, then poll. Never create a second duplicate request merely because the first request is still `pending` or `running`.
2. Reuse a stable `idempotency_key` when retrying the same logical research request.
3. Never invent metrics, evidence, URLs, timestamps, source availability, or successful nodes.
4. Never cite an evidence ID that is absent from the terminal result.
5. Never treat a `partial` result as fully complete. State exactly which evidence is unavailable.
6. Never fetch or summarize the body of a search-result page as part of this Skill. Use only returned links and structured observations.
7. Never turn signals into an automatic go/no-go SEO decision. Explain what the evidence supports and let the user decide.
8. Keep machine field names unchanged, but write the user-facing answer in the requested language.
9. Never silently truncate, sample, or discard relevant returned data. Preserve every returned Keyword Overview field, related keyword, organic SERP result, Google Trends point/query/region, X post, evidence item, signal, limitation, and usage field.
10. You may omit only null/empty fields and internal transport metadata that has no research meaning. State any deliberate omission and its rule.

## Workflow

1. Identify the user's research goal, seed keyword, target domain, research language, response language, and desired answer depth.
2. Normalize `market` to an ISO 3166-1 alpha-2 country code such as `US`.
3. Normalize research `language` to an ISO language or supported BCP 47 code such as `en` or `zh-TW`.
4. If research language is absent, infer it from the target market and keyword only when unambiguous; otherwise default to `en`.
5. Determine response language separately from research language: honor an explicit answer-language request, otherwise use the user's conversation language, and default to English only when neither is clear.
6. Ask only for a missing keyword or domain that cannot be safely inferred. Do not ask for optional report preferences before starting.
7. Create a stable `idempotency_key` for the logical request when the client supports retries. Do not include private or personal data in it.
8. Call `submit_keyword_research_signals` once with `keyword`, `domain`, `market`, research `language`, and the optional `idempotency_key`.
9. Store the returned `request_id`, `status`, `is_terminal`, `poll_after_seconds`, and `execution_deadline_at`.
10. If `is_terminal` is false, wait for `poll_after_seconds` when provided, then call `get_keyword_research_signals` with the same `request_id`.
11. Continue polling while status is `pending` or `running`. Do not resubmit.
12. Stop when `is_terminal` is true or the client reaches a firm execution deadline.
13. For `complete` or `partial`, validate the result before interpreting it.
14. For `failed`, report the stable error and a safe next step. Retry only when the error is explicitly retryable or the user requests a new attempt.
15. Return observations first, evidence second, limitations third, and optional follow-up research last.

## Input Model

Translate the user's request into these fields:

- `keyword`: the exact seed query to investigate; preserve meaningful punctuation and product names.
- `domain`: the target hostname without scheme, path, query, or fragment.
- `market`: a two-letter country code. Do not send city names or free-form country names.
- `language`: the research language sent to the data service; it does not control the final answer language.
- `idempotency_key`: a stable retry identifier for the same logical request.

Use these defaults:

- Default research language: `en` when no unambiguous market-specific language can be inferred.
- Default response language: the user's conversation language, otherwise `en`.
- Default output depth: concise.
- Default polling behavior: follow `poll_after_seconds`.
- Default decision stance: evidence summary, not recommendation.

Do not silently replace an unsupported market-language pair with another country or language. Report the rejected pair and ask the user to choose a supported alternative.

## State Machine

Handle states exactly as follows:

- `pending`: accepted but not started; wait and poll.
- `running`: in progress; wait and poll.
- `complete`: terminal result with all required nodes completed.
- `partial`: terminal usable result with one or more limitations; report both usable evidence and missing coverage.
- `failed`: terminal failure; report `error.code`, summarize `error.message`, and do not fabricate a result.

Trust `is_terminal` as the primary stop signal. Use `status` to explain the outcome. A missing `result` in a non-terminal response is normal.

## Result Validation

Before writing the answer:

1. Confirm the terminal envelope has the same `request_id` returned by submit.
2. Confirm `result.query` matches the requested keyword, domain, market, and language.
3. Read `status`, `limitations`, and `usage` before interpreting any signal.
4. Inventory all returned families before summarizing: `keyword_overview`, `metrics`, `related_keywords`, `serp_snapshot`, `trends_snapshot`, `x_recent_search`, `evidence`, `signals`, `limitations`, and `usage`.
5. Count every array and verify the final report contains the same number of relevant items. Never replace a complete array with top-N examples unless the user explicitly asks for a subset.
6. Build a set of available `evidence_id` values.
7. Verify every `evidence_refs` and `counter_evidence_refs` item points to that set.
8. Treat metrics, intent, search observations, trend evidence, and audience evidence as separate evidence families.
9. Mark stale timestamps, unavailable nodes, sparse results, and conflicting evidence explicitly.
10. Do not infer absence of demand from absence of one optional evidence family.

## Interpretation Rules

- Label direct result fields as observations.
- Label synthesis across multiple evidence items as inference.
- Prefer corroborated signals supported by more than one evidence family.
- Surface counter-evidence next to the claim it weakens.
- Explain confidence using evidence quality and coverage, not intuition.
- Distinguish keyword demand from target-domain fit.
- Distinguish search intent from content format.
- Distinguish current observations from durable trends.
- Use returned URLs only as traceability links; do not claim to have read their page bodies.
- Mention usage metadata only when it is relevant to the user's requested methodology or freshness explanation.
- Preserve values and units exactly. Do not round, merge, deduplicate, or translate keyword strings, URLs, timestamps, IDs, counts, ranks, or metric values unless the user explicitly requests a transformed view.
- Organize large arrays into tables or clearly labeled sections, but include every item. If the client output limit prevents one response, continue in numbered parts without making another duplicate request.

## Language Rules

- Treat MCP `language` as research scope only. Never use it as the sole signal for response language.
- Honor an explicit response-language request even when it differs from the MCP research language.
- Without an explicit response-language request, answer in the user's conversation language; default to English only when that language is unclear.
- Keep codes, tool names, IDs, enum values, URLs, and JSON property names unchanged.
- Do not copy the language of incidental evidence when it conflicts with the selected response language.
- When response language differs from research language, preserve the submitted research language in a concise methodology note.

## Response Format

Keep the opening summary compact, then provide the complete organized data:

1. `Summary`: two to four evidence-grounded observations.
2. `Keyword overview`: include every returned overview field, including nested keyword metrics, keyword properties, SERP info, backlink info, clickstream info when present, and `search_intent_info`.
3. `Related keywords`: include every returned item and all fields supplied for each item.
4. `SERP`: include every returned organic result, SERP feature, context field, timestamp, and traceability URL.
5. `Google Trends`: include every timeline point, geographic point, and related top/rising query returned.
6. `X recent search`: include every returned post and its author, timestamp, language, URL, and metrics.
7. `Evidence and signals`: include every returned item and preserve all reference IDs.
8. `Limitations and usage`: include all limitations and the complete usage object.
9. `Next steps`: optional follow-up investigations, never an automatic SEO decision.

Before sending, compare section counts against the inventory. If anything relevant is not rendered, add it or explicitly disclose why it could not be included.

For a comparison request, use one row per keyword or market and keep definitions consistent across rows. Do not compare requests with different markets or languages without labeling that difference.

## Failure Recovery

- Unsupported market or language: report the exact normalized pair and ask for an alternative. Do not substitute silently.
- Request not found: verify that the original `request_id` is being used in the same workspace.



- Polling deadline reached: return the current status and `request_id`; do not submit again automatically.
- Partial terminal result: use successful evidence and clearly isolate limitations.
- Unknown evidence reference: omit the unsupported claim and report the consistency issue.

## Examples

Single-market research:

```text
Use $research-seo-signals to research "AI SEO tools" for example.com in the US English market.
```

Localized research:

```text
Use $research-seo-signals to research "herramientas SEO con IA" for example.com in the US Spanish market and answer in Spanish.
```

Evidence-focused follow-up:

```text
Use $research-seo-signals to summarize only the strongest supported demand and intent observations, including counter-evidence and limitations.
```

## Reference

Read [references/mcp-contract.md](references/mcp-contract.md) before the first live call, when interpreting terminal envelopes, or when diagnosing tool and request-state errors.
