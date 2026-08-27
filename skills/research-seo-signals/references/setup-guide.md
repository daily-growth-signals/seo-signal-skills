# Setup Guide: Connect the SignalDig SEO MCP Server

This Skill is a **workflow spec only** — it has no data of its own. Before it
can produce any evidence-backed result you must complete **two separate
installs**:

1. Get a **SignalDig API key** (account access).
2. Connect the **`daily-growth-signals` MCP server** to your AI client.

Installing this Skill does **NOT** connect the MCP server. The Skill tells the
agent what to do; the MCP server is what actually retrieves the data.

---

## 1. Get a SignalDig API key

1. Open <https://signaldig.com/> and sign up (or log in).
2. Go to your workspace dashboard → **API Keys**.
3. Create a new key and copy it.

- The API key is sent to the MCP server as an HTTP header:
  `Authorization: Bearer {your_api_key}`.
- Treat the key like a password. Never commit it to a repository or paste it
  into a shared skill file.

---

## 2. Connect the `daily-growth-signals` MCP server

| Field | Value |
|-------|-------|
| Server name (reference) | `daily-growth-signals` |
| Transport | HTTP (Streamable MCP) |
| URL | `https://mcp.signaldig.com/data/seo/mcp` |
| Auth header | `Authorization: Bearer {your_api_key}` |

The server name is a **reference name** — you may rename it in your client
(for example `signaldig-seo`) without changing the endpoint.

### Claude Code

Add to `.mcp.json` in your project:

```json
{
  "mcpServers": {
    "daily-growth-signals": {
      "type": "http",
      "url": "https://mcp.signaldig.com/data/seo/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}
```

Then restart Claude Code (or run `/mcp`) and approve the server.

### Codex

Codex does not read `mcpServers` JSON. Add the server to your **user-level**
`~/.codex/config.toml` (not the project `.codex/config.toml` — account-level
config):

```toml
[mcp_servers.signaldig_seo]
url = "https://mcp.signaldig.com/data/seo/mcp"
bearer_token_env_var = "SIGNALDIG_API_KEY"
enabled = true
default_tools_approval_mode = "prompt"
tool_timeout_sec = 120
```

On Windows the user-level file is `%USERPROFILE%\.codex\config.toml`.

Set your API key as a user environment variable — never in `config.toml`, a
project file, the repository, or chat:

```bash
# macOS / Linux — add to ~/.zshrc or ~/.bashrc
export SIGNALDIG_API_KEY="your_api_key"
```

```powershell
# Windows — PowerShell (open a new terminal afterwards; setx persists)
setx SIGNALDIG_API_KEY "your_api_key"
```

Codex automatically sends `Authorization: Bearer $SIGNALDIG_API_KEY`. Fully
quit and reopen Codex Desktop (or run `/reload-plugins` from Claude Code),
start a new task, and confirm the tools from section 3 are listed.

### Other clients (Cursor, Windsurf, etc.)

Every client stores MCP servers in its own settings file, but the entry has
the same shape: server name + `type: "http"` + URL + `headers`. Open your
client's MCP settings, add the server above with your real API key, and
restart the client. Where the client supports an environment-variable auth
option (like Codex's `bearer_token_env_var`), prefer it over hardcoding the
key in the config file.

---

## 3. Verify the connection

The following tools should become visible in your client:

- `submit_keyword_research_signals`
- `submit_specific_seo_data`
- `submit_competitor_analysis`
- `submit_geo_analysis`
- `submit_backlink_analysis`
- `submit_ranked_keywords`
- `submit_bulk_traffic_estimation`
- `get_keyword_research_signals`

If the tools are missing, check the URL, the header name (`Authorization`),
and that the key is valid and active.

---

## 4. Troubleshooting

| Symptom | Likely cause / fix |
|---------|--------------------|
| Tools not visible | Client not restarted after the config change; URL or header typo. |
| `401 Unauthorized` / auth error | Wrong, expired, or missing API key in `headers.Authorization`. |
| Connection refused | URL missing the `/mcp` path; wrong endpoint for this service. |
| Tools visible but every call errors | Key lacks the required plan/workspace access — check the dashboard. |

If the connection still fails, create a fresh API key in your SignalDig
dashboard and retry.

---

## 5. What the Skill needs

Read [mcp-contract.md](mcp-contract.md) before the first live call for the
exact tool contract, request/response fields, polling, and error handling.
