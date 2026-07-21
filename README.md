# Daily Growth Signals Skills

Give AI agents a focused workflow for collecting traceable SEO demand signals through the Daily Growth Signals MCP server.

This repository intentionally provides one skill: [`research-seo-signals`](skills/research-seo-signals/SKILL.md). It guides an AI agent to:

- submit a keyword, domain, market, and language;
- poll asynchronous research at the suggested interval;
- read metrics, search observations, evidence, and limitations together;
- separate sourced facts from inference without making the final SEO decision.

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

# Claude Code
ln -s "$(pwd)/seo-signal-skills/skills/research-seo-signals" \
  ~/.claude/skills/research-seo-signals

# Other compatible clients
ln -s "$(pwd)/seo-signal-skills/skills/research-seo-signals" \
  ~/.agents/skills/research-seo-signals
```

Create the destination directory with `mkdir -p` if needed. Copying the skill directory also works, but copied installations do not update with the repository.

## Connect the MCP server

Add the Daily Growth Signals Streamable HTTP endpoint using your AI client's supported MCP configuration flow:

```json
{
  "mcpServers": {
    "daily-growth-signals": {
      "url": "https://YOUR_DGS_HOST/mcp"
    }
  }
}
```

Configuration fields vary by client. Follow the client documentation and your Daily Growth Signals workspace setup instructions.

## Use

```text
Use $research-seo-signals to research "AI SEO tools" for example.com in the US English market.
```

The skill submits the research request, preserves its `request_id`, and polls for the result until the request reaches a terminal state.

## Project page

GitHub Pages publishes the project overview at:

<https://daily-growth-signals.github.io/seo-signal-skills/>

## License

[MIT](LICENSE)
