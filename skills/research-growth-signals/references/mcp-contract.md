# SignalDig Unified Research MCP Contract

The public research connection exposes two asynchronous business tools. The live inventory and schema are authoritative; never construct another tool name.

## Tool: `research_social_signals`

Submit:

```json
{
  "action": "submit",
  "request": "Research recent GPT-6 discussions, concerns, and expectations",
  "scope": {
    "platforms": ["xiaohongshu", "x", "reddit", "zhihu", "threads"],
    "time_range": {"mode": "relative", "value": "30d"}
  },
  "search": {
    "query": "GPT-6 discussions, concerns, and expectations",
    "language": "en",
    "retrieval_mode": "auto"
  },
  "result_budget": {"total": 200},
  "research_depth": "standard",
  "refresh": false
}
```

Status:

```json
{"action": "get", "analysis_id": "<returned analysis_id>", "view": "status"}
```

Results:

```json
{
  "action": "get",
  "analysis_ids": ["<analysis 1>", "<analysis 2>"],
  "view": "results",
  "dataset": "social_posts",
  "page_size": 20,
  "result_cursor": null
}
```

The service validates and maps all platform-native parameters. `result_budget.total` is a hard upper bound across the explicitly requested platforms. It does not authorize additional platforms, broader queries, or unbounded traversal. Constraints must be source-scoped; likes/replies/reposts belong to X, while score/comments belong to Reddit.

The public topic-search source list is X, Reddit, Xiaohongshu, Zhihu, and Threads. All five use the same `research_social_signals` Tool and `social_posts` Dataset. This list describes SignalDig's user-facing coverage; it does not reveal or select an underlying data provider. Source-specific limits and unsupported constraints are reported through `coverage` and `limitations`.

Every newly published research capability must enter the unified Research MCP and this Skill in the same release. Topic-search sources extend `scope.platforms`; entity, feed, or ID-based capabilities extend an appropriate operation/target shape or public Dataset instead of creating another public MCP connection.

Formal Social submits always require a non-empty `request`. On formal get, omit
`operation`, including after named resource submits; the analysis ID identifies the operation. Poll with
`{"action":"get","analysis_id":"<id>","view":"status"}`.
Read topic evidence with `view="results", dataset="social_posts"` and resource evidence
with `view="results", dataset="social_resources"`.

For explicit free Social search, submit `operation="free_channel_search"` with
`channel_query={channel, keyword}`. Poll using only `action="get"`, the same
`operation`, and the complete returned `analysis_id` on the same connection.
Wait for `poll_after_seconds` between reads.

## Social Entity Retrieval

The same Social Tool also accepts three bounded business operations:

```json
{
  "action": "submit",
  "operation": "post_detail",
  "request": "查看这些 X 帖子的公开详情",
  "target": {"post_ids": ["123456789"]},
  "research_depth": "standard",
  "refresh": false
}
```

```json
{
  "action": "submit",
  "operation": "user_account_post",
  "request": "查看这个小红书账号的公开资料和发布帖子",
  "target": {"user_id": "5fdc60100000000001002787"},
  "research_depth": "standard",
  "refresh": false
}
```

`post_detail` is limited to X Post IDs. `user_account_post` is limited to a Xiaohongshu
profile token or public profile share URL and returns the public profile plus one bounded page of
posts. For posts-only retrieval, use a separate request:

```json
{
  "action": "submit",
  "operation": "user_posts",
  "request": "查看这个小红书账号的公开发布帖子",
  "target": {"share_url": "https://www.xiaohongshu.com/user/profile/abc"},
  "research_depth": "standard",
  "refresh": false
}
```

`user_posts` returns a new bounded task and is not a continuation of `user_account_post`.
Entity submissions must not include topic `scope`/`search` fields or provider-native parameters.
The returned `analysis_id` follows the same status/results protocol; use `social_posts` for X
details or Xiaohongshu user posts, and `social_profiles` or `social_posts` for the Xiaohongshu
account result.

## Unified Social Resource Operations

Submit these through `research_social_signals`. They return an `analysis_id`, use normal status polling, and expose terminal records through `dataset="social_resources"`.

