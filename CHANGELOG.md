# Changelog

This file records user-facing changes only. Do not include commits, refactoring details, migration history, or internal implementation notes. Before a release, a human or AI drafts `[Unreleased]`; after human review, run `bash scripts/prepare-release-notes.sh vX.Y.Z` to finalize both language versions.

## [Unreleased]

### Changes

- To be added.

## [1.6.1] - 2026-09-04

### Changes

- `research-social-signals` can resolve public X post URLs to numeric Post IDs before calling the specific-post retrieval tool, preserving the original URL-to-ID mapping and retrieval boundary.

## [1.6.0] - 2026-08-27

### Changes

- `research-seo-signals` adds ranked-keyword inventory (`submit_ranked_keywords`) and bulk traffic estimation (`submit_bulk_traffic_estimation`) tools to list the keywords a domain currently ranks for and estimate their traffic.
- Backlink-analysis input now uses `target`: pass a domain or subdomain without a scheme and `www.`, or an absolute webpage URL; added the `domain` vs `target` distinction and missing-target prompts.

## [1.5.0] - 2026-08-27

### Changes

- Decoupled the SEO research and content-decision skills: `research-seo-signals`, `research-social-signals`, and `decide-content-opportunities` are now fully independent skills with no cross-references. Using one skill no longer redirects you to another.
- `research-seo-signals` now returns evidence summaries only and never produces recommendations or decisions; `decide-content-opportunities` now consumes only the evidence its own Decision MCP returns.
- Updated the English and Chinese READMEs to describe the skills as independent tools rather than a single evidence pipeline.

## [1.4.0] - 2026-08-26

### Changes

- Normalize skill versions to the `1.x.0` format, and keep each skill's SKILL.md version consistent with its SkillHub metadata version.

## [1.3.0] - 2026-08-26

### Changes

- SEO signal research adds three analysis types: competitor analysis (`submit_competitor_analysis`), GEO/AI-search visibility analysis (`submit_geo_analysis`), and backlink and referring-domain analysis (`submit_backlink_analysis`), extending keyword-and-domain research with competitor, AI-search visibility, and backlink data.
- The three skills (SEO signal research, social signal research, and content opportunity decisions) now gate on MCP availability: when the required MCP server is not connected, its tools are missing, or the API key is invalid, the skill stops immediately instead of simulating, guessing, or answering from general knowledge, and directs the user to connect the required server so they are not misled into thinking real data was returned.
- Each skill adds a client setup guide (references/setup-guide.md) with MCP connection steps, verification, and troubleshooting for Claude Code, Cursor, Codex, Windsurf, and other clients.
- Skill descriptions now state the install boundary up front: installing a Skill does not connect the MCP server; a SignalDig API key and the matching MCP server must be configured separately so users do not assume it works immediately after install.

## [1.2.3] - 2026-08-18

### Changes

- Clarified status semantics for SEO and social signals: freshness notes (such as stale data or unknown freshness) are quality notes, not outages; no-matching-data and empty results should not be retried, and only an explicit temporary unavailability enters the recovery or retry flow.
- Content-opportunity decisions proceed with partial data: an empty family such as no matching data is not a service outage, and a recommendation can be given from remaining evidence with the gap disclosed; a refusal is required only when every selected family is empty or the job failed.

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
