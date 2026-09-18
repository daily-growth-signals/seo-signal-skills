---
name: research-social-signals
description: Compatibility entry for existing SignalDig social-research users. Route social-data requests to the unified research-growth-signals Skill and its research_social_signals tool; do not use legacy platform tools or maintain separate parameter rules.
slug: research-social-signals
displayName: Research Social Signals
version: 1.6.8
summary: Compatibility entry for social research through the unified Research Growth Signals Skill.
tags: [social, compatibility, mcp, signaldig]
license: MIT
metadata:
  version: "1.6.8"
  homepage: "https://signaldig.com/"
---

# Retrieve Social Signals — Compatibility Entry

This Skill name remains available for existing users during the migration period. Its former execution contract is frozen and must not receive new capabilities, parameters, examples, or platform-specific logic.

The server alias and any local tool namespace are client-defined. Never expose machine error codes in a user-facing response.

## Required Delegation

1. Load and follow `$research-growth-signals` as the only maintained execution contract.
2. Preserve the user's social-research intent and select the unified `research_social_signals` business tool through that Skill.
3. Use only the unified Skill's current request, status, Dataset, budget, and result-cursor rules.
4. Never call the former platform-specific Social MCP tools, construct native platform operators, or reuse legacy pagination parameters.
5. This compatibility entry ships no independent MCP contract, setup guide, parameter guide, or execution examples. Use only the unified Skill as the current source of truth.

If `$research-growth-signals` or the unified SignalDig MCP is unavailable, stop and tell the user to install or update the unified SignalDig Skill and connection. Do not fall back to the legacy contract and do not simulate results.

This compatibility entry may be removed only after the unified Skill has completed at least one stable release cycle and usage data confirms that this legacy Skill is no longer invoked.