| Operation | Public request boundary | Continuation |
| --- | --- | --- |
| `zhihu_question_detail` | Numeric `question_id` | None |
| `zhihu_answer_detail` | Numeric `answer_id` | None |
| `zhihu_question_answers` | Numeric `question_id`; `limit` 1–100; `order` is `default` or `updated` | Reuse returned `cursor`, `offset`, and `session_id` unchanged |
| `zhihu_hot_list` | Optional integer `limit`; boolean `desktop` | None |
| `zhihu_hot_recommend` | Optional integer `offset`, integer `page_number`, and `session_token` | Reuse returned paging values unchanged |
| `zhihu_preset_search` | No target required | None |
| `xiaohongshu_search_suggestions` | `target.keyword`; empty string requests popular recommendations | None |
| `youtube_search` | `target.keyword`; named-country `target.country_code`; optional `language_code`, `page_number`. See the Skill's YouTube section. | Select one page by number |
| `youtube_channel_search` | `target.keyword` or returned `continuation_token` | Reuse returned token |
| `youtube_channel_id` | `target.channel_url` | None |
| `youtube_channel_detail` | `target.channel_id` or `target.channel_url` | None |
| `youtube_channel_videos` | `target.channel_id` or `target.channel_url` | Reuse returned token |
| `youtube_video_comments` | `target.video_id`; optional `sort_by` | Reuse first-level comment-list token |
| `instagram_general_search` | `target.keyword`; optional `target.pagination_token` | Pass returned token as `target.pagination_token` |
| `instagram_search_users` | `target.keyword` | None |
| `instagram_hashtag_posts` | `target.keyword` without `#`; optional `target.instagram_feed_type` (`top`, `recent`, `reels`) and `target.pagination_token` | Pass returned token as `target.pagination_token` |
| `instagram_user_brief` | Exactly one of numeric `target.instagram_user_id` or `target.instagram_username` | None |
| `instagram_user_info` | Exactly one of numeric `target.instagram_user_id` or `target.instagram_username` | None |
| `instagram_user_posts` | Exactly one of `target.instagram_username` or numeric `target.instagram_user_id`; optional `target.pagination_token` | Pass returned token as `target.pagination_token` |
| `instagram_post_detail` | `target.instagram_code_or_url` (shortcode or public post URL) or public `target.instagram_post_url`; supply only one | None |
| `instagram_post_comments` | `target.instagram_code_or_url` (shortcode or public post URL); optional `target.instagram_comment_sort_by` (`recent` or `popular`) and `target.pagination_token` | Pass returned token as `target.pagination_token` |
| `instagram_shortcode_to_media_id` | `target.instagram_shortcode` without the surrounding URL | None |
| `douyin_video_detail` | Decimal `target.douyin_aweme_id` | None |
| `douyin_video_by_share_url` | Public `target.douyin_share_url` | None |
| `douyin_video_statistics` | 1–100 unique decimal `target.douyin_aweme_ids` | None |
| `douyin_user_profile` | `target.douyin_sec_user_id` | None |
| `douyin_user_posts` | `target.douyin_sec_user_id`; optional `douyin_count`, `douyin_sort_type`, and `douyin_channel` | Pass returned `next_cursor` as `target.douyin_max_cursor` |
| `douyin_general_search_v1` | `target.douyin_keyword`; optional search filters | Pass returned cursor, `search_id`, and `backtrace` as matching `target.douyin_*` fields |
| `douyin_search_suggest` | `target.douyin_keyword` | None |
| `douyin_user_search` | `target.douyin_keyword`; optional `douyin_user_fans`, `douyin_user_type` | Pass returned cursor and `search_id` as matching `target.douyin_*` fields |
| `douyin_challenge_search_v1` | `target.douyin_keyword`; optional search filters | Pass returned cursor, `search_id`, and `backtrace` as matching `target.douyin_*` fields |
| `douyin_hot_video_list` | Optional `douyin_page`, `douyin_page_size`, `douyin_date_window`, `douyin_keyword`, `douyin_billboard_sub_type` | Increase `target.douyin_page` for next page |
| `douyin_hot_topic_list` | Optional `douyin_page`, `douyin_page_size`, `douyin_date_window`, `douyin_keyword` | Increase `target.douyin_page` for next page |
| `douyin_hot_search_list` | Optional `douyin_page`, `douyin_page_size`, `douyin_date_window`, `douyin_keyword` | Increase `target.douyin_page` for next page |
| `tiktok_post_detail` | Decimal `target.tiktok_item_id` | None |
| `tiktok_trending_searchwords` | No target fields | None |
| `tiktok_user_profile` | `target.tiktok_unique_id` or `target.tiktok_sec_uid` | None |
| `tiktok_user_posts` | `target.tiktok_sec_uid`; optional `tiktok_count` (1–15), `tiktok_cover_format` (1 or 2) | Pass returned `cursor` as `target.tiktok_cursor` |
| `tiktok_post_comments` | Decimal `target.tiktok_item_id`; optional `tiktok_count`, `tiktok_region` | Pass returned `cursor` as `target.tiktok_cursor` |
| `tiktok_search_suggest` | `target.tiktok_keyword` | None |
| `tiktok_user_search` | `target.tiktok_keyword`; optional `tiktok_search_count`, `tiktok_user_follower_count`, `tiktok_user_profile_type`, `tiktok_user_other_pref` | Pass returned `cursor` as `target.tiktok_offset` |
| `tiktok_general_search` | `target.tiktok_keyword`; optional `tiktok_search_count`, `tiktok_search_sort_type`, `tiktok_publish_time` | Pass returned `cursor` as `target.tiktok_offset` |
| `tiktok_top_contents` | Required `target.tiktok_period_end_timestamp` (10-digit UTC Unix seconds); optional `tiktok_period_dimension` (1 weekly, 3 daily default, 5 long period), `tiktok_region` (supplier `country_code`, default `US`), `tiktok_content_label_ids` (comma-separated category IDs), `tiktok_order_by_metric` (1 views, 2 engagement, 3 six-second view rate), `tiktok_organic_only`, `tiktok_page` (default 1), `tiktok_limit` (default 20, max 100). See the Skill's TikTok section for all 15 category IDs and date selection. | Increase `target.tiktok_page` while `data.pagination.hasMore` is true; never auto-change dates after an empty ranking |

