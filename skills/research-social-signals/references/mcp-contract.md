# Social Search Functional Contract

## Tool: `get_x_trends`

Return current X trending topics for one geographic location using Trends by WOEID.

Inputs:

- `location`: optional positive integer WOEID, numeric string, ISO country code, or supported place name. Omit it to use worldwide WOEID `1`.
- `country_code`: optional ISO 3166-1 alpha-2 code used to disambiguate duplicate place names.
- `max_trends`: number of trends from 1 to 50; default `20`.

Expected result content includes the resolved `woeid`, `captured_at`, trend `items`, native `post_count` where X provides it, and safe provider `errors`.

Use the tool once for the requested location. Do not interpret the result as personalized trends, a representative opinion sample, or evidence that an unlisted topic is absent. If a place name is ambiguous, add `country_code`; do not guess the country.

## Tool: `search_x_posts`

Search the X Recent Search window using one raw X API v2 expression. Recent Search currently retrieves matching Posts from the previous seven days; always treat the live tool boundary as authoritative if X changes that window.

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

The tool returns one result page synchronously.

Expected result content includes normalized posts, authors, timestamps, languages, native public metrics, post URLs, provider errors, result metadata, and an optional `next_token`. Follow the live structured schema when exact field names differ.

## Query Semantics

- Pass `query` exactly as X should evaluate it.
- X search is literal and ranking-dependent, not exhaustive semantic retrieval.
- Use focused phrase, spelling, language, problem, and use-case variants when they materially improve recall.
- Native operators such as `OR`, `-is:retweet`, and `lang:` may be used when supported by the provider.
- Split an over-broad expression into focused calls and deduplicate by `post_id`.

## Common X Query Operators

`search_x_posts` passes one raw X API v2 query expression to Recent Search. The following table covers the common operators used by this Skill; it is not an exhaustive catalog. Consult the [official X Search operator reference](https://docs.x.com/x-api/posts/search/integrate/operators) when the task needs another operator, and verify access-level availability through the live provider.

| Goal | API expression | Example | Notes |
| --- | --- | --- | --- |
| Require all words | space (AND) | `English learning methods` | Each token must match; there is no explicit `AND` keyword. |
| Match an exact phrase | `"exact phrase"` | `"English learning methods"` | Matches the phrase in the Post body. |
| Match either expression | `OR` | `English OR learning` | `OR` must be uppercase. Use parentheses when combining groups. |
| Group expressions | `()` | `(English OR learning) methods` | Makes mixed AND/OR precedence explicit. Do not negate a parenthesized group; negate each expression separately. |
| Exclude a word or operator | `-` | `English -grammar` | Negation cannot be the only expression. |
| Match a hashtag | `#hashtag` | `#AI` | Exact hashtag match. |
| Restrict language | `lang:code` | `AI lang:en` | Requires another standalone expression. Use an X-supported language code; Chinese uses `zh-CN` or `zh-TW`, not the web shorthand `zh`. |
| Posts from an account | `from:username` | `from:elonmusk` | Matches Posts authored by that username. |
| Replies to an account | `to:username` | `to:elonmusk` | Matches Posts replying to that username. |
| Mentions of an account | `@username` | `@elonmusk` | Matches Posts that mention the username. |
| Exclude replies | `-is:reply` | `AI -is:reply` | Requires a standalone expression. This alone does not exclude Retweets. |
| Exclude Retweets | `-is:retweet` | `AI -is:retweet` | Requires a standalone expression. |
| Require links | `has:links` | `AI has:links` | Requires a standalone expression. |
| Require images | `has:images` | `AI has:images` | Requires a standalone expression. |
| Require native X video | `has:video_link` | `AI has:video_link` | Requires a standalone expression. |
| Require any media | `has:media` | `AI has:media` | Matches photos, GIFs, or video and requires a standalone expression. |

Do not copy X web-search date text into `query`. For this API:

- Map `since:YYYY-MM-DD` to the inclusive `start_time` input.
- Map `until:YYYY-MM-DD` to the exclusive `end_time` input.
- For minute- or second-level boundaries, pass an ISO 8601 UTC value such as `2025-10-01T00:00:00Z`; do not use web forms such as `since:2025-10-01_00:00:00_UTC`.
- Keep `end_time` later than `start_time`. For a current-window search, normally omit `end_time`.

Conjunction-required filters such as `lang:`, `is:`, and `has:` cannot form a valid query by themselves. Pair them with a standalone keyword, phrase, hashtag, mention, `from:`, or `to:` expression. The X API may gate some operators by access level; treat a provider rejection as an availability boundary instead of rewriting the user's intent silently.

## Provider Compatibility Checks

The following engagement filters were checked against X Recent Search on 2026-07-28. Each probe used the standalone keyword `AI`, `-is:retweet`, `sort_order=recency`, and `max_results=10`.

| Operator | Probe | Observed result |
| --- | --- | --- |
| `min_replies:N` | `AI min_replies:1 -is:retweet` and `AI min_replies:2 -is:retweet` | Accepted. Both probes returned ten Posts, and every returned `reply_count` met its requested threshold. |
| `min_faves:N` | `AI min_faves:1 -is:retweet` | Rejected with HTTP 400: invalid `query`. |
| `min_retweets:N` | `AI min_retweets:1 -is:retweet` | Rejected with HTTP 400: invalid `query`. |

`min_replies:N` is absent from the current public X Search operator reference despite the successful threshold checks. Treat all three rows as dated compatibility observations, not stable official guarantees. Recheck them when the API access tier or X behavior changes.

## Pagination

Use the returned `next_token` unchanged with the same `query`, `max_results`, `sort_order`, `start_time`, `end_time`, `since_id`, and `until_id`. Do not decode, edit, combine, or reuse it for another search context. Stop after the first page unless the user requests broader coverage or the evidence is insufficient for the stated goal.

Reuse one `idempotency_key` only to retry the same logical page. Use a new key for the next page or whenever another search input changes.

## Search Boundaries

- X Recent Search currently covers only the previous seven days; a wider requested period cannot be satisfied by this endpoint.
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
