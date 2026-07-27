# Daily Growth Signals Social MCP Contract








## Tool: `search_x_posts`

Search the provider's X Recent Search window using one raw X API v2 expression.

Inputs:

- `query`: required raw query expression, 1–512 characters.
- `max_results`: page size from 10 to 100; default `50`.
- `next_token`: optional opaque token returned by the previous page.
- `sort_order`: `recency` or `relevancy`; default `recency`.
- `start_time`: optional inclusive UTC start time.
- `end_time`: optional exclusive UTC end time later than `start_time`.
- `since_id`: optional lower Post ID boundary for newer posts.
- `until_id`: optional upper Post ID boundary for older posts.
- `idempotency_key`: optional stable key for safely retrying the same logical page.

The tool is synchronous. It does not use the SEO submit/get polling contract, `request_id`, SEO `data_scopes`, or SEO `domain`/`market`/`language` fields.

Expected result content includes normalized posts, authors, timestamps, languages, native public metrics, post URLs, provider errors, result metadata, and an optional `next_token`. Follow the live structured schema when exact field names differ.

## Query Semantics

- Pass `query` exactly as X should evaluate it.
- X search is literal and ranking-dependent, not exhaustive semantic retrieval.
- Use focused phrase, spelling, language, problem, and use-case variants when they materially improve recall.
- Native operators such as `OR`, `-is:retweet`, and `lang:` may be used when supported by the provider.
- Split an over-broad expression into focused calls and deduplicate by `post_id`.

## Pagination

Use the returned `next_token` unchanged with the same `query`, `max_results`, `sort_order`, `start_time`, `end_time`, `since_id`, and `until_id`. Do not decode, edit, combine, or reuse it for another search context. Stop after the first page unless the user requests broader coverage or the evidence is insufficient for the stated goal.

Reuse one `idempotency_key` only to retry the same logical page. Use a new key for the next page or whenever another search input changes.

## Search Boundaries

- Use `start_time` and `end_time` only when the research goal needs a defined UTC window.
- For a current-window search, normally omit `end_time` so X can use its latest searchable boundary and avoid index-delay or clock-skew errors.
- Keep explicit time boundaries stable across every page of one search.
- Use `since_id` and `until_id` only for known Post ID checkpoints. Do not treat them as timestamps or derive them from dates.
- When deciding whether an existing result can be reused, compare the query, sorting, boundaries, and page context rather than the query text alone.

## Evidence Boundary

- Returned posts are observations within the provider's recent-search window and ranking behavior.
- A result set is not a representative sample of X.
- Missing results do not prove absence.
- Preserve URLs and distinguish direct evidence from inference.
- Report the query expressions, sort order, effective time or Post ID boundaries, pagination depth, and provider errors that materially affect coverage.

## Common Failures

- Tool unavailable: report the missing live coverage without guessing at internal causes.

- Query validation failure: check length, expression syntax, and `max_results`.
- Time-boundary validation failure: check UTC values, ensure `end_time` is later than `start_time`, and omit `end_time` for a current-window search when the provider rejects a too-recent boundary.
- Retry conflict: preserve the original inputs for a same-page retry, or use a new key for a genuinely different page or search.

- Provider failure: preserve any partial returned evidence and disclose the unavailable coverage.