Resource results expose submitted public parameters, capture time, and sanitized business `data`; provider envelope metadata is not part of the public contract. Threads is currently available only as a topic-search platform through `research_social_signals`; the unified public schema does not expose Threads profile, user-post, or single-post retrieval. The live input schema takes precedence over this summary.

YouTube is a named Social resource operation. Use the stable `channel_id` returned by URL resolution or search; a handle is not an ID. Read its terminal records from `social_resources`, and follow the live schema for optional fields and pagination.

## Tool: `research_seo_signals`

Use `scope.domain` for traditional keyword/SERP/trend research, competitor analysis, and GEO
visibility. Use `scope.target` for backlink, ranked-keyword, or traffic research when the target is a
domain, subdomain, or webpage URL. `domain` and `target` are mutually exclusive. Every formal research submit must
include a non-empty, unique `scope.data_scopes` list. Select the smallest useful evidence set for the
user's goal; omission is invalid and never means “all.” Interpret intent semantically rather than
requiring users to name a Dataset or use one of the examples below verbatim.

Submit a traditional or domain-based analysis:

```json
{
  "action": "submit",
  "operation": "research",
  "request": "Research demand and current SERP patterns for AI SEO tools",
  "scope": {
    "keyword": "AI SEO tools",
    "domain": "example.com",
    "market": "US",
    "language": "en",
    "data_scopes": ["keyword_overview", "serp"]
  },
  "research_depth": "standard",
  "refresh": false
}
```

Poll the returned analysis after `retry_after_seconds` with the same authenticated connection. Once it has results, read
one matching Dataset at a time:

```json
{"action":"get","operation":"research","analysis_id":"<analysis_id>","view":"status"}
```

```json
{"action":"get","operation":"research","analysis_id":"<analysis_id>","view":"results","dataset":"keyword_overview"}
```

For an explicit free keyword difficulty request on an authenticated connection, submit once:

```json
{
  "action": "submit",
  "operation": "free_keyword_difficulty",
  "free_query": {
    "keyword": "AI SEO tools",
    "market": "US",
    "language": "en",
    "output_language": "en"
  }
}
```

While the free response is pending or running, wait for `poll_after_seconds` and read it with
only these fields. Copy the full returned `analysis_id` unchanged and keep the same connection:

```json
{"action":"get","operation":"free_keyword_difficulty","analysis_id":"<analysis_id>"}
```

For an explicit quota check, send `{"action":"quota","operation":"free_keyword_difficulty"}`
on the authenticated connection.

For a domain-level AI-search score with benchmark and citation evidence, use the same SEO Tool with
the exclusive `geo_score` scope. It currently uses the fixed US/en comparison scope and does not
accept a keyword:

```json
{
  "action": "submit",
  "request": "Score example.com's AI-search visibility and show the evidence",
  "scope": {
    "domain": "example.com",
    "market": "US",
    "language": "en",
    "data_scopes": ["geo_score"]
  },
  "research_depth": "standard",
  "refresh": false
}
```

For a page-level ranked-keyword, backlink, or traffic request, replace `domain` with `target`:

```json
{
  "action": "submit",
  "request": "Research the keywords this page ranks for",
  "scope": {
    "keyword": "AI SEO tools",
    "target": "https://example.com/docs/ai-seo",
    "market": "US",
    "language": "en",
    "data_scopes": ["ranked_keywords"]
  },
  "research_depth": "standard",
  "refresh": false
}
```

Status uses the same explicit `view="status"` shape as Social. Results use `view="results"` with one SEO Dataset such as `related_keywords` or `serp_results`.

