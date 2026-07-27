---
name: research-social-signals
description: Research traceable public social-media conversations through the Daily Growth Signals Social MCP. Use for social listening, user-language discovery, pain points, questions, product or competitor mentions, feedback, campaign research, and recent X discussion where literal-query coverage, source links, and clear evidence boundaries matter. Do not use it for SEO metrics or when the user only needs analysis of social data already present in the conversation.
---

# Research Social Signals

Turn a social-research goal into a small set of focused X query expressions, retrieve only the evidence needed, and report observations separately from interpretation. Treat returned posts as query-bounded public observations, not a representative census of X.

## Execution Contract

- Use the Daily Growth Signals Social MCP `search_x_posts` tool for live X research.
- Treat the live MCP schema and returned fields as the source of truth.

- Reuse results already present in the conversation before running the same query again.
- Preserve the exact query, `sort_order`, pagination context, post URLs, timestamps, languages, and native public metrics.
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

## Query Planning

X search is primarily literal. Expand only along dimensions relevant to the user's goal:

- exact product, brand, competitor, or category terms;
- common abbreviations, spelling variants, and languages;
- problem statements and question forms;
- desired outcomes and use-case phrases;
- useful native operators such as `-is:retweet` and `lang:`.

Prefer several focused expressions over one over-broad expression. Keep each query within the live tool limit and avoid unrelated OR terms that make the evidence hard to interpret.

Example:

```text
("PDF translator" OR "PDF translation" OR "translate PDF" OR "PDF 翻译") -is:retweet
```

Do not assume this example is suitable for every task. Build expressions from the user's actual subject, audience, language, and research question.

## Workflow

1. Identify the research subject, user goal, relevant languages, desired freshness, and answer depth.
2. Check whether the conversation already contains results for an identical query and sort order. Reuse them unless the user asks for a refresh.
3. Draft the smallest focused query set that can answer the goal.
4. Use `recency` for current conversations or emerging issues. Use `relevancy` for stronger topical matches. When the distinction materially affects the goal, run both and label them separately.
5. Call `search_x_posts` once per planned expression with a page size proportional to the task; default to `50`.
6. Follow `next_token` only when broader coverage is necessary. Never modify or interpret the token.
7. Normalize the collected evidence by `post_id`, retaining author, time, language, URL, metrics, and matching-query provenance.
8. Inspect provider errors and coverage limitations before interpreting results.
9. Extract recurring wording, questions, pain points, product feedback, objections, use cases, or campaign opportunities only when supported by returned posts.
10. Report observations first, evidence second, interpretation third, and limitations last.

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
5. `Limitations`: query expressions, sorting, pagination depth, provider errors, and coverage boundaries.

For a full export, include every unique returned post and its matching query provenance. Do not silently omit duplicates; state the raw match count and unique `post_id` count.

## Failure Recovery

- Tool unavailable: report that live X research could not be completed; do not guess at the cause or fabricate results.
- Invalid query or page size: correct only an unambiguous formatting issue; otherwise show the rejected field and ask for direction.


- Provider error with partial results: use only returned evidence and state the missing coverage.
- Pagination failure: retain the completed pages and the last opaque `next_token`; do not restart all queries automatically.

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
