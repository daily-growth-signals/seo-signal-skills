---
name: research-social-signals
description: Research traceable public Reddit posts, X conversations and trends, Xiaohongshu notes, Zhihu content, LinkedIn member activity, and WeChat Official Account articles through the Daily Growth Signals Social MCP. Use for social listening, creator or account research, audience language, pain points, engagement evidence, high-performing content review, campaign research, and cross-platform comparison. Choose the platform-specific tool and preserve its native pagination and metric meanings. Do not use this Skill for SEO metrics, keyword research, private account data, or social evidence already present in the conversation.
---

# Research Social Signals

Turn a social-research goal into focused platform-specific retrievals, retrieve only the evidence needed, and report observations separately from interpretation. The Social MCP has eight tools covering X, Reddit, Xiaohongshu, Zhihu, LinkedIn, and WeChat Official Accounts. Treat returned content as bounded public observations, not a representative census of any platform.

## Execution Contract

- Use `search_x_posts` for query-bounded recent X conversations.
- Use `search_reddit_posts` for query-bounded public Reddit community posts.
- Use `search_xiaohongshu_notes` for query-bounded public Xiaohongshu notes and their returned image evidence.
- Use `get_xiaohongshu_user_notes` for one creator's public notes by `user_id` or a Xiaohongshu share link.
- Use `search_zhihu_articles` for query-bounded public Zhihu articles or another explicitly selected Zhihu vertical.
- Use `get_linkedin_user_posts` for a LinkedIn member's posts, commented posts, or reacted posts by profile URL.
- Use `get_wechat_account_articles` for one raw page of WeChat Official Account content and parsed public engagement metrics.
- Use `get_x_trends` for current X trending topics in a country; omit `country_name` for worldwide trends.
- Treat the live MCP schema and returned fields as the source of truth.
- Reuse results already present in the conversation before running the same query again.
- Preserve the exact query or account identifier, platform, source URLs, timestamps, languages when returned, and native public metrics. For X, also preserve `sort_order`, time or Post ID boundaries, and pagination context; for Xiaohongshu, preserve `note_id` and the applicable page or cursor context; for Zhihu, preserve every user-supplied search parameter exactly; for LinkedIn and WeChat, keep the returned metric meanings and opaque pagination values unchanged.
- Reuse an `idempotency_key` only when safely retrying the same logical page. Use a new key when requesting another page or changing any search input.
- Read [references/mcp-contract.md](references/mcp-contract.md) before the first live call or when diagnosing a tool error.
- If this Skill conflicts with the live tool schema, follow the live schema.

## Hard Rules

1. Never claim semantic, exhaustive, representative, or platform-wide coverage.
2. Never invent posts, authors, metrics, URLs, timestamps, languages, or provider availability.
3. Never treat missing matches as proof that a need, complaint, or trend does not exist.
4. Never convert engagement counts into sentiment, demand, market size, or purchase intent without explicit supporting evidence.
5. Never merge different authors or posts merely because their text is similar.
6. Deduplicate overlapping results within the same platform by stable `post_id` or `note_id`; preserve which queries found the result when useful.
7. Do not repeat an identical live query merely to rephrase or summarize its existing result.
8. Do not paginate automatically unless the user requests broader coverage or the first page is insufficient for the stated research goal.
9. Do not use SEO-only inputs such as domain, market, or keyword-volume assumptions unless the user separately asks for SEO research. Reddit is a social-data Workflow, not a keyword-research scope.
10. Keep the default answer concise. Do not dump every returned post or note unless the user asks for a full export.
11. Separate observed evidence, synthesis, and limitations in every answer.
12. Do not make the user's final marketing decision or automatically post, contact users, allocate budget, or launch a campaign.
13. Do not describe a regional trends response as personalized trends or as proof of broader public opinion.
14. Do not compare unlike metrics as if they were equivalent. A read, impression, like, comment, repost, share, collect, and watching count each has a distinct platform meaning.
15. When raw source objects are returned, extract only fields useful to the user's question by default; do not dump raw payloads unless the user explicitly requests them.

## Tool Selection

