# SignalDig Skills / SEO 信号技能集

[English](#english) | [中文](#中文)

---

<a id="english"></a>
## English

Give AI agents focused workflows for collecting traceable SEO and social-media signals through the SignalDig MCP products, then turning that evidence into content-opportunity decisions.

This repository provides three product-specific skills:

### Skills Overview

**[`research-seo-signals`](skills/research-seo-signals/SKILL.md)** guides an AI agent to:

- submit a keyword, domain, market, and language only when no prior matching job exists;
- reuse known `request_id` values via `get_keyword_research_signals` and stable `idempotency_key`s on retries;
- poll asynchronous research at the suggested interval;
- read metrics, search observations, evidence, and limitations together;
- separate sourced facts from inference without making the final SEO decision;
- default to a concise report unless the user asks for a full export.

**[`research-social-signals`](skills/research-social-signals/SKILL.md)** guides an AI agent to retrieve underlying social data:

- explain unfamiliar platform identifiers and validate user-supplied parameters before retrieval;
- translate a broad retrieval goal into a small set of focused platform-native searches;
- reuse conversation results before repeating the same live query;
- select recency or relevancy intentionally and paginate only when broader coverage is needed;
- choose creator/account tools for Xiaohongshu, LinkedIn, and WeChat instead of forcing keyword search;
- preserve native engagement meanings, raw WeChat article fields when requested, and opaque pagination values;
- deduplicate overlapping searches by `post_id` while preserving source URLs and query context;
- return source data and coverage limitations without making analysis decisions or recommendations.

**[`decide-content-opportunities`](skills/decide-content-opportunities/SKILL.md)** guides an AI agent to:

- reuse completed SEO and social evidence without refreshing it unnecessarily;
- compare materially different topics, audiences, angles, formats, or channels;
- recommend one primary action with traceable rationale and counter-evidence;
- express confidence as an explained qualitative judgment rather than a fabricated probability;
- provide alternatives, tradeoffs, conditions, and the smallest useful next test.

---

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

---

## Connect the MCP servers

Add the SignalDig MCP endpoints to your AI client's configuration:

```json
{
  "mcpServers": {
    "daily-growth-signals": {
      "type": "http",
      "url": "https://mcp.signaldig.com/data/seo/mcp",
      "headers": {
        "Authorization": "Bearer {your_api_key}"
      },
      "disabled": false
    },
    "social-growth-signals": {
      "type": "http",
      "url": "https://mcp.signaldig.com/data/social/mcp",
      "headers": {
        "Authorization": "Bearer {your_api_key}"
      },
      "disabled": false
    },
    "keyword_decision_report": {
      "type": "http",
      "url": "https://mcp.signaldig.com/signals/seo/mcp",
      "headers": {
        "Authorization": "Bearer {your_api_key}"
      },
      "disabled": false
    }
  }
}
```

Replace `{your_api_key}` with your actual API key from your SignalDig workspace.

**Server mapping:**

| MCP Server | Skill | Purpose |
|------------|-------|---------|
| `daily-growth-signals` | `research-seo-signals` | SEO data collection |
| `social-growth-signals` | `research-social-signals` | Social media listening |
| `keyword_decision_report` | `decide-content-opportunities` | Decision recommendations |

Configuration fields may vary by client. Follow the client documentation for exact format.

---

## Use

```text
Use $research-seo-signals to research "AI SEO tools" for example.com in the US English market.

Use $research-social-signals to find recent X conversations about PDF translation tools that preserve layout, with source links and coverage limitations.

Use $decide-content-opportunities to compare the opportunities in the completed SEO and social results and recommend one content direction, with confidence, counter-evidence, alternatives, and a next test.
```

The SEO skill follows the SEO MCP asynchronous submit/get contract. The Social skill uses the separate synchronous `search_x_posts` contract. The decision skill follows the Decision MCP asynchronous `submit_keyword_decision_report` / `get_keyword_decision_report` contract and returns evidence-constrained keyword decision information.

---

## Project page

Official site: <https://signaldig.com/>

GitHub Pages publishes the project overview at:

<https://daily-growth-signals.github.io/seo-signal-skills/>

## License

[MIT](LICENSE)

---

<a id="中文"></a>
## 中文

为 AI Agent 提供聚焦的工作流程，通过 SignalDig MCP 产品收集可追溯的 SEO 和社交媒体信号，并将这些证据转化为内容机会决策。

本仓库提供三个产品专属技能：

### 技能概览

**[`research-seo-signals`](skills/research-seo-signals/SKILL.md)** 指导 AI Agent：

- 仅在无先前匹配任务时提交关键词、域名、市场和语言；
- 通过 `get_keyword_research_signals` 复用已知的 `request_id` 值，并在重试时使用稳定的 `idempotency_key`；
- 按建议间隔轮询异步研究任务；
- 同时读取指标、搜索观察、证据和限制；
- 区分有来源的事实与推断，不做出最终的 SEO 决策；
- 默认输出简洁报告，除非用户要求完整导出。

**[`research-social-signals`](skills/research-social-signals/SKILL.md)** 指导 AI Agent 检索底层社交数据：

- 在检索前解释难懂的平台标识并校验用户提供的参数；
- 将宽泛检索目标转化为少量聚焦的平台原生查询；
- 在重复相同实时查询前复用对话结果；
- 有意选择时效性或相关性排序，仅在需要更广覆盖时进行分页；
- 针对小红书创作者、LinkedIn 用户和微信公众号选择对应账号工具，而不是强行使用关键词搜索；
- 保留平台原生互动指标语义、按需提供微信公众号原始字段，并原样传递分页值；
- 按 `post_id` 去重叠搜索，同时保留源 URL 和查询上下文；
- 返回源数据与覆盖限制，不做分析决策或行动建议。

**[`decide-content-opportunities`](skills/decide-content-opportunities/SKILL.md)** 指导 AI Agent：

- 复用已完成的 SEO 和社交证据，避免不必要的刷新；
- 比较实质性不同的主题、受众、角度、格式或渠道；
- 推荐一个主要行动，附带可追溯的理由和反证；
- 将置信度表达为解释性定性判断，而非虚构的概率；
- 提供替代方案、权衡条件以及最小可行的下一步测试。

---

## 安装

克隆仓库：

```bash
git clone https://github.com/daily-growth-signals/seo-signal-skills.git
```

将技能链接到任何支持 [Agent Skills 规范](https://openagentskills.dev/docs/specification) 的客户端。符号链接可在 `git pull` 后保持安装更新：

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

# 其他兼容客户端
ln -s "$(pwd)/seo-signal-skills/skills/research-seo-signals" \
  ~/.agents/skills/research-seo-signals
ln -s "$(pwd)/seo-signal-skills/skills/research-social-signals" \
  ~/.agents/skills/research-social-signals
ln -s "$(pwd)/seo-signal-skills/skills/decide-content-opportunities" \
  ~/.agents/skills/decide-content-opportunities
```

如需要，使用 `mkdir -p` 创建目标目录。复制技能目录也可行，但复制的安装不会随仓库更新。

---

## 连接 MCP 服务器

将 SignalDig MCP 端点添加到您的 AI 客户端配置中：

```json
{
  "mcpServers": {
    "daily-growth-signals": {
      "type": "http",
      "url": "https://mcp.signaldig.com/data/seo/mcp",
      "headers": {
        "Authorization": "Bearer {your_api_key}"
      },
      "disabled": false
    },
    "social-growth-signals": {
      "type": "http",
      "url": "https://mcp.signaldig.com/data/social/mcp",
      "headers": {
        "Authorization": "Bearer {your_api_key}"
      },
      "disabled": false
    },
    "keyword_decision_report": {
      "type": "http",
      "url": "https://mcp.signaldig.com/signals/seo/mcp",
      "headers": {
        "Authorization": "Bearer {your_api_key}"
      },
      "disabled": false
    }
  }
}
```

将 `{your_api_key}` 替换为您的 SignalDig 工作空间中的实际 API 密钥。

**服务映射：**

| MCP 服务 | 技能 | 用途 |
|----------|------|------|
| `daily-growth-signals` | `research-seo-signals` | SEO 数据采集 |
| `social-growth-signals` | `research-social-signals` | 社交媒体监听 |
| `keyword_decision_report` | `decide-content-opportunities` | 决策建议 |

配置字段可能因客户端而异。请遵循客户端文档获取确切格式。

---

## 使用示例

```text
使用 $research-seo-signals 研究 example.com 在美国英语市场的 "AI SEO tools"。

使用 $research-social-signals 查找关于保持版式的 PDF 翻译工具的最新 X 对话，包含源链接和覆盖限制。

使用 $decide-content-opportunities 比较已完成 SEO 和社交结果中的机会，推荐一个内容方向，包含置信度、反证、替代方案和下一步测试。
```

SEO 技能遵循 SEO MCP 异步提交/获取协议。社交技能使用独立的同步 `search_x_posts` 协议。决策技能遵循 Decision MCP 异步 `submit_keyword_decision_report` / `get_keyword_decision_report` 协议，返回受证据约束的关键词决策信息。

---

## 项目页面

官方网站：<https://signaldig.com/>

GitHub Pages 发布的项目概览页面：

<https://daily-growth-signals.github.io/seo-signal-skills/>

## 许可证

[MIT](LICENSE)
