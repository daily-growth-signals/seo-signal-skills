# Social Tool Parameter Guide

Read the section for the selected tool before calling it. Explain unfamiliar parameters in plain language and validate user-supplied values. Never expose internal implementation details.

## Contents

- [Shared parameters](#shared-parameters)
- [WeChat Official Account](#wechat-official-account)
- [Xiaohongshu creator notes](#xiaohongshu-creator-notes)
- [Xiaohongshu keyword search](#xiaohongshu-keyword-search)
- [LinkedIn member activity](#linkedin-member-activity)
- [X post search](#x-post-search)
- [X trends](#x-trends)
- [Reddit search](#reddit-search)
- [Zhihu search](#zhihu-search)

## Shared parameters

### `idempotency_key`

An optional client-generated identifier for safely retrying exactly the same logical request. The user normally does not need to provide it. Reuse it only when every retrieval parameter and page are unchanged. On a temporary or parse-related failure, retain this key for up to three recovery attempts so SignalDig reopens the same `request_id` and checks its private Provider archive before any new live request. Generate a new value for a different query, filter, account, or page, or only after those three same-request recovery attempts are exhausted. Never present it as a social-platform identifier.

### Opaque pagination values

Values such as `next_token`, `cursor`, `next_cursor`, `offset`, `next_offset`, `pagination_token`, `search_id`, `search_session_id`, and `search_hash_id` are continuation state returned by a previous result. They are not page descriptions and must not be decoded, edited, guessed, or moved to another search context.

For a first page, omit the optional token or use the documented empty/default value. For another page, use only the continuation value returned for the same account, query, and filters.

### Atomic pagination transitions

A page is identified by the complete set of stable retrieval inputs and pagination inputs, not by one token or offset in isolation. After a successful page:

1. Keep the account identity, query, activity/content type, sorting, filters, time bounds, and page size unchanged.
2. Copy every continuation value required by the selected tool from that response.
3. Advance every numeric page or offset field required by the selected tool at the same time.
4. Send one next-page request containing the complete new pagination state and a new `idempotency_key`.

Never discover the right combination by issuing separate paid calls such as “new token with old offset” followed by “new offset without token.” If the previous response does not provide enough state to construct the next page, stop instead of guessing.

| Tool | First page | Later page |
| --- | --- | --- |
| `get_wechat_account_articles` | `offset=""` | Set `offset` to the previous `next_offset` unchanged. |
| `get_xiaohongshu_user_posts` | `cursor=""` | Set `cursor` to the previous `next_cursor` unchanged; stop when `has_more=false`. |
| `search_xiaohongshu_notes` | `page=1`, no search identifiers | Increment `page` and preserve the previous `search_id` and `search_session_id` when returned. |
| `get_linkedin_user_posts` | `start=0`, `pagination_token` omitted/null | Increase `start` by 50 and set `pagination_token` to the previous response's token in the same request. |
| `search_x_posts` | no `next_token` | Set `next_token` to the previous response's value and keep every other search input unchanged. |
| `search_zhihu_articles` | documented initial pagination defaults | Carry forward returned continuation fields and update the documented offset together; never invent either value. |

## WeChat Official Account

Tool: `get_wechat_account_articles`

### `username`

The public MCP field is named `username`, but its value must be the WeChat Official Account original ID, also commonly called `gh_name`, `gh_id`, `gh_username`, or **原始ID**. It is not the visible account name, WeChat ID shown for search, article author nickname, Biz value, app ID, or article URL.

The original ID is assigned by WeChat when the account is registered. It normally begins with `gh_` followed by letters, digits, or underscores, for example `gh_a1b2c3d4e5f6`. It acts as a unique, permanent identifier for that Official Account.

Ways to obtain it:

- Administrator: sign in to the WeChat Official Accounts Platform, open **设置 → 公众号设置 → 账号详情**, and find **原始ID** near the registration information.
- From a public article: inspect the page source and search for `user_name`, `gh_`, or a `user_name` assignment. Use the `gh_...` value associated with the publisher. Page structure can change, so verify the value against another article from the same account when possible.

Validation reminders:

- Accept only a value matching `gh_` plus letters, digits, or underscores, with a maximum length of 64.
- If the caller gives a display name such as “人民日报”, explain that it is insufficient and request the original ID.
- If the caller gives a public article URL, do not pretend the URL itself is `username`. Extract the original ID only if page inspection is available and the value is unambiguous; otherwise explain how to obtain it.

### `page_size`

The number of source objects requested in one page. It must be an integer from 10 to 20; the default is 20. Do not pass values such as 1, 50, or `"20 articles"`.

### `offset`

The continuation cursor. Use an empty string for the first page. For the next page, pass the previous response's `next_offset` unchanged. Do not use a numeric page number or construct an offset.

### `item_show_type`

An optional content-tab filter:

- `0`: articles;
- `5`: videos;
- `7`: audio;
- `8`: image-text posts.

Omit it when the caller did not request a specific tab. Do not infer the value from a title or visible account category.

### Returned metrics

`read_count`, `like_count`, `comment_count`, `share_count`, and `watching_count` are separate native counts. Missing values remain unknown. Reads are not guaranteed unique people or impressions. Return normalized numeric fields directly; do not return display prose such as `showDesc` as a substitute. Preserve `raw_data` when raw source objects were requested.

## Xiaohongshu creator account

Tool: `get_xiaohongshu_user_posts`

Use this combined tool when the caller provides a Xiaohongshu account URL, profile share link, or valid profile user token and wants account-level source data. It returns public profile fields together with one page of published notes. Do not look up a creator by keyword and pretend the first search result is the requested account.

### `user_id`

A Xiaohongshu creator's 24-character hexadecimal profile token. It is the path segment after `/user/profile/` in a public profile URL. For example, in `https://www.xiaohongshu.com/user/profile/5fdc60100000000001002787`, pass `5fdc60100000000001002787` as `user_id`.

It is not the visible Xiaohongshu number such as `1017613851`, creator nickname, note ID, keyword, profile display name, or the complete profile URL. Never invent or reconstruct it from a nickname or visible account number.

Use `user_id` when it is already known from a Xiaohongshu profile/share payload or a previous trusted result. If the caller supplies both `user_id` and `share_text`, the tool prioritizes `user_id`.

### `share_text`

The copied Xiaohongshu share link or the full share text containing that link. Use this when the caller does not know `user_id`. A creator profile share is preferable. If the text points only to a note, state that creator resolution depends on what the live source exposes; do not claim the note ID is a user ID.

Before calling:

- If the caller pastes an `http://` or `https://` Xiaohongshu share link into `user_id`, move it to `share_text` only after explaining the correction.
- If the caller pastes a complete `/user/profile/<token>` URL, extract the 24-character `<token>` only after confirming the path shape.
- Reject a visible numeric Xiaohongshu number as `user_id`; ask for the public profile URL or a valid share link instead.
- If the caller gives only a nickname, ask for a profile share link or a trusted `user_id`; nicknames are not unique.
- Require a valid `https://` link in `share_text`. A malformed value such as `ttps://...` must be corrected before calling the tool.
- At least one of `user_id` or `share_text` is required.

### `cursor`

Use an empty string for the first page. For another page, pass `next_cursor` unchanged. Stop when `has_more` is false. Never use a note ID, page number, or keyword-search token as this cursor.

Another page is still the same creator-history retrieval. Reuse only the returned cursor and preserve the same identity. Do not automatically fetch all pages merely because the caller says “分析账号”; first establish the time range, note count, or pagination depth needed by the downstream analysis.

## Xiaohongshu keyword search

Tool: `search_xiaohongshu_notes`

### `query`

A focused search phrase from 1 to 256 characters. Prefer the product/category name plus one meaningful need, problem, audience, or use case. Do not blindly append broad marketing words. If the user's wording is ambiguous, propose two or three explicit variants and say how they differ before searching.

### `page`

A one-based page number. Use `1` for the initial request. Do not increment it for continuation unless the same search context also preserves any returned `search_id` and `search_session_id` required by the live result.

### `sort_type`

- `general`: platform default/general ordering;
- `time_descending`: newest first;
- `popularity_descending`: popularity first;
- `comment_descending`: comment count first;
- `collect_descending`: collect count first;
- `english_preferred`: English-preferred ordering.

Use only these exact values. A user phrase such as “最新” maps unambiguously to `time_descending`; “最热门” may map to `popularity_descending`, but explain that popularity is the platform's ordering rather than a custom score.

### `note_type`

Allowed exact values are `不限`, `视频笔记`, `普通笔记`, and `直播笔记`. Default to `不限` unless the caller asks for a specific format.

### `time_filter`

Allowed exact values are `不限`, `一天内`, `一周内`, and `半年内`. Do not translate unsupported requests such as “最近一个月” to a different window without telling the caller that the exact filter is unavailable.

### `search_id` and `search_session_id`

Continuation identifiers returned by an earlier page. Never create them. Keep them with the same query, sort, note type, and time filter.

## LinkedIn member activity

Tool: `get_linkedin_user_posts`

This combined request returns public member profile fields together with one page of the selected activity. The profile is account context, not a second post source; all content items come from the returned `posts` page.

### `profile_url`

A full HTTPS LinkedIn **member** profile URL whose path begins with `/in/`, for example `https://www.linkedin.com/in/example-name/`. It is not a company page under `/company/`, a post URL, search-results URL, Sales Navigator URL, email address, or profile name.

If the caller supplies a company URL, explain that this tool supports members only. If tracking parameters are present, the canonical `/in/.../` URL is preferable, but do not change the member identity.

### `activity_type`

- `posts`: content authored or posted by the member; default;
- `comments`: content the member commented on;
- `reactions`: content the member reacted to.

Do not use `comments` or `reactions` merely to seek more data. Select them only when the caller asks for that activity type.

### `start` and `pagination_token`

`start` is a non-negative page offset and advances in steps of 50. `pagination_token` is opaque continuation state returned by the preceding response. They form one atomic pagination state:

- page 1: `start=0`, `pagination_token=null` (or omit it);
- page 2: `start=50`, `pagination_token=<exact token returned by page 1>`;
- page 3: `start=100`, `pagination_token=<exact token returned by page 2>`.

For every later page, advance `start` by 50 and replace `pagination_token` with the immediately preceding response's token in the same request. Keep `profile_url` and `activity_type` unchanged. Never call with a new token and the old `start`, a new `start` and a null/old token, or a token from another member/activity type. If the preceding response has no token, do not guess one or issue an offset-only probe.

## X post search

Tool: `search_x_posts`

### `query`

A raw X query expression from 1 to 512 characters. X search is primarily literal. Build focused expressions from exact names, spelling variants, languages, problem statements, or use cases. Use uppercase `OR`, quotes for exact phrases, and supported operators such as `-is:retweet` or `lang:en` only when they help the stated request.

Filters such as `lang:`, `is:`, and `has:` cannot stand alone; include a keyword, phrase, hashtag, mention, `from:`, or `to:` expression. Chinese language codes are `zh-CN` or `zh-TW`, not `zh`.

### `max_results`

The page size; default 50. Use 10–100 for `recent` and 10–500 for `all`. This is not a total-result guarantee.

### `search_mode`

- `recent`: search X's current recent window, currently the previous seven days;
- `all`: request Full-archive Search for older historical coverage.

Default to `recent` for current conversations. Use `all` only when the requested period extends beyond the recent window or the caller explicitly asks for historical coverage. Full-archive access depends on the configured X tier; do not silently fall back to `recent` and claim the older period was searched.

### `sort_order`

- `recency`: newer matching posts first;
- `relevancy`: relevance-ranked matching posts.

Do not label either option “best”. Use the one matching the caller's retrieval goal, or keep separate result sets if both were explicitly requested.

### `start_time` and `end_time`

Timezone-aware ISO 8601 timestamps. `start_time` is inclusive; `end_time` is exclusive and must be later. In `recent` mode the start must remain inside X's recent window; select `all` for older boundaries. For a current search, normally omit `end_time`. Do not place web-search syntax such as `since:2026-08-01` in the query when these fields are available.

### `since_id` and `until_id`

Known X Post ID boundaries, not dates or arbitrary counters. Use them only when the caller or previous trusted state provides a meaningful checkpoint. Never derive a Post ID from a timestamp.

### `next_token`

Use only the token returned by the previous page with `search_mode`, query, page size, sort, and every time/ID boundary unchanged. Stop when it is null. Preserve returned `newest_id`, `oldest_id`, and `previous_token` as pagination context, but do not construct a forward token from them.

## X trends

Tool: `get_x_trends`

### `country_name`

An optional canonical English country name such as `Japan` or `United States`. Translate a localized country name such as `日本` to `Japan`. Do not pass ISO codes such as `JP`, city names, or WOEIDs. Omit the parameter for worldwide trends. Preserve the user's original wording so an unsupported-country error can be explained without guessing.

### `max_trends`

The maximum number of returned trend entries, from 1 to 50; default 20. It is not a popularity threshold.

## Reddit search

Tool: `search_reddit_posts`

### `query`

A focused natural-language search query from 1 to 512 characters. Include a product/category and the relevant problem, question, or use case. Do not pass X-only operators, X timestamps, Post IDs, or pagination tokens.

### `sort`

The Reddit-native result ordering. The default is `RELEVANCE`.

- `RELEVANCE`: relevance-ranked results;
- `HOT`: currently active or hot results;
- `TOP`: highest-ranked results within the selected `time_range`;
- `NEW`: newest results first;
- `COMMENTS`: results ordered by comment count.

Use only these exact uppercase values. Keep `RELEVANCE` when the caller has no ranking preference. Do not describe `HOT`, `TOP`, or `COMMENTS` as a custom SignalDig score.

### `time_range`

The Reddit-native time window. The default is `all`.

- `all`: all available time;
- `year`: previous year;
- `month`: previous month;
- `week`: previous week;
- `day`: previous day;
- `hour`: previous hour.

Use only these exact lowercase values. This filter materially affects coverage, especially with `TOP`; preserve the caller's explicit window and report it with the result boundary. Do not translate an unsupported custom date interval into one of these windows without explaining the approximation.

The tool still exposes no pagination input. Changing `sort` or `time_range` creates a different logical search, so use a new `idempotency_key`.

## Zhihu search

Tool: `search_zhihu_articles`

### `keyword`

The exact raw keyword. Preserve user-supplied whitespace, language, and wording because this endpoint passes values through unchanged. If the caller asks for suggested queries rather than supplying a fixed value, present the focused alternatives first and call only the agreed or clearly intended one.

### Pagination and filters

- `offset`: string page offset; default `"0"`.
- `limit`: string page size; default `"20"`.
- `show_all_topics`: `0` or `1`; default `0`.
- `search_source`: `Normal` or `Filter`; default `Normal`.
- `search_hash_id`: continuation identifier returned by an earlier search.
- `vertical`: empty, `answer`, `article`, or `zvideo`.
- `sort`: empty, `upvoted_count`, or `created_time`.
- `time_interval`: empty, `a_day`, `a_week`, `a_month`, `three_months`, `half_a_year`, or `a_year`.
- `vertical_info`: opaque source value returned or explicitly provided for the same search context.

Preserve all user-supplied values exactly, including string pagination and leading zeros. Never invent continuation fields or silently replace an unsupported value with a nearby filter.

## Safe failure handling

Technical diagnostics are not user data. Never repeat response JSON, documentation or support links, request traces, routes, cache links, debug payloads, headers, system timestamps, or charge messages.

- For an invalid public input, name only the invalid field, explain the expected public format, and show how the user can obtain or correct it.
- For a temporary upstream failure, return only the stable SignalDig error meaning: social data is temporarily unavailable; retry the same logical request later.
- A response can have an outer success code while its nested `data` contains an error. Treat that as failure, not as empty or successful data.
- For WeChat article/account retrieval failures, never expose nested `error`, `message`, `debug_id`, or `debug_info`. Ask the user to verify the public account original ID or article URL only when that is the actionable public input.
