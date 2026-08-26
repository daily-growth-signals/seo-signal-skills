# SEO Research Functional Contract

## Tool: `submit_keyword_research_signals`

Submit one asynchronous keyword-research request.

Inputs:

- `keyword` — required seed query, 1–200 characters.
- `domain` — required hostname without scheme or path.
- `market` — required ISO 3166-1 alpha-2 country code.
- `language` — required research-language code; it scopes the returned research data and does not select the user-facing response language.
- `search_engine` — optional SERP engine selector, `google` or `bing`; defaults to `google`. Use `bing` only when the user explicitly requests Bing/必应 data.
- `data_scopes` — optional non-empty combination of `keyword_overview`, `related_keywords`, `serp`, and `google_trends`; omission selects all SEO families. Use the separate Social MCP for X evidence.
- `idempotency_key` — strongly recommended stable retry key for the logical research identity.

Expected response fields:

- `request_id` — stable request identifier used for every poll and later reuse.
- `status` — one of `pending`, `running`, `complete`, `partial`, or `failed`.
- `is_terminal` — whether polling must stop.
- `outcome` — `accepted` for a successful submission.
- `poll_after_seconds` — suggested minimum delay before polling.
- `result_path` — REST-compatible result path for diagnostics.
- `execution_deadline_at` — execution deadline when available.

Store the full ticket in the conversation/session ledger. Reusing the same idempotency key for the same logical request prevents accidental duplicate work and can return an existing terminal result. Do not reuse one key across different keywords, domains, markets, languages, or scope sets.

Use this tool with the smallest sufficient `data_scopes` combination whenever the task needs two or more families. Omit `data_scopes` only when every supported family is required.

The shared `/data/seo/mcp` endpoint is a transport entry point, not an instruction to retrieve every SEO family. A generic keyword request does not establish a scope. Confirm the user's required data family before submitting when their goal does not clearly map to one or more scopes. Do not call this tool while scope is ambiguous, and never omit `data_scopes` merely because the endpoint combines the tools.

## Tool: `submit_specific_seo_data`

Submit one asynchronous request that executes only the selected data Capability.

Inputs:

- `data_scope` — required; one of `keyword_overview`, `related_keywords`, `serp`, or `google_trends`.
- `keyword`, `domain`, `market`, `language` — same validation rules as the aggregate submit tool.
- `search_engine` — optional SERP engine selector, same rules as the aggregate submit tool.
- `idempotency_key` — strongly recommended; do not reuse one key across different scopes.

The ticket fields and polling behavior are identical to `submit_keyword_research_signals`. Its functional behavior is equivalent to `submit_keyword_research_signals(data_scopes=[data_scope])`. The terminal result contains only the selected data family and its derived evidence/signals. Other intentionally unrequested families can be null or empty and are not limitations.

Prefer this tool whenever one data family fully answers the request.

## Tool: `submit_competitor_analysis`

Use for competitor analysis of a keyword and target domain. Inputs are `keyword`, `domain`, `market`, `language`, and optional `idempotency_key`. The service internally collects competitor domains, SERP competitors, keywords for the site, and domain-rank context. Poll with `get_keyword_research_signals` using the returned `request_id`.

The terminal result exposes the public `competitor_analysis` section, shared `evidence`, `signals`, `limitations`, `usage`, and `field_semantics`. Treat each returned subsection as observed data; do not assume that every subsection has non-empty rows.

## Tool: `submit_geo_analysis`

Use for GEO/AI-search visibility analysis. Inputs are `keyword`, `domain`, `market`, `language`, and optional `idempotency_key`. The service internally collects search-volume context, Google AI-mode observations, LLM target metrics, and top-mentioned pages. Do not pass provider endpoint details.

The terminal result exposes the public `geo_analysis` section and shared `analysis_coverage`, `evidence`, `signals`, `limitations`, `usage`, and `field_semantics`. An empty LLM mentions subsection is valid coverage; do not convert it into a claim that the target has no visibility without checking returned counts and limitations.

## Tool: `submit_backlink_analysis`

Use for website backlink analysis. Inputs are `keyword`, `domain`, `market`, `language`, and optional `idempotency_key`. The service internally collects backlinks and referring domains. Poll with the same get tool and interpret the returned `backlink_analysis` plus `field_semantics`.

The terminal result contains the public backlink/referring-domain subsections, shared `evidence`, `signals`, `limitations`, `usage`, and `field_semantics`. Report sample counts and total counts separately; do not treat a capped sample as the complete backlink inventory.

Plain-language scope mapping:

