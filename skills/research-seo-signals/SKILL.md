---
name: research-seo-signals
description: SignalDig SEO research skill — REQUIRES the daily-growth-signals MCP server and a SignalDig API key; installing this Skill does not connect the MCP server, and never fabricate or simulate results when the MCP tools are unavailable. Retrieve evidence-backed SEO data for a keyword, domain, market, and language through the SignalDig MCP server. Use for keyword metrics, related-keyword discovery, SERP observations, Google Trends evidence, market comparison, and other requests that need traceable SEO data. Confirm which data family the user actually needs when a generic keyword request is ambiguous, call only the smallest sufficient scope, and reuse a prior request_id or stable idempotency_key before creating a duplicate submit. Do not make the user's SEO or growth decision.
slug: signaldig-research-seo-signals
displayName: Research SEO Signals
version: 1.6.0
summary: Collect traceable SEO demand signals for keywords, domains, markets, and languages through the SignalDig MCP server.
license: MIT
homepage: https://signaldig.com/
tags: [seo, keyword-research, mcp, growth, daily-growth-signals]
---

# Research SEO Signals

Turn a natural-language SEO research goal into the smallest sufficient asynchronous SignalDig MCP request, then return an organized, evidence-linked report. Use the MCP result as evidence, not as permission to invent facts or make the user's final prioritization decision.

**Efficiency stance:** Prefer reuse of prior terminal results, narrow scopes, and a concise default report. Do not re-fetch the same logical research or re-dump full arrays unless the user asks for a refresh or a full export.

## MCP Availability Gate (Mandatory)

> This Skill is a **workflow spec only**; it has no data of its own. Every live
> result comes from the `daily-growth-signals` MCP server, which requires a
> valid SignalDig API key. **Installing this Skill does not connect the MCP
> server** — the two are separate installs.

Before starting any research, verify that the `daily-growth-signals` MCP
server is connected and its tools are visible (e.g.
`submit_keyword_research_signals`, `submit_specific_seo_data`,
`get_keyword_research_signals`, `submit_competitor_analysis`,
`submit_geo_analysis`, `submit_backlink_analysis`).

If the MCP server is not configured, its tools are missing, the API key is
invalid, or an initial connection fails:

- **Stop immediately.** Do not start the workflow, do not poll, and do not
  emit any metrics, rankings, evidence IDs, source URLs, or "results".
- **Never simulate, guess, or answer from general knowledge.** A
  knowledge-based reply is NOT a valid Skill output and misleads the user into
  thinking the Skill ran.
