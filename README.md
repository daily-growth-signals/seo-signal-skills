# SignalDig Skills / SEO 信号技能集

[English](#english) | [中文](#中文)

---

<a id="english"></a>
## English

Pre-built [Agent Skills](https://openagentskills.dev/docs/specification) that give AI agents focused workflows for collecting traceable SEO and social-media signals through the SignalDig MCP products, then turning that evidence into content-opportunity decisions.

### Skills

- **`research-seo-signals`** — submit and poll asynchronous SEO research (keywords, domains, markets) and read metrics, evidence, and limitations without making the final decision.
- **`research-social-signals`** — retrieve focused, deduplicated social data (X, Reddit, Xiaohongshu, Zhihu, LinkedIn, WeChat) with source URLs and coverage limits.
- **`decide-content-opportunities`** — reuse completed SEO/social evidence, compare options, and recommend one content direction with traceable rationale, confidence, counter-evidence, and a next test.

Each skill ships with a `SKILL.md` that documents its full workflow.

---

## Install

Clone the repository:

```bash
git clone https://github.com/daily-growth-signals/seo-signal-skills.git
```

Copy the skill folders into any client that supports the Agent Skills specification:

```bash
for client in ~/.codex/skills ~/.claude/skills ~/.agents/skills; do
  mkdir -p "$client"
  for skill in research-seo-signals research-social-signals decide-content-opportunities; do
    rm -rf "$client/$skill"
    cp -r "$(pwd)/seo-signal-skills/skills/$skill" "$client/"
  done
done
```

Re-run the commands after `git pull` to update your installed skills (each `rm -rf` removes the old copy first, so no directory nesting).

On Windows, run from Git Bash or WSL, or copy the folders manually into `%USERPROFILE%\.codex\skills\`, `%USERPROFILE%\.claude\skills\`, and `%USERPROFILE%\.agents\skills\`.

Using WorkBuddy? Install `Research SEO Signals`, `Retrieve Social Signals`, and `Decide Content Opportunities` from the ClawHub marketplace instead — no manual copying. Note that this still does **not** connect the MCP servers.

---

## Connect the MCP servers

Register the SignalDig endpoints in your client. Example config:

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

Replace `{your_api_key}` with a key from your SignalDig workspace and **store it in an environment variable** (`SIGNALDIG_API_KEY`) — never hard-code or commit the key.

| MCP Server | Skill | Purpose |
|------------|-------|---------|
| `daily-growth-signals` | `research-seo-signals` | SEO data collection |
| `social-growth-signals` | `research-social-signals` | Social media listening |
| `keyword_decision_report` | `decide-content-opportunities` | Decision recommendations |

**Codex** uses user-level `~/.codex/config.toml` (it does not read `mcpServers` JSON) and sends `Authorization: Bearer $SIGNALDIG_API_KEY` automatically:

```toml
[mcp_servers.signaldig_seo]
url = "https://mcp.signaldig.com/data/seo/mcp"
bearer_token_env_var = "SIGNALDIG_API_KEY"
enabled = true
```

Set the variable on macOS/Linux with `export SIGNALDIG_API_KEY="your_api_key"` in `~/.zshrc` or `~/.bashrc`, or on Windows with `setx SIGNALDIG_API_KEY "your_api_key"` (then open a new terminal).

**Claude Code** uses `.mcp.json` in the project root with the same format and supports `${SIGNALDIG_API_KEY}` expansion.

Full per-client setup (Cursor, Windsurf, VS Code, and more) is documented on the official site: <https://signaldig.com/mcp#ai-client-setup>

After configuring, restart your client. You should see tools like `submit_keyword_research_signals`, `get_keyword_research_signals`, and `submit_specific_seo_data`. On a `401`, check the `Authorization` header and API key first.

---

## Use

```text
Use $research-seo-signals to research "AI SEO tools" for example.com in the US English market.

Use $research-social-signals to find recent X conversations about PDF translation tools that preserve layout, with source links and coverage limitations.

Use $decide-content-opportunities to compare the opportunities in the completed SEO and social results and recommend one content direction.
```

The SEO skill follows the async submit/get contract; the Social skill uses the synchronous `search_x_posts` contract; the decision skill uses the async `submit_keyword_decision_report` / `get_keyword_decision_report` contract.

---

## Links

- Official site: <https://signaldig.com/>
- Skills installation: <https://signaldig.com/skills#install>
- MCP setup guide: <https://signaldig.com/mcp#ai-client-setup>
- Repository: <https://github.com/daily-growth-signals/seo-signal-skills>
- License: [MIT](LICENSE)

---

<a id="中文"></a>
## 中文

预构建的 [Agent Skills](https://openagentskills.dev/docs/specification)：为 AI Agent 提供聚焦的工作流程，通过 SignalDig MCP 产品收集可追溯的 SEO 与社交媒体信号，并将证据转化为内容机会决策。

### 技能

- **`research-seo-signals`** —— 提交并轮询异步 SEO 研究任务（关键词、域名、市场），读取指标、证据与限制，不替用户做最终决策。
- **`research-social-signals`** —— 检索聚焦、去重的社交数据（X、Reddit、小红书、知乎、LinkedIn、微信），保留源链接与覆盖限制。
- **`decide-content-opportunities`** —— 复用已完成的 SEO/社交证据，比较选项，推荐一个内容方向，附可追溯理由、置信度、反证与下一步测试。

每个技能自带 `SKILL.md`，记录完整工作流程。

---

## 安装

克隆仓库：

```bash
git clone https://github.com/daily-growth-signals/seo-signal-skills.git
```

将技能文件夹复制到任何支持 Agent Skills 规范的客户端：

```bash
for client in ~/.codex/skills ~/.claude/skills ~/.agents/skills; do
  mkdir -p "$client"
  for skill in research-seo-signals research-social-signals decide-content-opportunities; do
    rm -rf "$client/$skill"
    cp -r "$(pwd)/seo-signal-skills/skills/$skill" "$client/"
  done
done
```

`git pull` 后重新执行即可更新已安装技能（每条 `rm -rf` 会先删除旧副本，不会产生目录嵌套）。

Windows 用户可在 Git Bash 或 WSL 中运行，或手动复制到 `%USERPROFILE%\.codex\skills\`、`%USERPROFILE%\.claude\skills\`、`%USERPROFILE%\.agents\skills\`。

使用 WorkBuddy？直接在 ClawHub 市场安装 `Research SEO Signals`、`Retrieve Social Signals`、`Decide Content Opportunities` 即可，无需手动复制。注意：安装技能仍**不会**自动连接 MCP 服务器。

---

## 连接 MCP 服务器

在客户端中注册 SignalDig 端点，示例配置（Claude Code 的 `.mcp.json` 使用相同格式）：

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

将 `{your_api_key}` 替换为 SignalDig 工作空间中的密钥，并**放入环境变量**（`SIGNALDIG_API_KEY`）——不要把 Key 写死或提交进仓库。

| MCP 服务 | 技能 | 用途 |
|----------|------|------|
| `daily-growth-signals` | `research-seo-signals` | SEO 数据采集 |
| `social-growth-signals` | `research-social-signals` | 社交媒体监听 |
| `keyword_decision_report` | `decide-content-opportunities` | 决策建议 |

**Codex** 使用用户级 `~/.codex/config.toml`（不读取 `mcpServers` JSON），会自动发送 `Authorization: Bearer $SIGNALDIG_API_KEY`：

```toml
[mcp_servers.signaldig_seo]
url = "https://mcp.signaldig.com/data/seo/mcp"
bearer_token_env_var = "SIGNALDIG_API_KEY"
enabled = true
```

macOS/Linux 在 `~/.zshrc` 或 `~/.bashrc` 中执行 `export SIGNALDIG_API_KEY="your_api_key"`，Windows 执行 `setx SIGNALDIG_API_KEY "your_api_key"`（然后新开终端）。

**Claude Code** 使用项目根目录的 `.mcp.json`（格式同上），支持 `${SIGNALDIG_API_KEY}` 展开。

其他客户端的完整配置（Cursor、Windsurf、VS Code 等）见官网：<https://signaldig.com/mcp#ai-client-setup>

配置完成后重启客户端，应能看到 `submit_keyword_research_signals`、`get_keyword_research_signals`、`submit_specific_seo_data` 等工具。若报 401，优先检查 `Authorization` header 与 API Key。

---

## 使用示例

```text
使用 $research-seo-signals 研究 example.com 在美国英语市场的 "AI SEO tools"。

使用 $research-social-signals 查找关于保持版式的 PDF 翻译工具的最新 X 对话，包含源链接和覆盖限制。

使用 $decide-content-opportunities 比较已完成 SEO 和社交结果中的机会，推荐一个内容方向。
```

SEO 技能遵循异步提交/获取协议；社交技能使用同步 `search_x_posts` 协议；决策技能使用异步 `submit_keyword_decision_report` / `get_keyword_decision_report` 协议。

---

## 链接

- 官方网站：<https://signaldig.com/>
- 技能安装：<https://signaldig.com/skills#install>
- MCP 配置指南：<https://signaldig.com/mcp#ai-client-setup>
- 仓库：<https://github.com/daily-growth-signals/seo-signal-skills>
- 许可证：[MIT](LICENSE)
