# Daily Growth Signals Social MCP Contract








## Tool: `search_x_posts`

Search the provider's X Recent Search window using one raw X API v2 expression.

Inputs:

- `query`: required raw query expression, 1–512 characters.
- `max_results`: page size from 10 to 100; default `50`.
- `next_token`: optional opaque token returned by the previous page.
- `sort_order`: `recency` or `relevancy`; default `recency`.

The tool is synchronous. It does not use the SEO submit/get polling contract, `request_id`, SEO `data_scopes`, or SEO `domain`/`market`/`language` fields.

Expected result content includes normalized posts, authors, timestamps, languages, native public metrics, post URLs, provider errors, result metadata, and an optional `next_token`. Follow the live structured schema when exact field names differ.

## Query Semantics

- Pass `query` exactly as X should evaluate it.
- X search is literal and ranking-dependent, not exhaustive semantic retrieval.
- Use focused phrase, spelling, language, problem, and use-case variants when they materially improve recall.
- Native operators such as `OR`, `-is:retweet`, and `lang:` may be used when supported by the provider.
- Split an over-broad expression into focused calls and deduplicate by `post_id`.

## Pagination

Use the returned `next_token` unchanged with the same query and sort order. Do not decode, edit, combine, or reuse it for another query. Stop after the first page unless the user requests broader coverage or the evidence is insufficient for the stated goal.

## Evidence Boundary

- Returned posts are observations within the provider's recent-search window and ranking behavior.
- A result set is not a representative sample of X.
- Missing results do not prove absence.
- Preserve URLs and distinguish direct evidence from inference.
- Report the query expressions, sort order, pagination depth, and provider errors that materially affect coverage.

## Common Failures

- Tool unavailable: report the missing live coverage without guessing at internal causes.

- Query validation failure: check length, expression syntax, and `max_results`.

- Provider failure: preserve any partial returned evidence and disclose the unavailable coverage.
