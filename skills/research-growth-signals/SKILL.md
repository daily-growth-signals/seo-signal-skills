---
name: research-growth-signals
description: Research traceable public social and SEO signals through SignalDig's single MCP connection and two business tools. Use when a user asks for social discussions, keyword demand, SERP, trends, competitors, GEO, backlinks, rankings, or traffic evidence. The Skill selects the direction, submits the smallest sufficient scope, and polls the same analysis_id; it never exposes or asks users to choose providers, workflows, bindings, or native pagination parameters.
license: MIT
metadata:
  version: "2.0.2"
  homepage: "https://signaldig.com/"
---

# Research Growth Signals

Use one connected SignalDig MCP to turn a user's natural-language question into the smallest sufficient Social or SEO research request. SignalDig owns source selection within the requested direction, parameter conversion, native pagination, background execution, deduplication, and public-data filtering.

## Availability Gate

This Skill has no data of its own. Before research, inspect the visible MCP tools for both `research_social_signals` and `research_seo_signals`. The server alias and any local tool namespace are client-defined; use the exact visible identifiers and never construct an `mcp__<alias>__<tool>` name.

If the required tool is unavailable, the connection fails, or authentication is rejected, stop. Never simulate results from general knowledge. Tell the user that SignalDig is not connected and direct them to [Connect SignalDig](https://signaldig.com/agent-setup). Do not expose endpoints, configuration internals, or machine error codes in that failure response.

## Direction Selection

- Use `research_social_signals` for public discussions, posts, authors, native engagement, or cross-platform social evidence.
- Use `research_seo_signals` for keyword demand, intent, related queries, SERP, trends, competitors, GEO visibility, backlinks, ranked keywords, or traffic evidence.
- When one question genuinely requires both directions, submit one bounded analysis to each tool and keep the two `analysis_id` values separate.
- Ask one short clarification only when choosing Social versus SEO, the required platform set, or the SEO business scope would otherwise be unsafe. Do not ask the user about providers, workflows, bindings, page tokens, operation names, or storage.

## Common Execution Contract

1. Preserve the user's requested topic, platforms, market, language, time intent, result count, and refresh intent. Do not add sources or broaden the topic.
2. Select only one of the two business tools unless both evidence directions are necessary.
3. Submit once with `action="submit"`, the natural-language `request`, and the smallest explicit business `scope` accepted by the live schema.
4. Store the returned `analysis_id` in conversation state.
5. While the status is `queued` or `running`, wait for `retry_after_seconds` and call the same tool with `action="get"`, `view="status"`, and that `analysis_id`. Never resubmit merely because work is slow.
6. Stop at `completed`, `partial`, or `failed`. Reuse the terminal analysis for later questions unless the user explicitly asks for a refresh or changes scope.
7. Treat `coverage` as the actual retrieval boundary. Preserve `limitations`; never describe partial evidence as exhaustive or representative.

## Scope Rules

- The unified Social topic-search sources are X, Reddit, Xiaohongshu, and Zhihu. Treat these as public SignalDig capabilities, not as implementation details. The live schema remains authoritative.
- A requested result count is an upper bound, not permission to traverse unrelated data. SignalDig may fetch multiple native pages only inside the exact requested platform, query, filters, and count.
- Social language describes the query wording to use, not a platform-side language filter unless the live schema explicitly provides one. Keep Chinese and English query variants focused and user-relevant; never claim language-complete coverage.
- Use only the platforms the user names. If none are named and the choice materially affects cost or meaning, ask which platforms to include.
- For SEO, choose only the evidence families necessary for the stated goal. A generic keyword lookup does not authorize every family.
- `refresh=false` is the default. Use `refresh=true` only when the user explicitly requests fresh collection.
- Never invent or forward native cursors, search IDs, provider parameters, internal IDs, or low-level request payloads. The service maps and validates them.

## Evidence and Response Rules

- Every factual result must come from a terminal SignalDig response.
- Keep observation separate from inference. Do not fabricate metrics, content, identifiers, URLs, timestamps, coverage, or confidence.
- Missing metrics are unknown, not zero. Do not combine unlike platform-native metrics.
- Deduplicate only by stable public identifiers while preserving source attribution.
- Do not expose providers, operations, workflows, bindings, prompts, raw internal archives, billing internals, request traces, or machine error codes.
- Never expose machine error codes in a user-facing response.
- On a source failure, preserve successful evidence and state the affected source as a limitation.
- Default to a concise answer: key observations, actual coverage/counts, strongest evidence or URLs, limitations, and the source `analysis_id`. Provide a full item export only when requested.
- Do not claim that search-result page bodies or linked media were inspected unless that content is explicitly present in the returned public evidence.

## Social Submission

Translate the user's request into the live `research_social_signals` schema:

- `request`: focused natural-language retrieval goal.
- `scope.platforms`: only explicitly requested supported platforms.
- `search`: structured topic, concepts, entities, language, and source-scoped constraints only when the user stated them. Never write native search operators here.
- `result_budget.total`: the requested total upper bound, or a modest default when absent. Use `result_budget.per_source` only when the user explicitly allocates counts by source.
- `research_depth`: use `quick`, `standard`, or `deep` only to reflect the user's stated depth; default to `standard`.
- `refresh`: normally `false`.

### Social Entity Retrieval

Use the same `research_social_signals` Tool for entity retrieval, but do not mix entity targets
with topic-search `scope` or `search` fields:

- X post details: set `operation="post_detail"` and pass `target.post_ids` with 1–100 unique
  decimal Post IDs. Use IDs from a prior trusted result or extract the numeric status ID from a
  public X URL; never invent an ID.
- Xiaohongshu public profile plus one page of published notes: set
  `operation="user_account_post"` and pass exactly one `target.user_id` (24-character profile
  token) or `target.share_url`. Do not use a visible account number or nickname as `user_id`.
- Keep `request` as the short natural-language retrieval goal. Do not send `scope`, `search`,
  `result_budget`, or `max_results` for these two entity operations.
- Read the returned `analysis_id` with the same tool and explicit status/results protocol. X
  details use `social_posts`; Xiaohongshu account results can be read from `social_profiles` and
  `social_posts` using separate result reads with the same analysis ID.
- If the user asks only for a profile or only for user posts, do not silently request the
  combined `user_account_post` operation; explain the currently supported combined scope or ask
  which public account data they want.

Do not encode provider-native sort values, search IDs, page numbers, native language operators, or continuation tokens. When the user asks for up to 200 matching Xiaohongshu items, submit `result_budget.total=200`; the service owns bounded page traversal and reports the achieved count.

Bind engagement constraints to their named source. Likes, replies, and reposts apply only to X; score and comments apply only to Reddit. Do not translate one platform's metric into another. If the user says only “popular” or “high engagement,” omit a numeric constraint and let the service report actual coverage.

Zhihu supports bounded public topic retrieval through the same Social Tool and `social_posts` Dataset. Do not call or mention a legacy Zhihu-specific Tool. Treat a returned source limit or unsupported language/time constraint as coverage information; do not resubmit with guessed native parameters.

## SEO Submission

Translate the user's request into the live `research_seo_signals` schema:

- `request`: the natural-language research goal.
- `scope.keyword`, `scope.domain`, `scope.market`, and `scope.language`: normalized business inputs required by the live schema.
- `scope.data_scopes`: only the required evidence families when the live schema exposes them.
- `scope.search_engine`: set only from the user's explicit engine choice; otherwise use the service default.
- `research_depth`: default `standard`.
- `refresh`: normally `false`.

Keep research language separate from response language. Do not expose or construct provider tasks, locations, endpoints, devices, or internal capability names.

## Status and Result Reading

- Use `view="status"` to check one `analysis_id` or an ordered `analysis_ids` collection without returning result bodies.
- Use `view="results"` only for terminal or partially terminal work. Select one Dataset per call and use the same ordered analysis collection for every page.
- Social post records use `dataset="social_posts"`. SEO keyword and organic-result records use `dataset="related_keywords"` or `dataset="serp_results"`.
- Set `page_size` to the number of records useful for the current reasoning step. Treat it as an upper bound because response-size safety may return fewer records.
- Continue only with the returned `page.next_cursor`, passed back as `result_cursor` with the same tool, analysis IDs in the same order, and the same Dataset.
- Read another page only when `page.has_more=true` and the user's question still needs more evidence. Never traverse all pages by default.
- Do not combine different Datasets in one call and do not invent a cursor. If a Dataset is rejected, choose another public Dataset supported by the live schema or explain the limitation.
- Historical calls without `view` remain compatible, but prefer the explicit status/results protocol for new work.

## Failure Handling

- Invalid business scope: explain the missing or invalid user-level field and ask only for that field.
- Deadline reached: return the current `analysis_id` and status so a later turn can resume with `get`; do not submit again.
- `partial`: use available evidence and identify the missing coverage.
- `failed`: say SignalDig could not complete the requested research and suggest retrying later. Never reconstruct technical causes from hidden fields.

Read [references/mcp-contract.md](references/mcp-contract.md) before the first live call or when interpreting a response whose live schema differs from this Skill.