- Choose `get_x_trends` when the user asks what is currently trending or hot on X without supplying a search topic.
- Choose `search_x_posts` when the user supplies a topic, product, query, audience question, or discussion-research goal.
- Choose `search_reddit_posts` when the user needs public Reddit community posts, subreddit context, user wording, questions, or feedback about a topic.
- Choose `search_xiaohongshu_notes` when the user needs public Xiaohongshu notes, Chinese lifestyle or consumer discussion, creator phrasing, or returned image evidence.
- Choose `get_xiaohongshu_user_notes` when the user supplies a creator identity or share link and needs that creator's posted notes rather than keyword search results.
- Choose `search_zhihu_articles` when the user needs public Zhihu long-form content, author wording, questions/answers via an explicit vertical, or native vote/comment evidence.
- Choose `get_linkedin_user_posts` when the user supplies a LinkedIn member profile and needs posts, commented posts, reacted posts, or available impression and engagement evidence.
- Choose `get_wechat_account_articles` when the user supplies a WeChat Official Account `gh_username` and needs raw article objects, parsed read/like/comment/share/watching counts, or account-history pagination.
- Use both only when the user needs the current regional trend list and supporting recent conversations about selected trends.
- Use multiple platform tools only when the user requests cross-platform coverage or the answer needs explicitly labelled platform comparison. Do not silently treat one platform as a substitute for another.
- For `get_x_trends`, convert the user's country name from any language into the canonical English country name used by X, then pass it as `country_name`. Do not convert it to an ISO code or WOEID. If the user provides no country, omit `country_name` so the tool uses worldwide WOEID `1`.
- Preserve the user's original country wording. If the tool rejects the converted name, return `unsupported country name: <original user input>` and do not substitute another country.

## Query Planning

X search is primarily literal. Expand only along dimensions relevant to the user's goal:

- exact product, brand, competitor, or category terms;
- common abbreviations, spelling variants, and languages;
- problem statements and question forms;
- desired outcomes and use-case phrases;
- useful native operators such as `-is:retweet` and `lang:`.

