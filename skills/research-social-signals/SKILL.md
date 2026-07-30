---
name: research-social-signals
description: Research traceable public social-media conversations and current country-level X trends through the Daily Growth Signals Social MCP. Use for social listening, user-language discovery, pain points, questions, product or competitor mentions, feedback, campaign research, recent X discussion, or requests asking what is trending on X worldwide or in a country. Do not use it for SEO metrics or when the user only needs analysis of social data already present in the conversation.
---

# Research Social Signals

Turn a social-research goal into a small set of focused X query expressions, retrieve only the evidence needed, and report observations separately from interpretation. Treat returned posts as query-bounded public observations, not a representative census of X.

## Execution Contract

- Use `search_x_posts` for query-bounded recent X conversations.
- Use `get_x_trends` for current X trending topics in a country; omit `country_name` for worldwide trends.
- Treat the live MCP schema and returned fields as the source of truth.
- Reuse results already present in the conversation before running the same query again.
- Preserve the exact query, `sort_order`, time or Post ID boundaries, pagination context, post URLs, timestamps, languages, and native public metrics.
- Reuse an `idempotency_key` only when safely retrying the same logical page. Use a new key when requesting another page or changing any search input.
- Read [references/mcp-contract.md](references/mcp-contract.md) before the first live call or when diagnosing a tool error.
- If this Skill conflicts with the live tool schema, follow the live schema.

## Hard Rules

1. Never claim semantic, exhaustive, representative, or platform-wide coverage.
2. Never invent posts, authors, metrics, URLs, timestamps, languages, or provider availability.
3. Never treat missing matches as proof that a need, complaint, or trend does not exist.
4. Never convert engagement counts into sentiment, demand, market size, or purchase intent without explicit supporting evidence.
5. Never merge different authors or posts merely because their text is similar.
6. Deduplicate overlapping query results by stable `post_id`; preserve which queries found the post when useful.
7. Do not repeat an identical live query merely to rephrase or summarize its existing result.
8. Do not paginate automatically unless the user requests broader coverage or the first page is insufficient for the stated research goal.
9. Do not use SEO-only inputs such as domain, market, or keyword-volume assumptions unless the user separately asks for SEO research.
10. Keep the default answer concise. Do not dump every returned post unless the user asks for a full export.
11. Separate observed evidence, synthesis, and limitations in every answer.
12. Do not make the user's final marketing decision or automatically post, contact users, allocate budget, or launch a campaign.
13. Do not describe a regional trends response as personalized trends or as proof of broader public opinion.

## Tool Selection

- Choose `get_x_trends` when the user asks what is currently trending or hot on X without supplying a search topic.
- Choose `search_x_posts` when the user supplies a topic, product, query, audience question, or discussion-research goal.
- Use both only when the user needs the current regional trend list and supporting recent conversations about selected trends.
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

For a current regional-trends request, use this shorter workflow:

1. Identify the requested country or worldwide scope and preserve the original country wording.
2. Convert a localized country name to its canonical English name, such as `日本` to `Japan` or `美国` to `United States`.
3. Call `get_x_trends` once with `country_name`; omit it when no country was requested.
4. If the tool returns `unsupported country name`, report `unsupported country name: <original user input>` without guessing or falling back to worldwide.
5. Report the resolved WOEID, capture time, trend names, and native post counts only where returned.
6. Do not run `search_x_posts` for every trend unless the user asks for discussion evidence or deeper analysis.

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
3. `Evidence`: strongest post URLs with brief relevance notes and exact metrics only when useful.
4. `Interpretation`: clearly marked implications or possible actions, with conditions and risks.
5. `Limitations`: query expressions, sorting, effective time or Post ID boundaries, pagination depth, provider errors, and coverage boundaries.

For a full export, include every unique returned post and its matching query provenance. Do not silently omit duplicates; state the raw match count and unique `post_id` count.

## Failure Recovery

- Tool unavailable: report that live X research could not be completed; do not guess at the cause or fabricate results.
- Invalid query or page size: correct only an unambiguous formatting issue; otherwise show the rejected field and ask for direction.
- Invalid time range or unsupported searchable boundary: preserve the rejected field, adjust only an unambiguous current-window `end_time` problem by omitting `end_time`, and otherwise ask for direction.
- Retry conflict: retry only the same logical page with its original inputs; use a new key for a genuinely different page or search.
- Provider error with partial results: use only returned evidence and state the missing coverage.
- Pagination failure: retain the completed pages, their page-level context, and the last opaque `next_token`; do not restart all queries automatically.
- Unsupported trend country: return `unsupported country name: <original user input>`; do not guess a nearby country or silently use worldwide trends.

## Examples

```text
Use $research-social-signals to find recent X conversations about PDF translation tools that preserve layout, including Chinese and English wording.
```

```text
Use $research-social-signals to compare recent and relevant X discussions mentioning Product A and Product B, with source links and coverage limitations.
```

```text
Use $research-social-signals to identify recurring user questions and complaints about AI meeting assistants. Do not generate an SEO report.
```

```text
Use $research-social-signals to show what is currently trending on X in Japan.
```
