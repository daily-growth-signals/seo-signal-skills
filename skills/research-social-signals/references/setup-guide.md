# Setup Guide: Connect the SignalDig Social MCP Server

This Skill is a **workflow spec only** — it has no data of its own. Before it
can retrieve any traceable social data you must complete **two separate
installs**:

1. Get a **SignalDig API key** (account access).
2. Connect the **`social-growth-signals` MCP server** to your AI client.

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

## 2. Connect the `social-growth-signals` MCP server

| Field | Value |
|-------|-------|
| Server name (reference) | `social-growth-signals` |
| Transport | HTTP (Streamable MCP) |
| URL | `https://mcp.signaldig.com/data/social/mcp` |
| Auth header | `Authorization: Bearer {your_api_key}` |

The server name is a **reference name** — you may rename it in your client
(for example `signaldig-social`) without changing the endpoint.

### Claude Code

Add to `.mcp.json` in your project:

```json
{
  "mcpServers": {
    "social-growth-signals": {
      "type": "http",
      "url": "https://mcp.signaldig.com/data/social/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}
```

Then restart Claude Code (or run `/mcp`) and approve the server.

### Other clients (Cursor, Codex, Windsurf, etc.)

Every client stores MCP servers in its own settings file, but the entry has
the same shape: server name + `type: "http"` + URL + `headers`. Open your
client's MCP settings, add the server above with your real API key, and
restart the client.

---

## 3. Verify the connection

The following tools should become visible in your client:

- `search_x_posts`
- `get_x_trends`
- `search_reddit_posts`
- `search_xiaohongshu_notes`
- `get_xiaohongshu_user_posts`
- `search_zhihu_articles`
- `get_linkedin_user_posts`
- `get_wechat_account_articles`

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

Read [parameter-guide.md](parameter-guide.md) for parameter meaning and
validation, and [mcp-contract.md](mcp-contract.md) for the live tool contract,
result fields, pagination, and failure boundaries.
