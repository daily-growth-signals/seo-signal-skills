---
name: research-seo-signals
description: Research evidence-backed SEO demand signals for a keyword, domain, market, and language through the Daily Growth Signals MCP server. Use when an AI agent needs demand metrics, intent, search-result observations, trend and audience evidence, limitations, or a concise opportunity brief grounded in traceable data.
---

# Research SEO Signals

Use the Daily Growth Signals MCP tools to collect evidence. Interpret the returned data, but do not invent missing facts or let the tool make the final SEO decision.

## Required inputs

Collect these values before submitting research:

- `keyword`: seed query to investigate.
- `domain`: target domain without a path.
- `market`: ISO market code such as `US`.
- `language`: language code such as `en`.
- `idempotency_key`: optional stable key when the caller may retry the same submission.

Ask only for missing values that cannot be safely inferred from the user's request.

## Workflow

1. Call `submit_keyword_research_signals` once with the four required inputs.
2. Preserve the returned `request_id` and polling guidance.
3. Call `get_keyword_research_signals` using that `request_id` at the suggested interval.
4. Treat `pending` and `running` as normal asynchronous states. Continue polling without resubmitting.
5. Stop at a terminal state. Read `result`, `evidence`, `signals`, `limitations`, and `usage` together.
6. Answer with observations first, evidence second, and an explicit uncertainty note when limitations exist.

## Interpretation rules

- Distinguish provider facts from your inference.
- Cite or identify the evidence items that support each important observation.
- Treat partial results as usable only for the nodes that succeeded.
- Surface unavailable evidence, source restrictions, stale timestamps, or incomplete nodes from `limitations`.
- Do not claim that a keyword is definitively worth targeting. State the measurable demand, competition context, intent, SERP shape, and social evidence so the caller can decide.
- Do not fetch or summarize SERP page bodies; the service returns result links and structured observations only.


## Response shape

Keep the final response compact unless the user asks for detail:

1. `Summary`: 2–4 evidence-grounded observations.
2. `Demand and intent`: demand metrics, trend direction, and search intent.
3. `Evidence`: the strongest corroborating or conflicting evidence.
4. `Limitations`: partial nodes, unavailable fields, and uncertainty.
5. `Next steps`: one or two optional investigations, not an automatic SEO decision.

Read [references/mcp-contract.md](references/mcp-contract.md) when handling request states or diagnosing tool errors.
