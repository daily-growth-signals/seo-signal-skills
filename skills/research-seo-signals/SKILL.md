---
name: research-seo-signals
description: Compatibility entry for existing SignalDig SEO-research users. Route SEO evidence requests to the unified research-growth-signals Skill and its research_seo_signals tool; do not use legacy SEO tools or maintain separate parameter rules.
license: MIT
metadata:
  version: "1.8.6"
  homepage: "https://signaldig.com/"
---

# Research SEO Signals — Compatibility Entry

This Skill name remains available for existing users during the migration period. Its former execution contract is frozen and must not receive new capabilities, parameters, examples, or data-family logic.

The server alias and any local tool namespace are client-defined. Never expose machine error codes in a user-facing response.

## Required Delegation

1. Load and follow `$research-growth-signals` as the only maintained execution contract.
2. Preserve the user's SEO-research intent and select the unified `research_seo_signals` business tool through that Skill.
3. Use only the unified Skill's current request, status, Dataset, scope, and result-cursor rules.
4. Never call the former submit/get SEO tools, construct Provider inputs, or reuse legacy request and pagination parameters.
5. Do not read this directory's historical MCP references for live execution; they are retained only for release history and rollback review.

If `$research-growth-signals` or the unified SignalDig MCP is unavailable, stop and tell the user to install or update the unified SignalDig Skill and connection. Do not fall back to the legacy contract and do not simulate results.

This compatibility entry may be removed only after the unified Skill has completed at least one stable release cycle and usage data confirms that this legacy Skill is no longer invoked.
