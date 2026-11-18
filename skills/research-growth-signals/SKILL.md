---
name: research-growth-signals
description: Research traceable public social and SEO signals through SignalDig, including bounded Douyin and TikTok search and hot lists, Zhihu, Xiaohongshu, and Instagram resources plus Threads topic signals. Use when a user asks for social discussions, posts, profiles, Douyin or TikTok search and trends, Zhihu questions or trends, search suggestions, keyword demand, SERP, competitors, GEO, backlinks, rankings, or traffic evidence. Use the unified research tools and never expose providers, workflows, or bindings.
slug: research-growth-signals
displayName: SignalDig Growth Research
version: 2.3.0
summary: Retrieve traceable public social and SEO signals through SignalDig's unified research tools.
tags: [seo, social, mcp, signaldig, research]
license: MIT
metadata:
  version: "2.3.0"
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
- Never invent native cursors, search IDs, provider parameters, internal IDs, or low-level request payloads. For named resource operations, pass only the public target fields documented below and reuse returned continuation values unchanged; the service maps and validates them.

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

### Douyin

- `douyin_video_detail`: set `target.douyin_aweme_id` to a decimal video ID.
- `douyin_video_by_share_url`: set `target.douyin_share_url` to a public Douyin share URL.
- `douyin_video_statistics`: set `target.douyin_aweme_ids` to 1–100 unique decimal video IDs. The returned counts are native observations, not comparable reach estimates.
- `douyin_user_profile`: set `target.douyin_sec_user_id` to the stable public profile token.
- `douyin_user_posts`: set `target.douyin_sec_user_id`; optional `douyin_max_cursor`, `douyin_count`, `douyin_sort_type`, and `douyin_channel` select one page. Pass a returned `next_cursor` as `douyin_max_cursor` for continuation. The provider may return more items than the requested count.
- `douyin_general_search_v1`, `douyin_search_suggest`, `douyin_user_search`, `douyin_challenge_search_v1`: set `target.douyin_keyword`. General, user, and challenge search pages accept `douyin_cursor` and returned `douyin_search_id`; general and challenge search also accept `douyin_search_sort_type`, `douyin_publish_time`, `douyin_filter_duration`, `douyin_content_type`, and `douyin_backtrace`. User search accepts `douyin_user_fans` and `douyin_user_type`.
- `douyin_hot_video_list`, `douyin_hot_topic_list`, `douyin_hot_search_list`: optional `douyin_page`, `douyin_page_size`, `douyin_date_window` (1, 24, 72, or 168 hours), and `douyin_keyword` select one page. Video hot list also accepts `douyin_billboard_sub_type` (1001–1005).

Use only IDs or links supplied by the user or a trusted previous result. Do not add Douyin to topic-search `scope.platforms`. Results expose a bounded public projection of descriptions, profile fields, native metrics, and pagination; missing counts are unknown rather than zero.

### TikTok

- `tiktok_post_detail`: set decimal `target.tiktok_item_id`. The App V3 request does not accept region.
- `tiktok_trending_searchwords`: omit `target` fields to read daily public search terms.
- `tiktok_user_profile`: set `target.tiktok_unique_id` or `target.tiktok_sec_uid`.
- `tiktok_user_posts`: set `target.tiktok_sec_uid`; optional `tiktok_cursor`, `tiktok_count` (1–15), and `tiktok_cover_format` (1 or 2) select a page. Return the cursor unchanged for continuation and deduplicate adjacent pages by post ID.
- `tiktok_post_comments`: set decimal `target.tiktok_item_id`; optional `tiktok_cursor`, `tiktok_count`, and `tiktok_region` select a page.
- `tiktok_search_suggest`: set `target.tiktok_keyword`.
- `tiktok_user_search`: set `target.tiktok_keyword`; optional `tiktok_offset`, `tiktok_search_count`, `tiktok_user_follower_count`, `tiktok_user_profile_type`, and `tiktok_user_other_pref` select one App V3 page. Pass the returned `cursor` as the next `tiktok_offset`.
- `tiktok_general_search`: set `target.tiktok_keyword`; optional `tiktok_offset`, `tiktok_search_count`, `tiktok_search_sort_type`, and `tiktok_publish_time` select one App V3 page. Pass the returned `cursor` as the next `tiktok_offset`.
- `tiktok_top_contents`: set `target.tiktok_period_end_timestamp` to the ranking period's end date as a **10-digit Unix timestamp in seconds**, calculated in UTC. `target.tiktok_period_dimension` defaults to `3` (daily); `1` selects a weekly ranking and `5` a long-period ranking. These values select ranking types, not lookback windows. For a weekly ranking, choose a published UTC Sunday; UTC midnight is a convenient conversion point, not a required exact second. Recent dates can still return an empty ranking. Do not automatically try another date or period.
  - `target.tiktok_region` maps to the supplier's `country_code` and defaults to `US`. Use an uppercase two-letter code for a country the user selected; the supplier's location list determines actual coverage, and an unsupported region may return an empty list.
  - `target.tiktok_content_label_ids` is an empty string for all categories or a comma-separated string of IDs, such as `11002,11015`. Valid IDs: `11001` Nature & Animals; `11002` Beauty & Care; `11003` Fashion; `11004` Music & Entertainment; `11005` Games; `11006` Education & Work; `11007` Sports & Outdoor; `11008` Creativity & Talent; `11009` Family & Relationships; `11010` Food & Drink; `11011` Vlog & Selfie; `11012` Society; `11013` Lifestyle & Leisure; `11014` Automotive & Transport; `11015` Technology & Finance. Do not send category names as IDs.
  - `target.tiktok_order_by_metric` defaults to `1` (views); `2` sorts by engagement rate and `3` by six-second view rate. `target.tiktok_organic_only` defaults to `false`. `target.tiktok_page` starts at `1`; `target.tiktok_limit` defaults to `20` and cannot exceed `100`. Read `data.pagination.hasMore` before requesting another page.

