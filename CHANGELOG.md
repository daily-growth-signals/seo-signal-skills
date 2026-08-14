# Changelog

This file records user-facing changes only. Do not include commits, refactoring details, migration history, or internal implementation notes. Before a release, a human or AI drafts `[Unreleased]`; after human review, run `bash scripts/prepare-release-notes.sh vX.Y.Z` to finalize both language versions.

## [Unreleased]

### Changes

- To be added.

## [1.2.2] - 2026-08-14

### Changes

- Reddit post search adds native sorting and time-range filters: order results by relevance, hot, top, newest, or comment count, and limit coverage to all time or the past year, month, week, day, or hour.
- Social data failures now prefer archive-first recovery: preserve the original inputs and idempotency key, and poll or retry the same request so already-fetched data can be reused, up to three same-request recovery attempts before a new paid request is allowed; error messages no longer expose underlying details.
- X post search now runs through an independently published default workflow, decoupled from the legacy search workflow definition.

## [1.2.1] - 2026-08-13

### Changes

- X post search adds a historical mode: it searches recent posts by default and can also search posts from older time ranges when historical access is available, supporting long-range research.
- Historical searches support fetching more results at once, and paging stops naturally once results are exhausted, so there is no need to manually check for more content.
- Clarified the boundary of historical search: without the required access, it will not silently fall back and claim that older time ranges were covered.

## [1.2.0] - 2026-08-12

### Changes

- Social signal retrieval now supports Xiaohongshu, LinkedIn, and WeChat Official Account data, including public profiles, content, and platform-native engagement metrics.
- Xiaohongshu and LinkedIn account content use clearly named user-post tools so AI can select the correct data source.
- Added input guidance and correction prompts for Xiaohongshu user IDs, WeChat original IDs, LinkedIn profile URLs, and pagination values.
- Improved safe error messages for social data retrieval so temporary failures can be retried without exposing underlying service details.
- Narrowed SEO and social retrieval scope so the requested data is confirmed before calling tools, reducing irrelevant searches.
- Reframed Skill documentation for end users: retrieval Skills provide underlying signals and usage boundaries without account scoring or business decisions.