Supported `data_scopes` are:

- `keyword_overview`
- `domain_rank_overview`
- `related_keywords`
- `serp`
- `google_trends`
- `x_recent_search`
- `competitor_analysis`
- `geo_analysis`
- `geo_score`
- `backlink_analysis`
- `ranked_keywords`
- `bulk_traffic_estimation`

Do not submit `bulk_pages_summary` to the unified Tool. It is not a public Dataset in this contract.

`backlink_analysis`, `ranked_keywords`, and `bulk_traffic_estimation` are target-level scopes with
distinct meaning and cost. Include any combination reasonably needed for the requested outcome, but
do not infer unrelated families merely because a target is present. The examples are semantic guidance,
not keyword triggers. Ask for clarification only when alternatives materially change cost, target
interpretation, or the answer. If one goal needs both domain-based and target-level evidence, submit the
minimum separate analyses required by the mutually exclusive inputs and keep their `analysis_id` values
separate.

The public result Dataset mapping is:

| Evidence family | Dataset | Pagination |
| --- | --- | --- |
| Keyword metrics and intent | `keyword_overview` | No; one aggregate record |
| Domain rank overview | `domain_rank_overview` | No; one aggregate record |
| Related keywords | `related_keywords` | Yes |
| Organic SERP results | `serp_results` | Yes |
| Google Trends snapshot | `google_trends` | No; one aggregate record |
| Bounded X recent-search posts | `x_recent_search` | Yes |
| Competitor domain/site evidence | `competitor_domains` | Yes |
| GEO/AI-search evidence | `geo_mentions` | Yes |
| Domain Geo Score, benchmark, mentions, and target citations | `geo_score` | No; one aggregate record |
| Ranked keywords | `ranked_keywords` | Yes |
| Backlinks and referring domains | `backlinks` | Yes |
| Traffic estimation | `traffic_estimation` | No; one aggregate record |

For a paginated Dataset, request the first page without `result_cursor`, then pass only the returned
`page.next_cursor` with the same ordered `analysis_ids` and Dataset. For a non-paginated Dataset,
`page.has_more` is false and `page.next_cursor` is null; do not attempt to split nested arrays inside
the aggregate record.

## Public Response

Legacy calls without `view` return the original response envelope:

- `analysis_id`: opaque identifier used for every later `get`.
- `status`: `queued`, `running`, `completed`, `partial`, or `failed`.
- `retry_after_seconds`: present only while non-terminal.
- `coverage`: actual source/status/count boundaries.
- `evidence`: public evidence only.
- `limitations`: safe, user-relevant gaps.
- `has_more_results`: whether another already-collected result page exists.
- `next_result_cursor`: opaque SignalDig cursor for the next result page.

New status responses return `schema_version`, ordered `analyses`, `coverage`, and `limitations` without result bodies.
For `queued` or `running` analyses, the analysis status is authoritative. Coverage values are
provisional and must not be interpreted as source failure or exhaustion; wait for the terminal state.
At a terminal state, an evidence family with no records remains part of reported coverage. Treat it as
a limitation; do not resubmit, broaden scope, or discard successful families solely because it is empty.

New result responses return:

- `schema_version` and the selected `dataset`.
- ordered `analyses` with per-task status.
- `items`, where every record includes `analysis_id`, `record_id`, `schema_version`, `source`, and public `data`.
- `page.returned_count`, `page.has_more`, `page.next_cursor`, and `page.stop_reason`.
- actual `coverage` and safe `limitations`.

Use `page.next_cursor` as the next call's `result_cursor` only with the same account, tool direction, ordered analysis IDs, and Dataset. A smaller-than-requested page can be a response-size safety boundary; it does not imply missing provider data.
One results call reads one page. A request for "more" without a count authorizes at most one additional
page. An explicit request for `N` more pages authorizes at most `N` additional calls, stopping early when
`page.has_more` is false. For "all results" or a complete export without a page limit, ask the user for a
maximum page count instead of following cursors without a fixed bound. When the budget ends while
`page.has_more` is true, report that more collected results remain.

Never infer internal providers, workflows, operations, bindings, storage, prompts, or native pagination state from this response.

Social topic requests support `result_budget.total` (default 50, range 1–200).
Formal terminal statuses use `completed`, `partial`, or `failed`; free responses use
`complete`, `partial`, or `failed`. Outer `page.has_more` covers records in the current
analysis. Nested continuation fields describe another source page and require a new bounded
resource submit when further collection is wanted. YouTube search uses `page_number`.
For YouTube, `language_code` defaults to `en` on search and `zh-CN` on channel
detail, channel videos and comments. Set it explicitly when a language is required.
Search records can be weakly related; evaluate each record against the user's topic.
