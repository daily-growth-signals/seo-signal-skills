# Social Retrieval Functional Contract

Use this reference for exact tool boundaries, result fields, and continuation behavior. Use [parameter-guide.md](parameter-guide.md) when an input needs a plain-language explanation, format check, or acquisition method. These tools retrieve data for downstream use; they do not make analysis or business decisions.

## Tool: `get_wechat_account_articles`

Return one raw page of content for a WeChat Official Account.

Inputs:

- `username`: required WeChat Official Account original ID matching `gh_...`; this value is also commonly called `gh_name`, `gh_id`, `gh_username`, or 原始ID, and is not the visible account name.
- `page_size`: 10–20; default `20`.
- `offset`: opaque cursor returned as `next_offset`; empty for the first page.
- `item_show_type`: optional content tab: `0` articles, `5` videos, `7` audio, or `8` image-text posts.
- `idempotency_key`: optional stable key for safely retrying the same logical page.

The request always uses raw mode. Expected results include the account identifier, page context, `is_end`, `next_offset`, original article objects in `raw_data`, and zero or more normalized metric snapshots. A snapshot contains only useful numeric fields that were actually recognized: `read_count`, `like_count`, `comment_count`, `share_count`, and `watching_count`. Missing values remain null. Display prose is not repeated in the normalized metric object.

Use `next_offset` unchanged for the next page and stop when `is_end` is true. Do not decode or construct offsets. Do not equate reads with unique people, impressions, approval, or conversion. Preserve the returned raw objects when raw data is requested; otherwise expose only the fields needed by the caller instead of dumping the payload.

## Tool: `get_linkedin_user_posts`

Return one page of public activity associated with a LinkedIn member profile.

Inputs:

- `profile_url`: required HTTPS LinkedIn member URL under `/in/`.
- `activity_type`: `posts`, `comments`, or `reactions`; default `posts`.
- `start`: non-negative page offset; default `0`.
- `pagination_token`: optional opaque token returned by the previous page.
- `idempotency_key`: optional stable key for safely retrying the same logical page.

Expected results include the profile URL, activity type, page context, source objects, and available normalized fields such as post ID, URL, text, publication time, in-network impressions, out-of-network impressions, likes, comments, and reposts. Missing metrics remain null and must not be converted to zero.

Preserve both pagination inputs required by the live schema. Do not use a company page, search URL, or arbitrary LinkedIn URL in place of a member profile. Treat impressions and engagement as platform-native observations, not proof of sentiment, quality, or conversion.

## Tool: `get_xiaohongshu_user_notes`

Return one page of notes posted by a specific Xiaohongshu creator.

Inputs:

- `user_id`: preferred creator identifier when known.
- `share_text`: Xiaohongshu share link or text when `user_id` is unavailable.
- `cursor`: opaque cursor returned by the previous page; empty for the first page.
- `idempotency_key`: optional stable key for safely retrying the same logical page.

At least one creator identity input is required; `user_id` takes precedence when both are supplied. Expected results include identity context, `cursor`, `next_cursor`, `has_more`, capture time, result count, and normalized notes with source URLs and native public metrics.

Pass `next_cursor` unchanged for another page and stop when `has_more` is false. Do not substitute `search_xiaohongshu_notes` when the task is creator-history research, and do not invent a user ID or cursor from a profile nickname.

## Tool: `search_zhihu_articles`

Search public Zhihu content while preserving every supplied search value exactly.

Inputs:

- `keyword`: required raw keyword; do not trim, translate, normalize, or rewrite it.
- `offset` and `limit`: string pagination values; defaults are `"0"` and `"20"`. Preserve leading zeros.
- `show_all_topics`: `0` or `1`; default `0`.
- `search_source`: `Normal` or `Filter`; default `Normal`.
- `search_hash_id`: optional continuation identifier; default empty string.
- `vertical`: empty string, `answer`, `article`, or `zvideo`; default empty string.
- `sort`: empty string, `upvoted_count`, or `created_time`; default empty string.
- `time_interval`: empty string, `a_day`, `a_week`, `a_month`, `three_months`, `half_a_year`, or `a_year`; default empty string.
- `vertical_info`: opaque source value; default empty string.
- `idempotency_key`: optional stable key for safely retrying the same logical page.