Do not add TikTok to topic-search `scope.platforms` or provide account Cookie values or search tracking IDs. Results contain a bounded public projection; video CDN links and access tokens are excluded. Empty App V3 search pages can be valid; inspect the returned `has_more` before continuing.

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

### YouTube

Submit YouTube requests through `research_social_signals` with a named `youtube_*` operation and the matching `target`. Poll the returned `analysis_id` and read `dataset="social_resources"`. Do not include topic `scope`, `search`, or result budget.

- `youtube_search`: set `target.keyword` and use the uppercase two-letter ISO country code in `target.country_code` when the user names a country. Optional `target.language_code` preserves the query language, and `target.page_number` selects one results page. For a Brazil search, use `target={"keyword":"grok免费","country_code":"BR","language_code":"zh","page_number":1}`. The service resolves the country internally; never send native region codes or location fields. Preserve each returned video, channel, or playlist item type.
- `youtube_channel_search`: set `target.keyword` for the first page; reuse its returned `continuation_token` for a later page.
- `youtube_channel_id`: set `target.channel_url` to resolve a YouTube channel URL to its stable `channel_id`.
- `youtube_channel_detail` and `youtube_channel_videos`: set either `target.channel_id` or `target.channel_url`; the service resolves a URL when supplied. Reuse a returned video-list continuation token unchanged.
- `youtube_video_comments`: set the 11-character `target.video_id`; optional `sort_by` is `top` or `newest`. Reuse the first-level comment-list continuation token unchanged. A reply continuation token is not a comment-list page token.

The stable channel ID starts with `UC`. A handle such as `@username` is not a channel ID. Never derive an ID or a continuation token from a URL or handle. Report only fields returned by the live result.

Apply requested publication-date and view-count thresholds to fields in returned search results. Report missing metrics or insufficient coverage instead of claiming the search enforced those thresholds.

### Instagram

Submit Instagram requests through `research_social_signals` with a named `instagram_*` operation and the matching `target`. Poll the returned `analysis_id` and read `dataset="social_resources"`. Do not include topic `scope`, `search`, or result budget, and do not add Instagram to topic-search `scope.platforms`.

- `instagram_general_search`: set `target.keyword`; for a later page, pass the returned token as `target.pagination_token` unchanged.
- `instagram_search_users`: set `target.keyword`. This operation does not accept a continuation token.
- `instagram_hashtag_posts`: set `target.keyword` to a hashtag name without `#`. Optionally set `target.instagram_feed_type` to `top`, `recent`, or `reels` (default `top`). For a later page, pass the returned token as `target.pagination_token` unchanged.
- `instagram_user_brief`: set exactly one of numeric `target.instagram_user_id` or `target.instagram_username`.
- `instagram_user_info`: set exactly one of numeric `target.instagram_user_id` or `target.instagram_username` to view the public user profile.
- `instagram_user_posts`: set exactly one of `target.instagram_username` or numeric `target.instagram_user_id`. For a later page, pass the returned token as `target.pagination_token` unchanged.
- `instagram_post_detail`: set `target.instagram_code_or_url` to a shortcode or public post URL, or set `target.instagram_post_url` to a public `/p/`, `/reel/`, `/reels/`, or `/tv/` Instagram URL. Do not supply both.
- `instagram_post_comments`: set `target.instagram_code_or_url` to a shortcode or public post URL. Optionally set `target.instagram_comment_sort_by` to `recent` (default) or `popular`. For a later page, pass the returned token as `target.pagination_token` unchanged.
- `instagram_shortcode_to_media_id`: set `target.instagram_shortcode` to the shortcode alone. The returned media ID is a separate resource; `instagram_post_detail` requires a shortcode or post URL.

For a user-posts result, use a returned post `code` or `url` to request `instagram_post_detail`. Use the returned `user.username` or `user.id` with `instagram_user_brief` or `instagram_user_info` to view the user's profile. The media `id` remains a stable identifier but is not an input to V2 post detail. Each operation reads one bounded page. Report only fields present in the returned public data and do not infer missing engagement metrics or account details.

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
