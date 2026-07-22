# Daily Growth Signals MCP Contract








## Tool: `submit_keyword_research_signals`

Submit one asynchronous keyword-research request.

Inputs:

- `keyword` — required seed query, 1–200 characters.
- `domain` — required hostname without scheme or path.
- `market` — required ISO 3166-1 alpha-2 country code.
- `language` — required research-language code; it scopes provider data and does not select the user-facing response language.
- `idempotency_key` — optional stable retry key.

Expected response fields:

- `request_id` — stable request identifier used for every poll.
- `status` — one of `pending`, `running`, `complete`, `partial`, or `failed`.
- `is_terminal` — whether polling must stop.
- `outcome` — `accepted` for a successful submission.
- `poll_after_seconds` — suggested minimum delay before polling.
- `result_path` — REST-compatible result path for diagnostics.
- `execution_deadline_at` — server-side execution deadline when available.

Store the full ticket. Reusing the same idempotency key for the same logical request prevents accidental duplicate work. Do not reuse one key across different keywords, domains, markets, or languages.

## Tool: `get_keyword_research_signals`

Retrieve the current state and terminal result.

Input:

- `request_id` — the exact identifier returned by the submit tool.

Expected response fields:

- `request_id` — must match the submitted request.
- `status` — current asynchronous state.
- `is_terminal` — primary polling stop signal.
- `poll_after_seconds` — next suggested polling delay.
- `execution_deadline_at` — execution deadline when available.
- `error` — stable `code` and human-readable `message` for terminal failure.
- `result` — complete public result for `complete` or `partial` outcomes.

`result` can be absent while the request is not terminal. Polling a non-terminal request is not an error.

## Terminal Result

A result can include:

- normalized query fields;
- `keyword_overview`, including keyword metrics, properties, SERP summary, backlink summary, optional clickstream data, and embedded `search_intent_info`;
- all related keywords;
- all DataForSEO SERP observations and traceability links;
- all Google Trends time, geography, and related-query evidence;
- all X Recent Search posts and metrics;
- evidence-linked synthesized signals;
- limitations;
- usage and cache metadata.

Optional evidence nodes may be absent. A `partial` result remains usable only for the nodes that succeeded.
Preserve every relevant returned item when presenting the result. A summary or top-N preview is additive and must not replace the complete data unless the user explicitly requests a subset.

## Polling Algorithm

```text
ticket = submit(...)
request_id = ticket.request_id
state = ticket

while state.is_terminal is false:
    wait(state.poll_after_seconds when present)
    state = get(request_id)

if state.status is complete or partial:
    validate and interpret state.result
else:
    report state.error
```

Do not call submit inside the polling loop.

## Consistency Checks

- The terminal `request_id` must equal the submitted `request_id`.
- The terminal query must match the requested keyword, domain, market, and language.
- Every signal reference must point to an evidence item present in the same result.
- Limitations must be read before describing coverage as complete.
- Machine codes and identifiers must remain unchanged when translating the user-facing answer.

## Common Failures

- Unsupported market-language pair: preserve and report the normalized pair; do not substitute another market.
- Request not found: verify the request identifier and workspace context.



- Client polling timeout: preserve `request_id` so polling can resume without resubmitting.
