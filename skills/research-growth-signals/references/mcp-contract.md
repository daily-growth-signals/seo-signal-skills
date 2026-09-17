# SignalDig Unified Research MCP Contract

The public connection exposes exactly two business tools. The live tool schema is authoritative.

## Tool: `research_social_signals`

Submit:

```json
{
  "action": "submit",
  "request": "Research recent GPT-6 discussions, concerns, and expectations",
  "scope": {
    "platforms": ["xiaohongshu", "x", "reddit", "zhihu"],
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

The public topic-search source list is X, Reddit, Xiaohongshu, and Zhihu. All four use the same `research_social_signals` Tool and `social_posts` Dataset. This list describes SignalDig's user-facing coverage; it does not reveal or select an underlying data provider. Source-specific limits and unsupported constraints are reported through `coverage` and `limitations`.

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

## Tool: `research_seo_signals`

Submit:

```json
{
  "action": "submit",
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

Status uses the same explicit `view="status"` shape as Social. Results use `view="results"` with one SEO Dataset such as `related_keywords` or `serp_results`.

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

New result responses return:

- `schema_version` and the selected `dataset`.
- ordered `analyses` with per-task status.
- `items`, where every record includes `analysis_id`, `record_id`, `schema_version`, `source`, and public `data`.
- `page.returned_count`, `page.has_more`, `page.next_cursor`, and `page.stop_reason`.
- actual `coverage` and safe `limitations`.

Use `page.next_cursor` as the next call's `result_cursor` only with the same account, tool direction, ordered analysis IDs, and Dataset. A smaller-than-requested page can be a response-size safety boundary; it does not imply missing provider data.

Never infer internal providers, workflows, operations, bindings, storage, prompts, or native pagination state from this response.