- keyword metrics, CPC, competition, properties, or intent: `keyword_overview`
- related, expanded, or long-tail queries: `related_keywords`
- rankings, organic results, SERP features, or target-domain presence: `serp`
- interest over time, geography, top queries, or rising queries: `google_trends`
- competitor domains, organic competitors, site keywords, or domain-rank context:
  `submit_competitor_analysis`
- AI Mode/AI Overview, LLM mentions, or AI-search visibility:
  `submit_geo_analysis`
- backlinks or referring domains: `submit_backlink_analysis`

For SERP requests, infer the engine from the user's wording and pass `search_engine="bing"` for Bing/必应; otherwise preserve the Google default. The MCP function does not require DataForSEO endpoint details or low-level search settings.

When the user only says to “look up” or “research” a keyword, ask which of these data families they need before making a paid/live request. When their wording already identifies the family, submit directly without an unnecessary confirmation.

## Tool: `get_keyword_research_signals`

Retrieve the current state and terminal result for any SEO submit tool.

Input:

- `request_id` — the exact identifier returned by the submit tool or stored from an earlier turn.

Expected response fields:

- `request_id` — must match the submitted request.
- `status` — current asynchronous state.
- `is_terminal` — primary polling stop signal.
- `poll_after_seconds` — next suggested polling delay.
- `execution_deadline_at` — execution deadline when available.
- `error` — stable `code` and human-readable `message` for terminal failure.
- `result` — complete public result for `complete` or `partial` outcomes.

`result` can be absent while the request is not terminal. Polling a non-terminal request is not an error.

Use `get` as the primary way to reuse historical jobs in the same conversation. Prefer `get(request_id)` over a new submit whenever the logical research identity already has a known `request_id`.

## Reuse And Idempotency

```text
if known request_id for same logical identity:
    state = get(request_id)
    if complete/partial and no refresh requested:
        answer from state.result
    if pending/running:
        keep polling request_id only
    if failed and retry requested:
        submit again with the SAME idempotency_key
else:
    submit once with stable idempotency_key
    poll get(request_id)
```

Expected reuse behavior for the same logical request:

- `complete` / `partial`: reuse the existing terminal result unless a refresh is requested.
- `pending` / `running`: keep polling the existing ticket; do not open a second job.
- `failed`: use the same key and inputs for a requested retry.

Never mint a new `idempotency_key` for an identical keyword/domain/market/language/scopes retry.

## Terminal Result

A result can include:

- normalized query fields;
- `keyword_overview`, including keyword metrics, properties, SERP summary, backlink summary, optional clickstream data, and embedded `search_intent_info`;
- all related keywords;
- all DataForSEO SERP observations and traceability links;
- all Google Trends time, geography, and related-query evidence;
- `competitor_analysis` for a competitor-analysis job;
- `geo_analysis` and its `analysis_coverage` for a GEO-analysis job;
- `backlink_analysis` for a backlink-analysis job;
- `field_semantics`, containing the live units, meanings, and caveats for result
  fields present in this response;
- evidence-linked synthesized signals;
- limitations;
- usage metadata, including whether an existing result was reused when that field is returned.

Optional evidence nodes may be absent. A `partial` result remains usable only for the nodes that succeeded.
Default agent answers should be concise. A summary or top-N view is the default; full-array export is only required when the user explicitly asks for complete data.

Read `result.field_semantics` before interpreting raw or normalized fields.

## Polling Algorithm

```text
if known_request_id:
    state = get(known_request_id)
else:
    ticket = selected_submit_tool(..., idempotency_key=stable_key)
    request_id = ticket.request_id
    state = ticket

while state.is_terminal is false:
    wait(state.poll_after_seconds when present)
    state = get(request_id)

if state.status is complete or partial:
    validate and interpret state.result
else:
    report state.error
    # optional retry: submit with the same idempotency_key only
```

Do not call submit inside the polling loop.

## Consistency Checks

- The terminal `request_id` must equal the submitted or reused `request_id`.
- The terminal query must match the requested keyword, domain, market, and language.
- Every signal reference you cite must point to an evidence item present in the same result.
- Limitations must be read before describing coverage as complete.
- Matching `field_semantics` entries must be applied before reporting units,
  meanings, or time ranges.
- Machine codes and identifiers must remain unchanged when translating the user-facing answer.

## Common Failures

- Unsupported market-language pair: preserve and report the normalized pair; do not substitute another market.
- Request not found: verify the original request identifier before deciding whether a new submit is necessary.
- Tool unavailable: report the missing live coverage without guessing at internal causes.
- Client polling timeout: preserve `request_id` so polling can resume without resubmitting.
- Need retry after failed terminal job: resubmit with the same `idempotency_key` for that logical identity.
