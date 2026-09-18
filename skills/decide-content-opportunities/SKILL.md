---
name: decide-content-opportunities
description: Compatibility entry for existing SignalDig content-opportunity users. Route evidence collection to research-growth-signals and use its unified SEO research contract; do not call the retired Decision MCP or maintain separate request parameters.
slug: decide-content-opportunities
displayName: Decide Content Opportunities
version: 1.5.5
summary: Compatibility entry for content-opportunity research through the unified Research Growth Signals Skill.
tags: [content, compatibility, mcp, signaldig]
license: MIT
metadata:
  version: "1.5.5"
  homepage: "https://signaldig.com/"
---

# Decide Content Opportunities — Compatibility Entry

This Skill name remains available for existing users during the migration period. Its former Decision MCP contract is frozen and must not receive new capabilities, parameters, or decision-service logic.

The server alias and any local tool namespace are client-defined. Never expose machine error codes in a user-facing response.

## Required Delegation

1. Load and follow `$research-growth-signals` as the only maintained SignalDig retrieval contract.
2. Translate the user's decision question into the smallest sufficient unified SEO evidence request through `research_seo_signals`.
3. Keep observations, inference, and any conditional recommendation distinct. Never imply that the retired Decision MCP produced a report.
4. Never call the former Decision MCP tools, construct its request schema, or reuse its polling parameters.
5. This compatibility entry ships no independent MCP contract, setup guide, decision template, or execution examples. Use only the unified Skill as the current source of truth.

If `$research-growth-signals` or the unified SignalDig MCP is unavailable, stop and tell the user to install or update the unified SignalDig Skill and connection. Do not fall back to the legacy contract and do not simulate evidence or decisions.

This compatibility entry may be removed only after the unified Skill has completed at least one stable release cycle and usage data confirms that this legacy Skill is no longer invoked.
