#!/usr/bin/env python3
"""Prevent client-defined MCP aliases from becoming Skill runtime contracts."""

from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SKILLS = ROOT / "skills"

# A Skill may name canonical operations, but it must not require a client alias
# or synthesize a host-specific MCP tool identifier.
ALIAS_BINDINGS = re.compile(
    r"(?:REQUIRES|verify that|needs) (?:the )?`[^`]+` MCP server",
    re.IGNORECASE,
)
LOCAL_TOOL_IDENTIFIER = re.compile(r"mcp__[a-zA-Z0-9_-]+__")
TOOL_HEADING = re.compile(r"^## Tool: `([a-z][a-z0-9_]*)`$", re.MULTILINE)
TOOL_MENTION = re.compile(r"`((?:submit|get|search|research)_[a-z0-9_]+)`")
USER_FACING_ERROR_CODE = re.compile(r"\b(?:report|return|show)\s+`?error\.code`?", re.IGNORECASE)
USER_FACING_CODE_RULE = "never expose machine error codes in a user-facing response"
COMPATIBILITY_SKILLS = {
    "research-social-signals": "research_social_signals",
    "research-seo-signals": "research_seo_signals",
    "decide-content-opportunities": "research_seo_signals",
}
LEGACY_RUNTIME_REFERENCE = re.compile(
    r"(?:/data/social/mcp|/data/seo/mcp|/signals/seo/mcp|"
    r"submit_keyword_research_signals|submit_specific_seo_data|"
    r"submit_keyword_decision_report|get_keyword_decision_report|"
    r"search_x_posts|search_reddit_posts|search_xiaohongshu_notes|"
    r"search_zhihu_articles|get_xiaohongshu_user_posts)",
    re.IGNORECASE,
)


def fail(message: str) -> None:
    print(f"[FAIL] {message}")
    global failures
    failures += 1


failures = 0
for skill_path in sorted(SKILLS.glob("*/SKILL.md")):
    skill_dir = skill_path.parent
    name = skill_dir.name
    skill = skill_path.read_text()
    setup_path = skill_dir / "references" / "setup-guide.md"
    contract_path = skill_dir / "references" / "mcp-contract.md"

    if ALIAS_BINDINGS.search(skill):
        fail(f"{name}/SKILL.md binds runtime behavior to a server alias")
    if LOCAL_TOOL_IDENTIFIER.search(skill):
        fail(f"{name}/SKILL.md constructs or requires a local mcp__ tool identifier")
    if USER_FACING_ERROR_CODE.search(skill):
        fail(f"{name}/SKILL.md exposes error.code to the user")
    normalized_skill = re.sub(r"\s+", " ", skill.lower())
    if "server alias and any local tool namespace are client-defined" not in normalized_skill:
        fail(f"{name}/SKILL.md lacks the client-defined alias invariant")
    if USER_FACING_CODE_RULE not in normalized_skill:
        fail(f"{name}/SKILL.md lacks the user-facing error-code boundary")

    if name in COMPATIBILITY_SKILLS:
        expected_tool = COMPATIBILITY_SKILLS[name]
        if "$research-growth-signals" not in skill or expected_tool not in skill:
            fail(f"{name}/SKILL.md does not delegate to the unified {expected_tool} contract")
        reference_files = sorted((skill_dir / "references").glob("*.md"))
        if reference_files:
            relative_files = ", ".join(
                str(path.relative_to(ROOT)) for path in reference_files
            )
            fail(f"{name} ships independent compatibility references: {relative_files}")
        for runtime_path in sorted(skill_dir.rglob("*")):
            if runtime_path.is_file() and runtime_path.suffix in {".md", ".yaml", ".json"}:
                if LEGACY_RUNTIME_REFERENCE.search(runtime_path.read_text()):
                    fail(
                        f"{runtime_path.relative_to(ROOT)} contains a retired MCP endpoint "
                        "or tool name"
                    )
        continue

    if not setup_path.exists() or not contract_path.exists():
        fail(f"{name} is missing an MCP setup guide or contract")
        continue

    setup = setup_path.read_text()
    contract = contract_path.read_text()
    expected = set(TOOL_HEADING.findall(contract))
    documented = set(TOOL_MENTION.findall(setup))
    missing = sorted(expected - documented)
    if missing:
        fail(f"{name}/setup-guide.md omits contract tools: {', '.join(missing)}")
    if "Example server alias (configurable)" not in setup:
        fail(f"{name}/setup-guide.md does not label its server alias as configurable")

    for reference_path in sorted(skill_dir.rglob("*.md")):
        if reference_path == skill_path:
            continue
        if USER_FACING_ERROR_CODE.search(reference_path.read_text()):
            fail(f"{reference_path.relative_to(ROOT)} exposes error.code to the user")

if failures:
    sys.exit(1)

print("[OK] MCP alias-independence and setup-tool checks passed")
