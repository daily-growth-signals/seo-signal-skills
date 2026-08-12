---
name: research-social-signals
description: Retrieve traceable, public, platform-native social data from X, Reddit, Xiaohongshu, Zhihu, LinkedIn, and WeChat Official Accounts through the Daily Growth Signals Social MCP. Use when an AI needs underlying posts, notes, account content, trends, source URLs, timestamps, pagination state, or native metrics for its own downstream analysis. Select the correct retrieval tool, explain unfamiliar parameters, validate user-supplied values, suggest focused searches, and return data without making marketing, content, SEO, sentiment, or business decisions.
---

# Retrieve Social Signals

Retrieve useful underlying social data. Help the caller form a valid, focused request, then preserve the returned evidence and its collection boundary. Stop at retrieval: do not turn the data into a decision, score, strategy, recommendation, or fixed analysis report.

## Core Boundary

1. Treat this Skill as a data-retrieval layer for another AI or user.
2. Return source content, identifiers, URLs, timestamps, native metrics, request parameters, pagination state, and errors that help downstream analysis.
3. Do not decide what content to create, which opportunity to prioritize, whether sentiment is positive, or what action the user should take.
4. Do not force results into a fixed analysis template. Match the caller's requested shape; when none is given, provide a compact retrieval summary plus the data.
5. Do not manufacture a difficult identifier or silently repair an ambiguous parameter. Explain it, validate what can be validated, and request the missing value when necessary.
6. Treat missing metrics as unknown, not zero. Keep platform-native metrics distinct.

## Before Every Call

1. Identify whether the caller wants keyword search, one account or creator's history, or current regional trends.
2. Select the platform-specific tool. Never substitute keyword search for account history, or one platform for another, without the caller's consent.
3. Inspect every supplied parameter for the expected type, format, range, meaning, and relationship to other parameters.
4. If a value is clearly wrong and the intended correction is unambiguous, explain the correction briefly before using it. Examples: a Xiaohongshu share URL placed in `user_id`, an ISO country code placed in `country_name`, or a LinkedIn company URL placed in `profile_url`.
5. If the intended value cannot be derived safely, explain where the user can obtain it and ask for it. Do not guess identifiers, cursors, page tokens, dates, or filters.
6. When the caller supplies only a broad topic, propose a small focused query set based on exact names, common variants, user wording, language, problem, or use case. Avoid blind expansion and unrelated synonyms.
7. Read [references/parameter-guide.md](references/parameter-guide.md) for parameter meaning, accepted formats, acquisition methods, and validation reminders. Read [references/mcp-contract.md](references/mcp-contract.md) for the live tool contract, result fields, pagination, and failure boundaries.
8. Follow the live MCP schema when it differs from these references.

## Tool Selection

- Use `search_x_posts` for recent public X posts matching a focused query expression.
- Use `get_x_trends` for current X trends by country or worldwide.
- Use `search_reddit_posts` for public Reddit posts matching a focused natural-language query.
- Use `search_xiaohongshu_notes` for public Xiaohongshu notes matching keywords and optional native filters.
- Use `get_xiaohongshu_user_notes` for notes posted by one Xiaohongshu creator, identified by `user_id` or share text/link.
- Use `search_zhihu_articles` for public Zhihu content with explicit native filters.
- Use `get_linkedin_user_posts` for activity associated with one LinkedIn member profile under `/in/`.
- Use `get_wechat_account_articles` for content published by one WeChat Official Account identified by its original ID beginning with `gh_`.

## Search Guidance

- Preserve a user's exact account identifier, profile URL, source link, cursor, and explicit filter value unless it is invalid for the selected tool.
- For keyword discovery, prefer two or three focused searches over one broad expression. Each search should represent a clear retrieval angle, such as exact brand name, common spelling, problem phrase, or language variant.
- Tell the caller what materially changes coverage: platform, query, language, sort, time filter, content type, account identity, and pagination depth.
- Do not add filters merely because they exist. Use them only when they express the caller's stated need.
- Do not automatically paginate. Fetch another page only when requested or when the caller explicitly needs broader coverage; reuse only tokens returned by the same search context.
- Reuse results already present in the conversation instead of repeating the same paid or live request.
- Use the same `idempotency_key` only to retry the same logical page with identical inputs. Use a new key after any input or page changes.

## Data Delivery

Preserve, when returned and relevant:

- the exact tool and effective request parameters;
- stable post, note, content, user, or account identifiers;
- source URLs, author/account identity, publication time, text, title, and media URLs;
- native public counts without combining unlike metrics;
- capture time, result count, page/cursor/token state, end-of-list state, and provider errors;
- raw source objects only when the caller asks for raw data or no normalized field represents the needed value.

Do not add generic advice, opportunity rankings, content ideas, sentiment labels, performance judgments, or next-action recommendations. A concise note about invalid inputs, missing fields, or retrieval limitations is part of data quality and is allowed.

## Non-Negotiable Data Rules

1. Never claim exhaustive, semantic, representative, or platform-wide coverage.
2. Never invent content, authors, identifiers, metrics, URLs, timestamps, or continuation values.
3. Never interpret no matches as proof that a topic or behavior does not exist.
4. Never equate reads, impressions, likes, comments, reposts, shares, collects, watching counts, votes, or Reddit score.
5. Never infer image content from an image URL alone.
6. Deduplicate overlapping results only by a stable platform identifier, while retaining query provenance when useful.
7. Preserve partial results when a later page fails; do not restart or conceal the missing coverage.
8. Retry a temporary failure only for the same logical page with unchanged inputs.

## Examples

```text
Use $research-social-signals to retrieve recent X posts about PDF translation that preserve layout. Search both English and Chinese wording, return source data and query boundaries, and do not recommend a content strategy.
```

```text
Use $research-social-signals to retrieve the public notes of this Xiaohongshu creator: https://xhslink.com/example. Explain any identity or cursor parameter you need before calling the tool.
```

```text
Use $research-social-signals to retrieve articles and raw engagement data for the WeChat Official Account whose original ID is gh_a1b2c3d4e5f6. Return read, like, comment, share, and watching counts when present; do not assess account performance.
```

```text
Use $research-social-signals to search Xiaohongshu for portable coffee makers. Check whether my requested sort and time filter are valid, then return the underlying notes and pagination state only.
```

```text
Use $research-social-signals to retrieve one LinkedIn member's posts from their `/in/` profile URL. Keep missing impression metrics unknown and return no recommendations.
```
