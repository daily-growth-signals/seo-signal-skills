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

Connect to `https://mcp.signaldig.com/mcp` with a Streamable HTTP MCP client. The MCP tools describe their own inputs and result-reading steps, so clients can also use them without installing this Skill. For full research, provide your account API key through a secret or environment variable:

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

## Anonymous access

Anonymous users can try supported single-channel searches through the same MCP connection.
Use `research_social_signals` for social searches and `research_seo_signals` for web searches.
Full research requires account authorization. See [Connect SignalDig](https://signaldig.com/agent-setup)
for access options.

The updated guide explains how to submit research and read results. MCP clients can also
use the tools without installing this Skill.

## 中文说明

SignalDig Growth Research 是一个开源 Agent Skill，通过一个 SignalDig MCP 连接完成公开社媒研究与 SEO 研究。支持 Codex、Claude Code、Cursor、Windsurf，以及其他兼容 Agent Skills 和 Streamable HTTP MCP 的客户端。

仓库只维护 [`research-growth-signals`](./skills/research-growth-signals/) 这一个 Skill：

- 社媒研究：X、Reddit、小红书、知乎和 Threads 的公开话题讨论，以及受支持的公开帖子和账号资料。
- SEO 研究：关键词需求、相关搜索、SERP、趋势、竞品、GEO 可见度、外链、排名关键词和流量证据。

安装时把 `skills/research-growth-signals` 复制到客户端的 skills 目录，然后按[接入说明](https://signaldig.com/agent-setup)配置 SignalDig MCP。Skill 本身不包含研究数据；未连接 MCP 时不会用常识补写结果。

### 匿名访问

支持匿名用户通过同一 MCP 连接试用单渠道搜索。
社媒搜索使用 `research_social_signals`，网页搜索使用 `research_seo_signals`。
完整研究需要账户授权，接入方式见[连接指南](https://signaldig.com/agent-setup)。

本次更新完善了研究提交和结果读取指南。客户端也可直接使用 MCP 工具，无需安装 Skill。

## License

[MIT](./LICENSE)
