# Changelog

This file records user-facing changes only. Do not include commits, refactoring details, migration history, or internal implementation notes. Before a release, a human or AI drafts `[Unreleased]`; after human review, run `bash scripts/prepare-release-notes.sh vX.Y.Z` to finalize both language versions.

## [Unreleased]

### Changes

- To be added.

## [1.2.0] - 2026-08-12

### Changes

- Social signal retrieval now supports Xiaohongshu, LinkedIn, and WeChat Official Account data, including public profiles, content, and platform-native engagement metrics.
- Xiaohongshu and LinkedIn account content use clearly named user-post tools so AI can select the correct data source.
- Added input guidance and correction prompts for Xiaohongshu user IDs, WeChat original IDs, LinkedIn profile URLs, and pagination values.
- Improved safe error messages for social data retrieval so temporary failures can be retried without exposing underlying service details.
- Narrowed SEO and social retrieval scope so the requested data is confirmed before calling tools, reducing irrelevant searches.
- Reframed Skill documentation for end users: retrieval Skills provide underlying signals and usage boundaries without account scoring or business decisions.