Prefer several focused expressions over one over-broad expression. Keep each query within the live tool limit and avoid unrelated OR terms that make the evidence hard to interpret.
Use the operator table and API-specific time guidance in [references/mcp-contract.md](references/mcp-contract.md#common-x-query-operators). In particular, express time windows through `start_time` and `end_time`, not web-search `since:` or `until:` syntax.

Example:

```text
("PDF translator" OR "PDF translation" OR "translate PDF" OR "PDF 翻译") -is:retweet
```

Do not assume this example is suitable for every task. Build expressions from the user's actual subject, audience, language, and research question.

For Reddit, pass a focused natural-language query to `search_reddit_posts`. Do not copy X-only operators, X time syntax, or X pagination tokens into a Reddit request. The current Reddit Workflow has no exposed sort, time-range, or pagination inputs; describe the result as the provider's default query result rather than a controlled time-window sample.

For Xiaohongshu, pass a focused query to `search_xiaohongshu_notes`. Use its native `sort_type`, `note_type`, and `time_filter` only when they materially answer the user's request. Do not invent `search_id` or `search_session_id`; retain and reuse those returned values only when the user asks for another page. Keep returned image URLs in their original order and do not claim to have inspected an image unless it was actually provided for inspection.

For a specific Xiaohongshu creator, use `get_xiaohongshu_user_notes` with `user_id` when available; otherwise use the supplied share link. Pass the returned `next_cursor` unchanged for another page, and stop when `has_more` is false. Do not substitute keyword search for creator history.

For Zhihu, pass `keyword` and all requested filters to `search_zhihu_articles` exactly as supplied. Do not trim, normalize, translate, or rewrite `keyword`, `offset`, `limit`, `search_hash_id`, or `vertical_info`. Use `vertical="article"` only when article-only results are required; otherwise preserve the user's explicit vertical or the tool default. Never invent pagination values.

For LinkedIn, use only the member profile URL supplied by the user. Default to `activity_type="posts"`; use `comments` or `reactions` only when explicitly requested. Continue with both the returned pagination token and the next offset boundary required by the live schema. Missing metrics are unknown, not zero.

For WeChat Official Accounts, require the public `gh_username`. Keep `raw=true`, choose the content tab only when requested, and pass `next_offset` unchanged for another page. Use parsed numeric metrics for comparisons; inspect `raw_data` only when the user requests original fields or a required field is absent from the normalized metrics.

## Workflow

1. Identify the research subject, user goal, relevant languages, desired freshness, and answer depth.
2. Check whether the conversation already contains results for the same query, sort order, time or Post ID boundaries, and page context. Reuse them unless the user asks for a refresh.
3. Draft the smallest focused query set that can answer the goal.
4. Translate freshness into explicit `start_time` and, only when needed, `end_time` boundaries. For a current-window search, normally omit `end_time` so the provider can use its latest searchable boundary.
5. Use `since_id` or `until_id` only when the task supplies a meaningful Post ID checkpoint. Do not invent or derive ID boundaries from timestamps.
6. Use `recency` for current conversations or emerging issues. Use `relevancy` for stronger topical matches. When the distinction materially affects the goal, run both and label them separately.
7. Call `search_x_posts` once per planned expression with a page size proportional to the task; default to `50`. Give the logical page a stable `idempotency_key` when the client supports one.
8. Follow `next_token` only when broader coverage is necessary. Never modify or interpret the token. Keep `query`, `max_results`, `sort_order`, time boundaries, and Post ID boundaries unchanged, and use a new `idempotency_key` for the new page.
9. Normalize the collected evidence by `post_id`, retaining author, time, language, URL, metrics, and matching-query provenance.
10. Inspect provider errors and coverage limitations before interpreting results.
11. Extract recurring wording, questions, pain points, product feedback, objections, use cases, or campaign opportunities only when supported by returned posts.
12. Report observations first, evidence second, interpretation third, and limitations last.

For a Reddit community-post request, use this shorter workflow:

1. Identify the subject, desired wording or question, languages, and whether the user explicitly needs cross-platform comparison.
2. Call `search_reddit_posts` once with a focused query and a stable `idempotency_key` only when a same-search retry may be needed.
3. Preserve `post_id`, title, body when returned, URL, subreddit, author when public, creation time, language, and native score/comment metrics.
4. Do not invent a result time window, ranking mode, pagination state, or coverage count beyond the returned `result_count`.
5. Report subreddit context and direct user wording as evidence; label broader patterns as synthesis.

For a Xiaohongshu note request, use this shorter workflow:

1. Identify the topic, desired note type, sort, time filter, and whether image evidence is relevant.
2. Call `search_xiaohongshu_notes` with `page=1` unless the user explicitly requests a later page with prior `search_id` and `search_session_id`.
3. Preserve `note_id`, title, description, URL, author, publication time, native engagement metrics, and the complete ordered image list including cover markers.
4. Do not infer product use, sentiment, demographics, or visual details from an image URL alone.
5. Report returned note evidence separately from cross-note patterns and state the page and filters used.

For a Xiaohongshu creator request, use this shorter workflow:

1. Use the supplied `user_id`; if unavailable, use the supplied share link.
2. Call `get_xiaohongshu_user_notes` for one page and preserve `cursor`, `next_cursor`, and `has_more`.
3. Compare notes using their native engagement counts without treating them as reach or conversion.
4. Follow `next_cursor` only when broader creator-history coverage is needed, using a new `idempotency_key`.
5. Report the number of pages inspected and whether more pages were available.

For a Zhihu content request, use this shorter workflow:

1. Identify the exact keyword, desired vertical, sort, time interval, and page parameters.
2. Call `search_zhihu_articles` without modifying any user-supplied parameter value.
3. Preserve the returned parameter object, content IDs, content types, URLs, titles, excerpts, authors, timestamps, and native vote/comment metrics.
4. For another page, reuse only continuation values actually returned or explicitly supplied by the user, and use a new `idempotency_key`.
5. State the vertical, sort, time interval, and page boundary used; do not describe the results as exhaustive Zhihu coverage.

For a current regional-trends request, use this shorter workflow:

1. Identify the requested country or worldwide scope and preserve the original country wording.
2. Convert a localized country name to its canonical English name, such as `日本` to `Japan` or `美国` to `United States`.
3. Call `get_x_trends` once with `country_name`; omit it when no country was requested.
4. If the tool returns `unsupported country name`, report `unsupported country name: <original user input>` without guessing or falling back to worldwide.
5. Report the resolved WOEID, capture time, trend names, and native post counts only where returned.
6. Do not run `search_x_posts`, `search_reddit_posts`, or `search_xiaohongshu_notes` for every trend unless the user asks for discussion evidence or deeper analysis.

For a LinkedIn member-content request, use this shorter workflow:

1. Confirm the public member profile URL and whether the user needs posts, comments, or reactions.
2. Call `get_linkedin_user_posts` with `start=0`; preserve the returned pagination token.
3. Retain source URLs, text, timestamps, and available in-network/out-of-network impressions, likes, comments, and reposts.
4. Compare content only on metrics actually returned; keep missing metrics as unknown.
5. Continue only when the user needs broader history, preserving the page boundary and using a new `idempotency_key`.

For a WeChat Official Account request, use this shorter workflow:

1. Confirm the account `gh_username`, content tab, and desired history depth.
2. Call `get_wechat_account_articles` for one page with `raw=true`.
3. Use normalized read, like, comment, share, and watching counts for analysis; consult `raw_data` only when original fields are requested or needed.
4. Pass `next_offset` unchanged for another page and stop when `is_end` is true.
5. Report the pages inspected and avoid equating reads with unique reach, approval, or conversion.

## Interpretation

- Label direct post content and metrics as observations.
- Label patterns across posts as synthesis or inference.
- Prefer patterns supported by multiple independent authors.
- Surface counterexamples or conflicting reactions beside the pattern they weaken.
- Treat likes, replies, reposts, and quotes as native public metrics, not interchangeable measures of approval.
- Distinguish discussion volume from importance and engagement from intent.
- Preserve quoted wording sparingly; prefer concise paraphrase plus the source URL.
- Explain when findings depend heavily on one query, language, author cluster, ranking mode, or time window.

## Response Format

Use this concise structure by default:

1. `Summary`: two to four evidence-grounded observations.
2. `Patterns`: recurring language, questions, pain points, feedback, or opportunities.
3. `Evidence`: strongest source URLs with platform, subreddit or note author when applicable, brief relevance notes, and exact metrics only when useful.
4. `Interpretation`: clearly marked implications or possible actions, with conditions and risks.
5. `Limitations`: query expressions, sorting, effective time or Post ID boundaries, pagination depth, provider errors, and coverage boundaries.

For a full export, include every unique returned post and its matching query provenance. Do not silently omit duplicates; state the raw match count and unique `post_id` count.

## Failure Recovery

- Tool unavailable: report that the requested live social research could not be completed; do not guess at the cause or fabricate results.
- Invalid query or page size: correct only an unambiguous formatting issue; otherwise show the rejected field and ask for direction.
- Invalid time range or unsupported searchable boundary: preserve the rejected field, adjust only an unambiguous current-window `end_time` problem by omitting `end_time`, and otherwise ask for direction.
- Retry conflict: retry only the same logical page with its original inputs; use a new key for a genuinely different page or search.
- Provider error with partial results: use only returned evidence and state the missing coverage.
- Pagination failure: retain the completed pages, their page-level context, and the last opaque `next_token`; do not restart all queries automatically.
- Unsupported trend country: return `unsupported country name: <original user input>`; do not guess a nearby country or silently use worldwide trends.
- Reddit provider error: retain any returned Reddit evidence, state that the requested community coverage is unavailable, and do not fall back to X unless the user requested cross-platform research.
- Xiaohongshu page continuation: retain the returned `search_id` and `search_session_id`; do not guess them or increment page automatically. If they are absent, report that no safe continuation token is available.
- Xiaohongshu creator continuation: reuse only the returned `next_cursor`; stop when `has_more` is false.
- LinkedIn temporary failure: retry only the same logical page with unchanged inputs and idempotency key. Retain completed pages and do not replace missing metrics with zeros.
- WeChat pagination failure: retain completed pages and the last returned `next_offset`; do not decode, edit, or reconstruct the offset.

## Examples

```text
Use $research-social-signals to find recent X conversations about PDF translation tools that preserve layout, including Chinese and English wording.
```

```text
Use $research-social-signals to compare recent and relevant X discussions mentioning Product A and Product B, with source links and coverage limitations.
```

```text
Use $research-social-signals to find Reddit posts about the pain points of translating PDF files while preserving layout. Include subreddit context and source links; do not make an SEO report.
```

```text
Use $research-social-signals to find Xiaohongshu notes about portable coffee makers. Preserve note IDs, source links, and returned image order; do not infer image content from URLs alone.
```

```text
Use $research-social-signals to find Zhihu articles and answers about AI meeting assistants. Preserve the exact search filters, source links, and native vote or comment evidence.
```

```text
Use $research-social-signals to identify recurring user questions and complaints about AI meeting assistants. Do not generate an SEO report.
```

```text
Use $research-social-signals to show what is currently trending on X in Japan.
```

```text
Use $research-social-signals to review a LinkedIn member's public posts and compare the available impression, like, comment, and repost evidence without treating missing metrics as zero.
```

```text
Use $research-social-signals to retrieve one WeChat Official Account article page, summarize the useful read and engagement metrics, and include raw fields only where they support the analysis.
```

```text
Use $research-social-signals to review notes posted by a specific Xiaohongshu creator from a user ID or share link, following the returned cursor only if another page is needed.
```
