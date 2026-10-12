---
name: research-growth-signals
description: Research traceable public social and SEO signals through SignalDig, including bounded Zhihu and Xiaohongshu resources plus Threads topic signals. Use when a user asks for social discussions, posts, profiles, Zhihu questions or trends, search suggestions, keyword demand, SERP, competitors, GEO, backlinks, rankings, or traffic evidence. Use the unified research tools and never expose providers, workflows, or bindings.
slug: research-growth-signals
displayName: SignalDig Growth Research
version: 2.2.0
summary: Retrieve traceable public social and SEO signals through SignalDig's unified research tools.
tags: [seo, social, mcp, signaldig, research]
license: MIT
metadata:
  version: "2.2.0"
  homepage: "https://signaldig.com/"
---

# SignalDig Growth Research

Use connected SignalDig MCP tools to turn a user's question into the smallest sufficient Social or SEO request. Topic and resource retrieval use the same unified asynchronous research tools. SignalDig owns provider selection, Workflow execution, billing controls, and public-data filtering.

## Availability Gate

This Skill has no data of its own. Before research, inspect the visible MCP tools for `research_social_signals` and `research_seo_signals`. The server alias and any local tool namespace are client-defined; use the exact visible identifiers and never construct an `mcp__<alias>__<tool>` name.

