# SignalDig Growth Research

An open-source Agent Skill for public social research and SEO research through [SignalDig](https://signaldig.com/). It works with Codex, Claude Code, Cursor, Windsurf, and other clients that support Agent Skills and Streamable HTTP MCP.

[Website](https://daily-growth-signals.github.io/seo-signal-skills/) · [Setup guide](https://signaldig.com/agent-setup) · [Latest release](https://github.com/daily-growth-signals/seo-signal-skills/releases/latest) · [中文说明](#中文说明)

## What it covers

The repository contains one maintained Skill: [`research-growth-signals`](./skills/research-growth-signals/).

- Social research: public topic discussions on X, Reddit, Xiaohongshu, Zhihu, and Threads, plus supported public post and profile retrieval.
- SEO research: keyword demand, related queries, SERPs, trends, competitors, GEO visibility, backlinks, ranked keywords, and traffic evidence.

The Skill uses two public MCP tools:

- `research_social_signals`
- `research_seo_signals`

Each request stays within the platforms, market, language, topic, and result limit supplied by the user. The response preserves source links, actual coverage, limitations, and the SignalDig `analysis_id`. Missing data is reported as unknown rather than filled with estimates.

## Install

Clone the repository:

```bash
git clone https://github.com/daily-growth-signals/seo-signal-skills.git
```

Copy `skills/research-growth-signals` into your client's skills directory:

| Client | Skills directory |
| --- | --- |
| Codex | `~/.codex/skills/` |
| Claude Code | `~/.claude/skills/` |
| Cursor | `~/.cursor/skills/` |
| Windsurf | `~/.windsurf/skills/` |

You can also download the packaged Skill from the [latest GitHub release](https://github.com/daily-growth-signals/seo-signal-skills/releases/latest).

## Connect SignalDig MCP

The Skill contains instructions but no research data. Register the SignalDig Streamable HTTP endpoint in your client and provide the API key through a secret or environment variable:

```json
{
  "signaldig": {
    "type": "http",
    "url": "https://mcp.signaldig.com/mcp",
    "headers": {
      "Authorization": "Bearer {SIGNALDIG_API_KEY}"
    }
  }
}
```

The `signaldig` alias is configurable. Do not commit the API key. Client-specific configuration is documented at [Connect SignalDig](https://signaldig.com/agent-setup).

## 中文说明

SignalDig Growth Research 是一个开源 Agent Skill，通过一个 SignalDig MCP 连接完成公开社媒研究与 SEO 研究。支持 Codex、Claude Code、Cursor、Windsurf，以及其他兼容 Agent Skills 和 Streamable HTTP MCP 的客户端。

仓库只维护 [`research-growth-signals`](./skills/research-growth-signals/) 这一个 Skill：

- 社媒研究：X、Reddit、小红书、知乎和 Threads 的公开话题讨论，以及受支持的公开帖子和账号资料。
- SEO 研究：关键词需求、相关搜索、SERP、趋势、竞品、GEO 可见度、外链、排名关键词和流量证据。

安装时把 `skills/research-growth-signals` 复制到客户端的 skills 目录，然后按[接入说明](https://signaldig.com/agent-setup)配置 SignalDig MCP。Skill 本身不包含研究数据；未连接 MCP 时不会用常识补写结果。

## License

[MIT](./LICENSE)
