# SignalDig Growth Research Skill

[English](#english) | [中文](#中文)

## English

SignalDig exposes one MCP connection and one Agent Skill. The MCP surface contains only two business tools:

- `research_social_signals` for bounded public social research.
- `research_seo_signals` for bounded SEO evidence research.

The Skill translates a natural-language goal into the smallest sufficient business scope, submits once, and polls the same opaque `analysis_id`. Provider names, workflows, bindings, native pagination parameters, storage, and internal data are never part of the public contract.

New users install only `skills/research-growth-signals`, then register one Streamable HTTP connection. GitHub Releases no longer package the historical Skills. ClawHub and SkillHub receive one final compatibility sync for existing installations, after which only the unified Skill continues to be published.

```json
{
  "signaldig": {
    "type": "http",
    "url": "https://mcp.signaldig.com/mcp",
    "headers": {"Authorization": "Bearer {SIGNALDIG_API_KEY}"},
    "disabled": false
  }
}
```

Store the API key securely and never commit it. Client-specific instructions are at [Connect SignalDig](https://signaldig.com/agent-setup).

## 中文

SignalDig 对外只提供一个 MCP 连接和一个 Agent Skill。MCP 内只有两个业务工具：

- `research_social_signals`：有边界的公开社媒研究。
- `research_seo_signals`：有边界的 SEO 证据研究。

Skill 将自然语言需求映射为最小必要业务范围，只提交一次，并始终使用同一个不透明 `analysis_id` 轮询。供应商、Workflow、Binding、原生分页参数、存储与内部数据均不进入公开契约。

新用户只安装 `skills/research-growth-signals`，MCP 只配置上面的单一连接。GitHub Releases 不再打包历史 Skill；ClawHub 与 SkillHub 为已有安装最后同步一次兼容入口，之后只继续发布统一 Skill。完整说明见 [SignalDig 一键接入](https://signaldig.com/agent-setup)。