If the required tool is unavailable, the connection fails, or authentication is rejected, stop. Never simulate results from general knowledge. Tell the user that SignalDig is not connected and direct them to [Connect SignalDig](https://signaldig.com/agent-setup). Do not expose endpoints, configuration internals, or machine error codes in that failure response.

## Direction Selection

- Use `research_social_signals` for public discussions, cross-platform topic search, and asynchronous evidence collection across its supported sources.
- Use `research_seo_signals` for keyword demand, intent, related queries, SERP, trends, competitors, GEO visibility, backlinks, ranked keywords, or traffic evidence.
- Use a named Social operation for bounded entity or feed retrieval. Threads topic search belongs to the unified Social Tool.
- When one question genuinely requires both directions, submit one bounded analysis to each tool and keep the two `analysis_id` values separate.
- Ask one short clarification only when choosing Social versus SEO, the required platform set, or the SEO business scope would otherwise be unsafe. Do not ask the user about providers, workflows, bindings, page tokens, operation names, or storage.

## Unified Research Execution Contract

1. Preserve the user's requested topic, platforms, market, language, time intent, result count, and refresh intent. Do not add sources or broaden the topic.
2. Select only one of the two business tools unless both evidence directions are necessary.
3. Submit once with `action="submit"`, the natural-language `request`, and the smallest explicit business `scope` accepted by the live schema.
4. Store the returned `analysis_id` in conversation state.
5. While the status is `queued` or `running`, wait for `retry_after_seconds` and call the same tool with `action="get"`, `view="status"`, and that `analysis_id`. Never resubmit merely because work is slow.
   Treat the top-level task status as authoritative: coverage counts and stop reasons in a non-terminal
   response are provisional and must never be used to infer source failure or exhaustion.
6. Stop at `completed`, `partial`, or `failed`. Reuse the terminal analysis for later questions unless the user explicitly asks for a refresh or changes scope.
7. Treat `coverage` as the actual retrieval boundary. Preserve `limitations`; never describe partial evidence as exhaustive or representative.

## Scope Rules

- The unified Social topic-search sources are X, Reddit, Xiaohongshu, Zhihu, and Threads. Treat these as public SignalDig capabilities, not as implementation details. The live schema remains authoritative.
- A newly published SignalDig research capability must be delivered through the unified Research MCP and documented in this Skill in the same release. Topic sources belong in `scope.platforms`; entity, feed, or ID-based retrieval requires a matching operation/target shape or public Dataset and must not create another public MCP connection.
- A requested result count is an upper bound, not permission to traverse unrelated data. SignalDig may fetch multiple native pages only inside the exact requested platform, query, filters, and count.
- Social language describes the query wording to use, not a platform-side language filter unless the live schema explicitly provides one. Keep Chinese and English query variants focused and user-relevant; never claim language-complete coverage.
- Use only the platforms the user names. If none are named and the choice materially affects cost or meaning, ask which platforms to include.
- For SEO, explicitly choose a non-empty `scope.data_scopes` list containing the smallest useful evidence set for the user's goal. Never omit it and rely on service defaults.
- Infer scope from meaning, not exact phrases. The examples below are guidance, not an exhaustive vocabulary or a requirement that users name a Dataset.
- `backlink_analysis`, `ranked_keywords`, and `bulk_traffic_estimation` are target-level evidence with distinct cost and meaning. Include any combination that is reasonably necessary for the requested outcome; do not bundle unrelated families merely because a target was supplied.
- `geo_score` is a domain-only US/en score with benchmark and citation evidence. Use it alone,
  provide `scope.domain`, omit `scope.keyword`, and never mix it with `geo_analysis` or other scopes.
- Ask one short clarification only when different scope choices would materially change cost, target interpretation, or the answer. Otherwise make the narrowest reasonable choice and state the resulting coverage.
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
- Xiaohongshu user posts without profile data: set `operation="user_posts"` and pass exactly one
  `target.user_id` or `target.share_url`. This is a separate bounded post retrieval task and
  returns a new `analysis_id`; it does not continue a `user_account_post` task.
- Keep `request` as the short natural-language retrieval goal. Do not send `scope`, `search`,
  `result_budget`, or `max_results` for these three entity operations.
- Read the returned `analysis_id` with the same tool and explicit status/results protocol. X
  details and Xiaohongshu user posts use `social_posts`; Xiaohongshu account results can be read
  from `social_profiles` and `social_posts` using separate result reads with the same analysis ID.
- If the user asks only for a profile or only for user posts, do not silently request the
  combined `user_account_post` operation; use `user_posts` for posts-only retrieval and explain
  that it is a new bounded task rather than a continuation of a previous result.

Do not encode provider-native sort values, search IDs, page numbers, native language operators, or continuation tokens. When the user asks for up to 200 matching Xiaohongshu items, submit `result_budget.total=200`; the service owns bounded page traversal and reports the achieved count.

Bind engagement constraints to their named source. Likes, replies, and reposts apply only to X; score and comments apply only to Reddit. Do not translate one platform's metric into another. If the user says only “popular” or “high engagement,” omit a numeric constraint and let the service report actual coverage.

Zhihu supports bounded public topic retrieval through the same Social Tool and `social_posts` Dataset. Treat a returned source limit or unsupported language/time constraint as coverage information; do not resubmit with guessed native parameters.

## Unified Social Resource Retrieval

Submit these through `research_social_signals` with the named `operation`, the smallest matching `target`, and no topic `scope`, `search`, or result budget. Poll the returned `analysis_id`, then read `dataset="social_resources"`.

### Zhihu

- `zhihu_question_detail`: target one numeric `question_id`.
- `zhihu_answer_detail`: target one numeric `answer_id`.
- `zhihu_question_answers`: target one numeric `question_id`; optional `cursor`, `limit`, `offset`, `order`, and `session_id` describe one bounded page. Reuse returned continuation values unchanged.
- `zhihu_hot_list`: optional integer `limit` and boolean `desktop` select one current public hot-list response.
- `zhihu_hot_recommend`: optional integer `offset`, integer `page_number`, and `session_token` select one recommendation page. Reuse returned continuation values unchanged.
- `zhihu_preset_search`: no target is required.

Use `operation="topic_search"` with `scope.platforms=["zhihu"]` for bounded Zhihu topic research and normalized `social_posts`. Do not claim that a hot list or recommendation feed is topic-search evidence. Resource results contain the submitted public parameters, capture time, and sanitized business `data`; interpret only fields actually present and do not infer missing deep-field semantics.

### Zhihu and Xiaohongshu auxiliary data

- `xiaohongshu_search_suggestions`: set `target.keyword`; an empty keyword requests current popular recommendations. Do not present either as note-search evidence.

These resource results contain submitted public parameters, capture time, and sanitized business `data`. Interpret only fields present in the live response, and never infer deep-field semantics from the operation name.

### Threads

For keyword search, use `research_social_signals` with `scope.platforms=["threads"]`. Treat results as query-bounded observations, not exhaustive platform coverage. The current unified public schema does not expose Threads profile, user-post, or single-post retrieval; do not construct a direct Threads tool name.

## SEO Submission

Translate the user's request into the live `research_seo_signals` schema:

- `request`: the natural-language research goal.
- `scope.market` and `scope.language`: normalized business inputs required by the live schema.
- `scope.keyword`: required for every SEO scope except domain-only `geo_score`; omit it for `geo_score`.
- Use `scope.domain` for traditional keyword/SERP/trend research, competitor analysis, GEO visibility,
  and domain-level Geo Score evidence.
- Use `scope.target` for backlink analysis, ranked-keyword inventory, or traffic estimation when the target is a domain, subdomain, or webpage URL. Do not send both `domain` and `target`.
- `scope.data_scopes`: required, explicit, non-empty, unique, and limited to the smallest useful evidence set supported by the user's goal.
- `scope.search_engine`: set only from the user's explicit engine choice; otherwise use the service default.
- `research_depth`: default `standard`.
- `refresh`: normally `false`.

Keep research language separate from response language. Do not expose or construct provider tasks, locations, endpoints, devices, or internal capability names.

Supported SEO scope families are `keyword_overview`, `domain_rank_overview`, `related_keywords`, `serp`,
`google_trends`, `x_recent_search`, `competitor_analysis`, `geo_analysis`, `geo_score`, `backlink_analysis`,
`ranked_keywords`, and `bulk_traffic_estimation`. Do not submit `bulk_pages_summary` through the
unified Tool; it is not part of the current public Research result contract.

Use these as semantic examples for target-level scopes:

| User's direct evidence need | Allowed scope |
| --- | --- |
| Incoming links, referring domains, or link profile | `backlink_analysis` |
| Queries or keywords for which the target currently ranks | `ranked_keywords` |
| Estimated organic or paid traffic for the target | `bulk_traffic_estimation` |

These examples are not keyword triggers. Infer the evidence needed from the requested outcome and
context. A broad site audit does not automatically require all three, but a request to explain organic
visibility may reasonably combine ranking and traffic evidence even if the user does not name those
Datasets. When one goal needs both domain-based evidence and target-level evidence, submit the minimum
separate analyses required by the mutually exclusive `scope.domain` and `scope.target` inputs, keep their
`analysis_id` values separate, and synthesize only after both reach a terminal state.

## Status and Result Reading

- Use `view="status"` to check one `analysis_id` or an ordered `analysis_ids` collection without returning result bodies.
- Use `view="results"` only for terminal or partially terminal work. Select one Dataset per call and use the same ordered analysis collection for every page.
- Social post records use `dataset="social_posts"`. For SEO, use the Dataset matching the requested evidence family:
  `keyword_overview`, `domain_rank_overview`, `related_keywords`, `serp_results`, `google_trends`,
  `x_recent_search`, `ranked_keywords`, `backlinks`, `competitor_domains`, `geo_mentions`, `geo_score`, or
  `traffic_estimation`.
- Aggregate SEO Datasets (`keyword_overview`, `domain_rank_overview`, `google_trends`, `geo_score`, and
  `traffic_estimation`) return one public record and do not provide a next cursor. Do not retry or
  invent pagination for them.
- Detail SEO Datasets (`related_keywords`, `serp_results`, `x_recent_search`, `ranked_keywords`,
  `backlinks`, `competitor_domains`, and `geo_mentions`) may return multiple records and can expose
  `page.next_cursor`; continue only when `page.has_more=true`.
- Set `page_size` to the number of records useful for the current reasoning step. Treat it as an upper bound because response-size safety may return fewer records.
- Continue only with the returned `page.next_cursor`, passed back as `result_cursor` with the same tool, analysis IDs in the same order, and the same Dataset.
- Each results call reads exactly one page. If the user asks for "more" without a page count, read at
  most one additional page; do not keep following cursors autonomously.
- If the user explicitly requests `N` more pages, read at most `N` additional pages and stop early when
  `page.has_more=false`. A page shorter than `page_size` is not an end condition by itself.
- If the user asks for all results or a complete export without a page limit, ask for the maximum number
  of pages before continuing. After the page budget is exhausted, report whether more results remain.
- Do not combine different Datasets in one call and do not invent a cursor. If the requested Dataset
  is rejected, explain the limitation or ask for a supported evidence family; never silently substitute
  a different SEO family.
- Historical calls without `view` remain compatible, but prefer the explicit status/results protocol for new work.

## Failure Handling

- Invalid business scope: explain the missing or invalid user-level field and ask only for that field.
- Deadline reached: return the current `analysis_id` and status so a later turn can resume with `get`; do not submit again.
- `partial`: use available evidence and identify the missing coverage.
- A requested evidence family with no records is a reported coverage limitation, not permission to resubmit, broaden scope, or discard successful families.
- `failed`: say SignalDig could not complete the requested research and suggest retrying later. Never reconstruct technical causes from hidden fields.

Read [references/mcp-contract.md](references/mcp-contract.md) before the first live call or when interpreting a response whose live schema differs from this Skill.
