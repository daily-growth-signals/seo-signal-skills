---
name: research-social-signals
description: Compatibility entry for existing SignalDig social-research users. Route social-data requests to the unified research-growth-signals Skill and its research_social_signals tool; do not use legacy platform tools or maintain separate parameter rules.
license: MIT
metadata:
  version: "1.6.7"
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
5. Do not read this directory's historical parameter or MCP references for live execution; they are retained only for release history and rollback review.

If `$research-growth-signals` or the unified SignalDig MCP is unavailable, stop and tell the user to install or update the unified SignalDig Skill and connection. Do not fall back to the legacy contract and do not simulate results.

This compatibility entry may be removed only after the unified Skill has completed at least one stable release cycle and usage data confirms that this legacy Skill is no longer invoked.
