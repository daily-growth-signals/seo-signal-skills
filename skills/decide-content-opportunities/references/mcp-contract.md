# Decision MCP Functional Contract

The Decision MCP is separate from the SEO research MCP. It reuses the
backend's published keyword Workflow, evidence mapper, billing, audit, and
snapshots, but always enables the decision Skill/LLM path.

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

The ticket includes `request_id`, `status`, `is_terminal`,
`poll_after_seconds`, `result_path`, and optionally `execution_deadline_at`.
Store it and poll; do not submit again while the job is pending or running.

## Tool: `get_keyword_decision_report`

Query the account-scoped job by `request_id`.

- `pending` / `running` — wait according to `poll_after_seconds` and query the
  same ID again.
- `complete` — terminal; validate query identity, evidence references,
  limitations, and non-null `result.decision_report`.
- `partial` — terminal and potentially usable, but disclose unavailable
  evidence and do not strengthen confidence.
- `failed` — terminal; report the stable error and do not fabricate a
  recommendation.

The expected report contains a stance, qualitative confidence, summary,
supporting and counter-evidence references, assumptions, conditions, risks,
recommended actions with expected signals and stop conditions, missing
decision inputs, and `decision_owner="human"`.
