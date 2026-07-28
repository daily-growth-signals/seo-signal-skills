# Daily Growth Signals Skills

Give AI agents focused workflows for collecting traceable SEO and social-media signals through the Daily Growth Signals MCP products, then turning that evidence into content-opportunity decisions.

This repository provides three product-specific skills:

[`research-seo-signals`](skills/research-seo-signals/SKILL.md) guides an AI agent to:

- submit a keyword, domain, market, and language only when no prior matching job exists;
- reuse known `request_id` values via `get_keyword_research_signals` and stable `idempotency_key`s on retries;
- poll asynchronous research at the suggested interval;
- read metrics, search observations, evidence, and limitations together;
- separate sourced facts from inference without making the final SEO decision;
- default to a concise report unless the user asks for a full export.

[`research-social-signals`](skills/research-social-signals/SKILL.md) guides an AI agent to:

- translate a social-listening goal into focused literal X query expressions;
- reuse conversation results before repeating the same live query;
- select recency or relevancy intentionally and paginate only when broader coverage is needed;
- deduplicate overlapping searches by `post_id` while preserving source URLs and query context;
- separate observations, synthesis, possible actions, and coverage limitations.

[`decide-content-opportunities`](skills/decide-content-opportunities/SKILL.md) guides an AI agent to:

- reuse completed SEO and social evidence without refreshing it unnecessarily;
- compare materially different topics, audiences, angles, formats, or channels;
- recommend one primary action with traceable rationale and counter-evidence;
- express confidence as an explained qualitative judgment rather than a fabricated probability;
- provide alternatives, tradeoffs, conditions, and the smallest useful next test.

## Install

Clone the repository:

```bash
git clone https://github.com/daily-growth-signals/seo-signal-skills.git
```

Link the skill into any client that supports the [Agent Skills specification](https://openagentskills.dev/docs/specification). A symbolic link keeps the installation up to date after `git pull`:

```bash
# Codex
ln -s "$(pwd)/seo-signal-skills/skills/research-seo-signals" \
  ~/.codex/skills/research-seo-signals
ln -s "$(pwd)/seo-signal-skills/skills/research-social-signals" \
  ~/.codex/skills/research-social-signals
ln -s "$(pwd)/seo-signal-skills/skills/decide-content-opportunities" \
  ~/.codex/skills/decide-content-opportunities

# Claude Code
ln -s "$(pwd)/seo-signal-skills/skills/research-seo-signals" \
  ~/.claude/skills/research-seo-signals
ln -s "$(pwd)/seo-signal-skills/skills/research-social-signals" \
  ~/.claude/skills/research-social-signals
ln -s "$(pwd)/seo-signal-skills/skills/decide-content-opportunities" \
  ~/.claude/skills/decide-content-opportunities

# Other compatible clients
ln -s "$(pwd)/seo-signal-skills/skills/research-seo-signals" \
  ~/.agents/skills/research-seo-signals
ln -s "$(pwd)/seo-signal-skills/skills/research-social-signals" \
  ~/.agents/skills/research-social-signals
ln -s "$(pwd)/seo-signal-skills/skills/decide-content-opportunities" \
  ~/.agents/skills/decide-content-opportunities
```

Create the destination directory with `mkdir -p` if needed. Copying the skill directory also works, but copied installations do not update with the repository.

## Connect the MCP server

Add the Daily Growth Signals Streamable HTTP endpoint using your AI client's supported MCP configuration flow:

```json
{
  "mcpServers": {
    "daily-growth-signals-seo": {
      "url": "https://YOUR_DGS_SEO_MCP_URL"
    },
    "daily-growth-signals-social": {
      "url": "https://YOUR_DGS_SOCIAL_MCP_URL"
    }
  }
}
```

Configuration fields vary by client. Follow the client documentation and your Daily Growth Signals workspace setup instructions.

## Use

```text
Use $research-seo-signals to research "AI SEO tools" for example.com in the US English market.

Use $research-social-signals to find recent X conversations about PDF translation tools that preserve layout, with source links and coverage limitations.

Use $decide-content-opportunities to compare the opportunities in the completed SEO and social results and recommend one content direction, with confidence, counter-evidence, alternatives, and a next test.
```

The SEO skill follows the SEO MCP asynchronous submit/get contract. The Social
skill uses the separate synchronous `search_x_posts` contract. The decision
skill follows the Decision MCP asynchronous
`submit_keyword_decision_report` / `get_keyword_decision_report` contract and
returns evidence-constrained keyword decision information.

## Project page

GitHub Pages publishes the project overview at:

<https://daily-growth-signals.github.io/seo-signal-skills/>

## License

[MIT](LICENSE)