- Tell the user plainly: this Skill needs the `daily-growth-signals` MCP
  server at `https://mcp.signaldig.com/data/seo/mcp` and a SignalDig API key
  (get one at <https://signaldig.com/> → API Keys). Point to
  [references/setup-guide.md](references/setup-guide.md) for client-specific
  steps, then stop.

Only when the tools are available may the workflow proceed, and every
substantive claim must cite a real tool result.

## Execution Contract

- Use the SignalDig MCP tools for live demand-signal research.
- Use only the SEO MCP product surface for live demand-signal research. This
  Skill returns evidence summaries only; it does not collect social evidence
  and does not produce conditional recommendations.
- Map the user's goal to the smallest sufficient data-scope combination. Use `submit_specific_seo_data` for one family, `submit_keyword_research_signals` with `data_scopes` for any multi-family subset, and `get_keyword_research_signals` to query either job.
- Use `submit_competitor_analysis` for competitor research, `submit_geo_analysis` for AI-search/GEO visibility, and `submit_backlink_analysis` for a site's backlinks and referring domains. These tools own provider query details; do not construct low-level provider requests.
- `search_engine="bing"` is supported here. When the user explicitly requests
  Bing, pass `search_engine="bing"` and label every SERP observation with the
  engine that produced it.
- Treat the MCP tool schema and returned fields as the source of truth.
- Preserve every `request_id` and `idempotency_key` used in this conversation until the task is finished.
- Separate observed evidence from interpretation in every answer.
- If this Skill conflicts with the live MCP tool schema, follow the live schema.

## Hard Rules

1. **Reuse before submit.** Before any submit, search this conversation for a prior job with the same logical research identity. If a matching `request_id` exists, call only `get_keyword_research_signals`. Do not create a new request for the same data.
2. **Stable idempotency.** Always build and send a stable `idempotency_key` for a logical research request. On tool errors, client timeouts, ambiguous failures, or retries of the same logical request, reuse that exact key. Do not invent a new key for the same keyword/domain/market/language/scopes.
3. Select one submit tool at most once per logical research need after reuse checks fail, then poll. Never create a second request merely because the first request is still `pending` or `running`.
4. Never invent metrics, evidence, URLs, timestamps, source availability, or successful nodes.
5. Never cite an evidence ID that is absent from the terminal result.
6. Never treat a `partial` result as fully complete. State exactly which evidence is unavailable.
7. Never fetch or summarize the body of a search-result page as part of this Skill. Use only returned links and structured observations.
8. Never turn signals into an automatic go/no-go SEO decision. Explain what the evidence supports and let the user decide.
9. Keep machine field names unchanged, but write the user-facing answer in the requested language.
10. Never use the aggregate submit tool merely to obtain one data family. Use the narrowest `data_scope` that satisfies the user's goal.
11. Default report depth is **concise**. Do not paste every array item unless the user explicitly asks for a full export or complete dump. When concise, still preserve exact metric values you do cite and disclose the full counts returned.
12. Do not refresh live data just to rephrase an earlier answer. Reuse the prior terminal result unless the user asks for a refresh or the prior result is missing required scopes.
13. **Confirm ambiguous scope before calling.** A generic request such as “查一下这个关键词”“研究这个词” or “看看关键词数据” does not authorize all data families. Briefly ask which data the user needs, using plain-language choices. Do not submit while the required scope remains ambiguous.
14. Do not ask a scope question when the user's goal already identifies the needed family or families. Map the goal directly and retrieve only those scopes.
15. Omit `data_scopes` only when the user explicitly asks for comprehensive/all-family research or when every family is demonstrably necessary to answer an already specific request. Never equate a unified MCP endpoint with permission for full retrieval.

## Logical Research Identity

Treat two research goals as the same logical request when all of the following match after normalization:

- `keyword` (exact seed string)
- `domain` (hostname only)
- `market` (ISO alpha-2)
- `language` (research language)
- selected `data_scope` / `data_scopes` set (order-independent)
- `search_engine` when the selected traditional scope includes `serp`
- dedicated `analysis_kind` (`competitor`, `geo`, or `backlink`) instead of
  `data_scope` / `data_scopes` for a dedicated analysis tool
- optional user-declared refresh flag is absent

Build:

```text
idempotency_key = "seo-signals:" + keyword + "|" + target_identity + "|" + market + "|" + language + "|" + sorted_scopes + "|engine=" + search_engine
```

Where `target_identity` is `domain` for traditional, competitor, and GEO
research, and `target` for backlink analysis. `sorted_scopes` is the selected traditional scopes joined by commas in
stable sorted order, `all` when the complete set is intentionally requested,
or `analysis=competitor`, `analysis=geo`, or `analysis=backlink` for a
dedicated analysis. Include `engine=` only for a traditional SERP scope. Do
not put personal or confidential data into the key.

Keep a session ledger (in agent working memory) shaped like:

```text
logical_id -> { idempotency_key, request_id, status, terminal_at, scopes }
```

Update the ledger after every successful submit or get.

## Workflow

1. Identify the user's research goal, seed keyword, target domain, research language, response language, desired answer depth (`concise` default, `full` only if requested), and whether they asked to **refresh**.
2. Normalize `market` to an ISO 3166-1 alpha-2 country code such as `US`.
3. Normalize research `language` to an ISO language or supported BCP 47 code such as `en` or `zh-TW`.
4. If research language is absent, infer it from the target market and keyword only when unambiguous; otherwise default to `en`.
5. Determine response language separately from research language: honor an explicit answer-language request, otherwise use the user's conversation language, and default to English only when neither is clear.
6. Ask for a missing keyword and target identity that cannot be safely inferred: `domain`
   for traditional, competitor, or GEO research, and `target` for backlink analysis.
7. Identify whether the request is for traditional keyword research, competitor analysis, GEO/AI-search visibility, or backlink/referring-domain analysis. If the user only names a keyword or asks for generic “keyword data/research,” pause before any live call and ask which traditional data families they need: keyword metrics and intent, related keywords, current search results/SERP, or search trends.
8. Route traditional research with exactly one family to `submit_specific_seo_data`, and two or more families to `submit_keyword_research_signals` with exactly those values in `data_scopes`. Omit `data_scopes` only when all supported traditional families are required. Route a dedicated analysis directly to its matching submit tool; do not encode it as a traditional data scope.
9. Build the stable `idempotency_key` from the logical research identity.
10. **Reuse gate (mandatory before submit):**
    1. If the session ledger or conversation already has a `request_id` for this identity, call `get_keyword_research_signals(request_id)` only.
    2. If status is `complete` or `partial` and the user did not ask to refresh, validate and answer from that result. Stop.
    3. If status is `pending` or `running`, continue polling that `request_id` only. Do not submit again.
    4. If status is `failed` and the user wants a retry, prefer **resubmit with the same `idempotency_key`** so the retry keeps the same logical identity.
    5. If no prior `request_id` is known, still send the stable `idempotency_key` on first submit so client retries collapse to one run.
11. Call the selected submit tool only when the reuse gate requires a new submit: pass `keyword`, `domain`, `market`, research `language`, and the same `idempotency_key`; pass `data_scope` / `data_scopes` only for traditional research. For a dedicated analysis, call only its matching tool.
12. Store the returned `request_id`, `status`, `is_terminal`, `poll_after_seconds`, and `execution_deadline_at` in the session ledger.
13. If `is_terminal` is false, wait for `poll_after_seconds` when provided, then call `get_keyword_research_signals` with the same `request_id`.
14. Continue polling while status is `pending` or `running`. Do not resubmit.
15. Stop when `is_terminal` is true or the client reaches a firm execution deadline.
16. For `complete` or `partial`, validate the result before interpreting it.
17. For `failed`, report the stable error and a safe next step. Retry only when the error is explicitly retryable or the user requests a new attempt, always reusing the prior `idempotency_key` for that logical identity.
18. Return observations first, evidence second, limitations third, and optional follow-up research last.

## Data Scope Selection

Use the following exact mapping:

- `keyword_overview`: keyword metrics, properties, backlink/SERP summaries, and embedded search intent.
- `related_keywords`: related keyword discovery and their returned metrics.
- `serp`: organic results, SERP features, target-domain presence, and traceability URL.
- `google_trends`: interest timeline, geographic interest, and related top/rising queries.

Use the dedicated analysis tools when the request is about competitors, AI-search visibility/LLM mentions, or backlinks/referring domains. Keep those analysis families separate from the traditional SEO scope selection.

Map clear requests directly:

- competitor domains, organic competitors, competitor keywords, or domain-rank context → `submit_competitor_analysis`
- AI Overviews/AI Mode, LLM mentions, or AI-search visibility → `submit_geo_analysis`
- backlinks, referring domains, link sample, or referring-domain sample → `submit_backlink_analysis`

These tools are separate asynchronous jobs. Reuse and poll each job by its own
`request_id`; do not pretend their observations were returned by a traditional
`data_scope` request.

Map common user wording without another question when the intent is clear:

- “搜索量、CPC、竞争度、关键词属性或搜索意图” → `keyword_overview`
- “相关词、长尾词、扩展词或更多关键词” → `related_keywords`
- “当前排名、搜索结果、SERP 特性或目标域名是否出现” → `serp`
- “热度变化、时间趋势、地区热度或上升查询” → `google_trends`

If wording spans multiple rows, select only those rows. If it matches none clearly, ask a short scope question before calling. Do not propose all families as the default or describe them as a mandatory bundle.

For SERP requests, use `search_engine="bing"` when the user explicitly asks for Bing/必应; otherwise omit it and keep the Google default. Do not expose or construct DataForSEO task parameters, endpoint paths, device settings, depth, or location payloads in the MCP call; the service implementation owns those details.

Use one combined submit when the answer needs two or more families; do not split one logical combination into several requests. Omit `data_scopes` only for a complete all-family research request.

When a prior terminal result already covers a **superset** of the needed scopes (for example prior `all` and now only `serp`), reuse that `request_id` and answer from the needed family only. Do not submit a narrower job just to re-fetch overlapping data.

When a prior result is a **subset** of what is now needed, submit only for the missing scopes if the tools allow a scoped request; do not re-request families already present unless the user asks to refresh.

## Input Model

Translate the user's request into these fields:

- `keyword`: the exact seed query to investigate; preserve meaningful punctuation and product names.
- `domain`: the target hostname without scheme, path, query, or fragment for traditional,
  competitor, and GEO research.
- `target`: only for `submit_backlink_analysis`; pass a domain or subdomain without
  scheme and `www.`, or pass a webpage as an absolute `http://` or `https://` URL.
- `market`: a two-letter country code. Do not send city names or free-form country names.
- `language`: the research language sent to the data service; it does not control the final answer language.
- `data_scope` / `data_scopes`: the smallest single family or multi-family combination needed for the goal.
- `search_engine`: optional SERP engine selector, `google` or `bing`; it defaults to `google` and does not change non-SERP data families.
- `idempotency_key`: stable retry and reuse identifier for the same logical request.

Use these defaults:

- Default research language: `en` when no unambiguous market-specific language can be inferred.
- Default response language: the user's conversation language, otherwise `en`.
- Default output depth: **concise**.
- Default polling behavior: follow `poll_after_seconds`.
- Default decision stance: evidence summary, not recommendation.
- Default freshness: reuse prior terminal result in-session; refresh only when the user asks.
- Default SERP engine: use Google when the user does not name an engine. If the user asks for Bing/必应, pass `search_engine="bing"`; do not fetch Bing by default.

The traditional SEO function remains `submit_specific_seo_data`; it supports the existing SEO families and can select Google or Bing for `serp`. Bing fields may differ from Google, so interpret the returned result and `field_semantics` rather than assuming identical structure.

Do not silently replace an unsupported market-language pair with another country or language. Report the rejected pair and ask the user to choose a supported alternative.

## State Machine

Handle states exactly as follows:

- `pending`: accepted but not started; wait and poll the same `request_id`.
- `running`: in progress; wait and poll the same `request_id`.
- `complete`: terminal result with all required nodes completed; reuse via `get` for later questions.
- `complete`: terminal usable result. Freshness-only codes `signaldig_stale_data` and `signaldig_unknown_freshness` stay on complete; treat them as quality notes, not outages.
- `partial`: terminal usable result with missing coverage such as `signaldig_no_matching_data` or `signaldig_analysis_unavailable`; report both usable evidence and missing families. Do not retry empty-result codes.
- `failed`: terminal failure; report `error.code`, summarize `error.message`, and do not fabricate a result. Retry only with the same `idempotency_key` when appropriate. Treat `signaldig_data_unavailable` as a service outage, not as missing keyword data.

Trust `is_terminal` as the primary stop signal. Use `status` to explain the outcome. A missing `result` in a non-terminal response is normal.

## Result Validation

Before writing the answer:

1. Confirm the terminal envelope has the same `request_id` returned by submit or previously reused.
2. Confirm `result.query` matches the requested keyword, domain, market, and language.
3. Read `status`, `limitations`, `usage`, and `result.field_semantics` before
   interpreting any raw or normalized result field. Apply each matching entry's
   `unit`, `meaning`, and `caveats`; do not replace the live glossary with
   remembered source definitions.
4. Inventory all output sections expected for the selected request before summarizing. For a scoped traditional request, require only its selected family plus `evidence`, `signals`, `limitations`, and `usage`. For dedicated analysis, require its matching public section (`competitor_analysis`, `geo_analysis`, or `backlink_analysis`) and shared result metadata; for GEO also read `analysis_coverage`. Do not misreport intentionally unrequested sections as missing.
5. For **full** depth only: count every array and include every relevant item. For **concise** depth: report counts and the strongest items, and state that more rows are available from the same `request_id`.
6. Build a set of available `evidence_id` values for any claim you make.
7. Verify every cited `evidence_refs` and `counter_evidence_refs` item points to that set.
8. Treat metrics, intent, search observations, trend evidence, and audience evidence as separate evidence families.
9. Mark stale timestamps, unavailable nodes, sparse results, and conflicting evidence explicitly.
10. Do not infer absence of demand from absence of one optional evidence family.
11. If `usage.cached` is true after a resubmit, treat it as reuse of an existing result and mention it only when freshness matters.

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
- Preserve values and units exactly for any figure you report. Do not round, merge, deduplicate, or translate keyword strings, URLs, timestamps, IDs, counts, ranks, or metric values unless the user explicitly requests a transformed view.
- Prefer tables for arrays, but keep concise depth unless full export was requested.

## Language Rules

- Treat MCP `language` as research scope only. Never use it as the sole signal for response language.
- Honor an explicit response-language request even when it differs from the MCP research language.
- Without an explicit response-language request, answer in the user's conversation language; default to English only when that language is unclear.
- Keep codes, tool names, IDs, enum values, URLs, and JSON property names unchanged.
- Do not copy the language of incidental evidence when it conflicts with the selected response language.
- When response language differs from research language, preserve the submitted research language in a concise methodology note.

## Response Format

### Concise (default)

1. `Summary`: two to four evidence-grounded observations.
2. Key metrics / patterns needed for the goal, with exact values cited.
3. A short evidence note with the strongest supporting IDs or URLs.
4. `Limitations`: all limitations that affect the claim.
5. `Source job`: `request_id` (and whether this answer reused a prior job).
6. Optional next steps: offer full export or a scoped refresh only if useful.

### Full (only when the user asks for complete dump / full export)

Provide every section relevant to the selected request:

1. `Summary`
2. `Keyword overview` (all returned overview fields)
3. `Related keywords` (every item)
4. `SERP` (every organic result and feature)
5. `Google Trends` (every returned point/query/region)
6. `Competitor analysis` (every returned subsection, only when requested)
7. `GEO / AI-search analysis` (every returned subsection and coverage, only when requested)
8. `Backlink analysis` (all returned samples and total counts, only when requested)
9. `Evidence and signals` (every item and reference IDs)
10. `Limitations and usage`
11. `Next steps`

For a comparison request, use one row per keyword or market and keep definitions consistent across rows. Reuse prior jobs per row when available. Do not compare requests with different markets or languages without labeling that difference.

## Failure Recovery

- Unsupported market or language: report the exact normalized pair and ask for an alternative. Do not substitute silently.
- Request not found: verify the original `request_id`. Do not immediately create a new request; retry `get` once, then resubmit only with the same `idempotency_key` if the user still needs the research.
- Tool unavailable: report that live research could not be completed; do not guess at internal causes or fabricate results.
- Polling deadline reached: return the current status and `request_id`; do not submit again automatically. Later turns must resume with `get` on that `request_id`.
- Partial terminal result: use successful evidence and clearly isolate limitations. Reuse this job for follow-ups that only need the successful families.
- Unknown evidence reference: omit the unsupported claim and report the consistency issue.
- Retry after failure: prefer the prior `idempotency_key` for the same logical identity. Create a new key only when the user changes keyword, domain, market, language, or scopes, or explicitly asks for a distinct new job.

## Examples

Reuse prior job in the same conversation:

```text
User: Research "AI SEO tools" for example.com in US English.
(agent submits once, stores request_id)
User: Summarize the demand signals again more briefly.
(agent calls get on the same request_id only; no new submit)
```

Single-market research (first time):

```text
Use $research-seo-signals to research "AI SEO tools" for example.com in the US English market.
```

Localized research:

```text
Use $research-seo-signals to research "herramientas SEO con IA" for example.com in the US Spanish market and answer in Spanish.
```

Evidence-focused follow-up (must reuse prior terminal job when available):

```text
Use $research-seo-signals to summarize only the strongest supported demand and intent observations, including counter-evidence and limitations.
```

Single-family request:

```text
Use $research-seo-signals to fetch only the organic SERP data for "AI SEO tools" for example.com in the US English market.
```

Ambiguous request (confirm before calling):

```text
User: 帮我查一下关键词“AI SEO 工具”。
Agent: 你具体需要哪类底层数据：搜索量/CPC/竞争度与意图、相关关键词、当前 SERP，还是 Google Trends 趋势？可以选一项或多项。我会只请求你需要的数据。
```

Combined request:

```text
Use $research-seo-signals to research only SERP patterns and Google Trends for "AI SEO tools" for example.com in the US English market.
```

Explicit refresh:

```text
Use $research-seo-signals to refresh the SERP data for "AI SEO tools" for example.com in the US English market.
```

## Reference

Read [references/mcp-contract.md](references/mcp-contract.md) before the first live call, when interpreting terminal envelopes, or when diagnosing tool and request-state errors.