Expected results retain the complete parameter object plus capture time, result count, and normalized items with stable content ID/type, URL, title, excerpt, author, creation/update time, and native vote/comment counts when returned. Text fields are cleaned to visible core text: HTML tags and non-visible script/style noise are removed, entities are decoded, and redundant whitespace is collapsed. Do not infer that the result is article-only unless `vertical="article"` was supplied. Use a new idempotency key when any parameter changes, and never invent continuation values.

## Tool: `search_reddit_posts`

Search public Reddit posts through the standalone `reddit-posts-search` social Workflow. Use it for community research, user wording, pain points, questions, and feedback; it is not part of SEO keyword research.

Inputs:

- `query`: required focused search query, 1–512 characters.
- `idempotency_key`: optional stable key for safely retrying the same logical search.

Expected result content includes the query, `result_count`, and normalized posts with stable `post_id`, title, URL, subreddit, creation time, author when public, body when returned, language, and native score/comment/upvote metrics where available. Follow the live structured schema when exact field names differ.

The current public tool exposes no sort, time-range, safe-search, or pagination parameter. Do not claim a time window, a ranking mode, exhaustive coverage, or platform-wide prevalence from its result. Do not pass X query operators, X date syntax, X Post IDs, or X `next_token` values to this tool. Do not fall back to X on failure unless the user explicitly requested cross-platform research.

## Tool: `search_xiaohongshu_notes`

Search public Xiaohongshu notes through the standalone `xiaohongshu-notes-search` social Workflow. Use it for public note research, creator wording, Chinese lifestyle or consumer discussion, and returned image evidence; it is not part of SEO keyword research.

Inputs:

- `query`: required search query, 1–256 characters.
- `page`: one-based page number; default `1`.
- `sort_type`: `general`, `time_descending`, `popularity_descending`, `comment_descending`, `collect_descending`, or `english_preferred`; default `general`.
- `note_type`: `不限`, `视频笔记`, `普通笔记`, or `直播笔记`; default `不限`.
- `time_filter`: `不限`, `一天内`, `一周内`, or `半年内`; default `不限`.
- `search_id` and `search_session_id`: optional identifiers returned by a previous page; never invent them.
- `idempotency_key`: optional stable key for safely retrying the same logical page.

Expected result content includes `query`, `page`, `captured_at`, `result_count`, optional continuation identifiers, and normalized notes. Each note retains `note_id`, URL, note type, title, description, author, publication time, native like/collect/comment/share counts, and its complete ordered image list with cover markers and source URLs where returned. Follow the live structured schema when exact field names differ.

Use a new `idempotency_key` for a different page or any changed filter. Do not auto-paginate. Do not infer image content from an image URL alone, claim that returned source images are archived, or conflate collect, like, comment, and share counts.

## Tool: `get_x_trends`

Return current X trending topics for one country using Trends by WOEID.

Inputs:

- `country_name`: optional canonical English country name supported by X. Omit it to use worldwide WOEID `1`.
- `max_trends`: number of trends from 1 to 50; default `20`.

Expected result content includes the resolved `woeid`, `captured_at`, trend `items`, native `post_count` where X provides it, and safe provider `errors`.

Convert a localized user country name to the canonical English name before calling the tool. Do not pass an ISO code, WOEID, or city name. If the tool rejects the country, preserve the user's original wording and return `unsupported country name: <original user input>` without guessing or falling back to worldwide. Do not interpret the result as personalized trends, a representative opinion sample, or evidence that an unlisted topic is absent.

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
