# Decision MCP Functional Contract

The Decision MCP produces conditional keyword decisions. Use it when the
caller needs a decision rather than SEO data retrieval alone.

## Tool: `submit_keyword_decision_report`

Submit one asynchronous conditional keyword-decision report.

Inputs:

- `keyword` — required seed query, 1–200 characters.
- `domain` — required hostname without scheme or path.
- `market` — required ISO 3166-1 alpha-2 country code.
- `language` — required research and report language code.
- `data_scopes` — optional non-empty combination of `keyword_overview`,
  `related_keywords`, `serp`, and `google_trends`; choose the smallest evidence
  set that can support the decision.
- `idempotency_key` — stable retry key for the logical decision identity.

`search_engine` is **not** a public input of this tool. When `data_scopes`
includes `serp`, the report uses the service default Google evidence. Do not
pass `search_engine`, and never represent the result as a Bing comparison.
Bing or social data supplied by the caller from another source is supplemental
context and is not evidence consumed by this Decision MCP job.

The ticket includes `request_id`, `status`, `is_terminal`,
`poll_after_seconds`, `result_path`, and optionally `execution_deadline_at`.
Store it and poll; do not submit again while the job is pending or running.

## Tool: `get_keyword_decision_report`

Query the account-scoped job by `request_id`.

- `pending` / `running` — wait according to `poll_after_seconds` and query the
  same ID again.
- `complete` — terminal; validate query identity, evidence references,
  limitations, and use `result.decision_report` when present.
- `partial` — terminal and usable for remaining evidence. Treat
  `signaldig_no_matching_data` as a data gap, not an outage. Analyze whatever
  families succeeded; do not resubmit because one family was empty. Prefer
  `result.decision_report` when present, otherwise decide from remaining
  evidence with lower confidence.
- `failed` — terminal service or execution failure; report the stable error
  and do not fabricate a recommendation. Empty-result codes belong on
  `partial`, not here.

The expected report contains a stance, qualitative confidence, summary,
supporting and counter-evidence references, assumptions, conditions, risks,
recommended actions with expected signals and stop conditions, missing
decision inputs, and `decision_owner="human"`.
