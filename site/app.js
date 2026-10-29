// ── Internationalization (i18n) ──
const I18N = {
  en: {
    "nav.blog": "Blog",
    "nav.install": "Install",
    "nav.workflow": "Workflow",
    "nav.site": "Official Site",

    "hero.title": "Social and SEO research<br />from one Agent Skill",
    "hero.subtitle": "Research public conversations, keywords, SERPs, trends, competitors, GEO visibility, backlinks, rankings, and traffic through one SignalDig MCP connection.",
    "hero.btnInstall": "Install the Skill",
    "hero.btnAiSetup": "AI one-click setup",
    "hero.btnDownload": "Latest release",

    "userType.title": "Choose Your Installation Method",
    "userType.subtitle": "Pick the path that matches your client. AI one-click and marketplace installs are usually fastest; terminal and ZIP are for manual control.",
    "userType.ai.kicker": "Recommended",
    "userType.ai.title": "AI one-click setup",
    "userType.ai.desc": "Generate an API key on signaldig.com, let your AI configure MCP, then install the Skill.",
    "userType.ai.feature1": "Works with Codex, Claude, Cursor, Grok, WorkBuddy and more",
    "userType.ai.feature2": "Copy-ready prompts — no guesswork",
    "userType.ai.feature3": "Includes MCP connection check",
    "userType.market.title": "ClawHub / WorkBuddy",
    "userType.market.desc": "Install research-growth-signals from a Skill marketplace without cloning the repo.",
    "userType.market.feature1": "ClawHub: open and install research-growth-signals",
    "userType.market.feature2": "WorkBuddy: search SignalDig Growth Research in-app",
    "userType.market.feature3": "Still needs a SignalDig MCP API key",
    "userType.dev.title": "Developer",
    "userType.nondev.title": "ZIP download",
    "userType.dev.desc": "Clone the repository and copy the Skill from a terminal. macOS/Linux and Windows commands included.",
    "userType.dev.feature1": "Current repository version",
    "userType.dev.feature2": "Update with <code>git pull</code>",
    "userType.dev.feature3": "Inspect the complete source",
    "userType.nondev.desc": "Download the packaged Skill from GitHub Releases. Git is not required.",
    "userType.nondev.feature1": "Versioned release archive",
    "userType.nondev.feature2": "Download, unzip, and copy",
    "userType.nondev.feature3": "No terminal commands",
    "userType.btnSelect": "Select This Method",

    "workflow.title": "How a research request runs",
    "workflow.subtitle": "The same tool submits the request and reads the result. A single analysis ID keeps the run traceable.",
    "workflow.step1.title": "Submit research",
    "workflow.step1.desc": "The Skill selects Social or SEO, sends the smallest useful scope, and stores the returned analysis ID.",
    "workflow.step2.title": "Poll the result",
    "workflow.step2.desc": "It checks that same analysis ID until the run completes. Slow work is not submitted twice.",
    "workflow.step3.title": "Read the evidence",
    "workflow.step3.desc": "The answer includes the actual coverage, source links, gaps, and analysis ID. Missing data stays unknown rather than becoming a guessed value.",

    "features.title": "What data you get after connecting",
    "features.subtitle": "The Skill routes natural-language research through one SignalDig MCP connection. Below is the data currently available — platforms, returned fields, and research tasks.",
    "features.coverage.title": "Data sources available now",
    "features.coverage.intro": "Public and licensed market data currently returned by the service. Coverage depends on the query and source availability.",
    "features.coverage.search.label": "Search",
    "features.coverage.search.data": "Monthly keyword demand and related terms, Google Trends relative interest, and current Google or Bing SERPs.",
    "features.coverage.ai.label": "AI search",
    "features.coverage.ai.data": "Google AI Mode results, brand or domain mentions, cited pages, and current visibility metrics.",
    "features.coverage.social.label": "Social and content",
    "features.coverage.social.data": "Public posts, articles, profiles, trends, and the engagement metrics returned by each platform.",
    "features.c1.title": "Keyword &amp; search research",
    "features.c1.get": "You get keyword metrics, trend data, and the current SERP to judge topic demand and competition.",
    "features.c1.desc": "Google Ads monthly volume, related terms, Google Trends relative interest, and live Google or Bing SERP snapshots.",
    "features.c2.title": "GEO &amp; AI search visibility",
    "features.c2.get": "You get mentions, cited pages, and visibility metrics for a specific market, language, and device snapshot.",
    "features.c2.desc": "Google AI Mode results, AI search demand estimates, brand or domain mentions, and frequently cited pages.",
    "features.c3.title": "Search competitor research",
    "features.c3.get": "You get search overlap, estimated ranked keywords, and traffic estimates to shortlist sites worth comparing.",
    "features.c3.desc": "Domains co-appearing in SERPs, model-estimated ranked keywords, and estimated organic/paid search traffic.",
    "features.c4.title": "Backlink research",
    "features.c4.get": "You get source pages, target pages, anchor text, and live/lost status for links worth verifying next.",
    "features.c4.desc": "Observable backlinks and referring domains with link attributes and timing — not a quality score by itself.",
    "features.c5.title": "Social &amp; content demand",
    "features.c5.get": "You get source links, publish times, and platform-native metrics to find repeated questions and content angles.",
    "features.c5.desc": "Public posts and profiles on X, Reddit, Zhihu, Xiaohongshu, and Threads within the platforms and topics you asked for.",
    "features.s1.title": "Public social research",
    "features.s1.desc": "Find public topic discussions on X, Reddit, Xiaohongshu, Zhihu, and Threads without widening the requested platform or topic.",
    "features.s2.title": "SEO research",
    "features.s2.desc": "Check keyword demand, SERPs, trends, competitors, GEO visibility, backlinks, ranked keywords, and traffic evidence.",
    "features.cta": "See full data catalog on signaldig.com →",

    "install.ai.title": "AI one-click setup",
    "install.ai.subtitle": "The official SignalDig setup page generates your API key, gives copy-ready MCP and Skill prompts, and includes a connection check. Use it when you want the AI client to configure itself.",
    "install.ai.step1": "Open the Agent setup page and sign in to create a SignalDig API key (shown once).",
    "install.ai.step2": "Copy the MCP setup prompt into your AI client. Enter the key only in a protected Secret / password field — never in chat.",
    "install.ai.step3": "Copy the Skill install prompt so the client installs <code>research-growth-signals</code>, or use ClawHub / WorkBuddy if your client prefers a marketplace.",
    "install.ai.note": "Recommended path for most users — MCP, API key, and Skill install in one flow.",
    "install.ai.cta": "Open AI one-click setup →",

    "install.market.title": "Install from ClawHub or WorkBuddy",
    "install.market.subtitle": "Marketplace installs put <code>research-growth-signals</code> into the client without cloning this repo. You still need a SignalDig MCP connection and API key.",
    "install.market.clawhub.title": "Install from ClawHub",
    "install.market.clawhub.body": "Open ClawHub and install the maintained <code>research-growth-signals</code> Skill. Historical SignalDig Skills are compatibility entries and are not needed for new setups.",
    "install.market.clawhub.cta": "Open ClawHub →",
    "install.market.workbuddy.title": "WorkBuddy: install in the app",
    "install.market.workbuddy.body": "In WorkBuddy Skill search, find and install <strong>SignalDig Growth Research</strong>. You do not need to download the ZIP first.",
    "install.market.workbuddy.step1": "Open WorkBuddy and go to Skill search.",
    "install.market.workbuddy.step2": "Search for <strong>SignalDig Growth Research</strong> or <code>research-growth-signals</code>.",
    "install.market.workbuddy.step3": "Install that result, then connect SignalDig MCP with your API key.",

    "install.dev.title": "Developer Installation",
    "install.dev.subtitle": "Clone the repository and copy <code>research-growth-signals</code> into your agent's skills directory. Commands are provided for macOS/Linux and Windows.",
    "install.step1": "Step 1: Clone the repository",
    "install.step1.hint": "Same clone command on every OS. On Windows, run it in Git Bash, PowerShell (with Git installed), or Windows Terminal.",
    "install.step2": "Step 2: Choose your OS, agent, and copy the Skill",
    "install.step2.hint": "Pick your operating system first, then the AI client. Run the copy command from the parent folder of <code>seo-signal-skills</code> (the directory that contains the cloned repo).",
    "install.os.unix.hint": "macOS / Linux: run the command in Terminal from the parent of the cloned repo.",
    "install.os.windows.hint": "Windows: run the PowerShell command below in PowerShell from the parent of the cloned repo. If you prefer File Explorer, copy <code>skills\\research-growth-signals</code> into the destination folder and choose Replace when asked.",
    "install.step3": "Step 3: Connect SignalDig MCP",
    "install.mcp.note": "<strong>Note:</strong> The alias <code>signaldig</code> is configurable. Every client connects to the same endpoint.",
    "install.mcp.codex.path": "macOS/Linux: <code>~/.codex/config.toml</code> · Windows: <code>%USERPROFILE%\\.codex\\config.toml</code>",
    "install.mcp.windsurf.path": "macOS/Linux: <code>~/.codeium/mcp_config.json</code> · Windows: <code>%USERPROFILE%\\.codeium\\mcp_config.json</code>",
    "install.windowsEnv.title": "Windows: set SIGNALDIG_API_KEY first",
    "install.windowsEnv.1": "Press the Windows key, search for, and open “Edit environment variables for your account.”",
    "install.windowsEnv.2": "Under User variables, click New. Name: <code>SIGNALDIG_API_KEY</code>. Value: your SignalDig API key.",
    "install.windowsEnv.3": "OK to save. Fully quit and reopen your AI client. <code>%USERPROFILE%</code> is your Windows user folder.",
    "install.apikey.note": "Get your API key from your SignalDig workspace dashboard.",
    "install.apikey.cta": "Get your API Key →",
    "install.mcp.clients.note": "<strong>Tip:</strong> Register the SignalDig MCP server once per agent — connection parameters are fixed. Examples for common clients:",
    "install.cmd.unix": "Copy into {client} (Terminal)",
    "install.cmd.windows": "Copy into {client} (PowerShell)",

    "install.nondev.title": "Simple Download Installation",
    "install.nondev.subtitle": "Download the release archive, unzip it, and copy <code>research-growth-signals</code> into your agent's skills folder.",
    "install.nondev.step1": "Step 1: Download the skills",
    "install.nondev.downloadBtn": "Download seo-signal-skills.zip",
    "install.nondev.downloadHint": "Contains the single supported research-growth-signals Skill",
    "install.nondev.step1.1": "Click the button above — a GitHub \"Releases\" page opens in a new tab.",
    "install.nondev.step1.2": "Find the newest version (marked <strong>Latest</strong>) and click the <code>seo-signal-skills-*.zip</code> file to download it.",
    "install.nondev.step1.3": "The file is saved to your <strong>Downloads</strong> folder — a download prompt also appears in your browser.",
    "install.nondev.step2": "Step 2: Unzip the downloaded file",
    "install.nondev.extract1": "Open your <strong>Downloads</strong> folder and find the <code>seo-signal-skills-*.zip</code> file.",
    "install.nondev.extract2": "Windows: right-click the file → choose <strong>\"Extract All…\"</strong> → click <strong>Extract</strong>. Mac: just double-click the file — it unzips automatically.",
    "install.nondev.extract3": "A new folder with the release version in its name appears. Open it.",
    "install.nondev.extract4": "Inside you will see one folder: <code>research-growth-signals</code>. It is the only supported Skill.",
    "install.nondev.step3": "Step 3: Put the skills into your AI agent",
    "install.nondev.step3.hint": "Every AI client has its own <strong>skills folder</strong>. Copy <code>research-growth-signals</code> there. Paths below show macOS/Linux (<code>~</code>) and Windows (<code>%USERPROFILE%</code>).",
    "install.nondev.findFolder.title": "Can't find the skills folder? Do this:",
    "install.nondev.findFolder.1": "Open your home folder. Mac: press <code>Cmd + Shift + H</code> in Finder. Windows: open File Explorer and go to <code>C:\\Users\\YourUserName</code>.",
    "install.nondev.findFolder.2": "The skills folder is <strong>hidden</strong> (its name starts with a dot). To see hidden files: Mac — press <code>Cmd + Shift + .</code>; Windows — click <strong>View</strong> at the top, then tick <strong>Hidden items</strong>.",
    "install.nondev.findFolder.3": "Look for the folder named after your AI client: <code>.claude</code>, <code>.codex</code>, <code>.cursor</code> or <code>.windsurf</code>. Open it, then open the <code>skills</code> sub-folder inside.",
    "install.nondev.findFolder.4": "No <code>skills</code> folder? Right-click → <strong>New Folder</strong> → name it exactly <code>skills</code>.",
    "install.nondev.guide1": "Open the folder you unzipped",
    "install.nondev.guide2": "Select the <code>research-growth-signals</code> folder",
    "install.nondev.guide3": "Copy them: <code>Ctrl + C</code> (Windows) / <code>Cmd + C</code> (Mac)",
    "install.nondev.guide4": "Open your AI's <code>skills</code> folder and paste: <code>Ctrl + V</code> / <code>Cmd + V</code>",
    "install.nondev.step3.done": "<strong>Done!</strong> Your skills folder should now contain <code>research-growth-signals</code>. Fully quit and reopen your AI app.",
    "install.nondev.step4": "Step 4: Connect the data service (required)",
    "install.nondev.step4.hint": "The skills fetch real data through SignalDig's data service (called MCP). Without this step the AI cannot get real data — so this step cannot be skipped.",
    "install.nondev.mcpWhat": "MCP is like a <strong>bridge</strong> between your AI and SignalDig's data service. Here is the easiest way to set it up:",
    "install.nondev.mcp1": "Open <code>research-growth-signals/SKILL.md</code> with a text editor.",
    "install.nondev.mcp2": "Copy the whole content of <code>SKILL.md</code>, paste it into your AI chat, and tell it: <em>\"Please configure this MCP connection for me.\"</em>",
    "install.nondev.mcp3": "The AI will guide you or configure it directly. If it asks for an API Key, click the button below to get a free one.",
    "install.nondev.mcpKeyHint": "The API Key is like your <strong>data pass</strong> for SignalDig services. Keep it private — don't paste it into chats you don't trust.",
    "install.nondev.viewDocs": "View Full Documentation →",

    "install.backToSelection": "← Choose a different installation method",

    "footer.tagline": "Evidence before opinion.",
    "footer.site": "Official site: signaldig.com"
  },
  zh: {
    "nav.blog": "指南",
    "nav.install": "安装",
    "nav.workflow": "工作流程",
    "nav.site": "官方网站",

    "hero.title": "一个 Agent Skill<br />完成 Social 与 SEO 研究",
    "hero.subtitle": "通过一个 SignalDig MCP 连接，查询公开社媒讨论、关键词、SERP、趋势、竞品、GEO 可见度、外链、排名与流量证据。",
    "hero.btnInstall": "安装 Skill",
    "hero.btnAiSetup": "AI 一键接入",
    "hero.btnDownload": "最新版本",

    "userType.title": "选择安装方式",
    "userType.subtitle": "按你的客户端选择路径。AI 一键接入和商店安装通常最快；终端与 ZIP 适合需要手动控制的场景。",
    "userType.ai.kicker": "推荐",
    "userType.ai.title": "AI 一键接入",
    "userType.ai.desc": "在 signaldig.com 生成 API Key，让 AI 配置 MCP，再安装 Skill。",
    "userType.ai.feature1": "支持 Codex、Claude、Cursor、Grok、WorkBuddy 等",
    "userType.ai.feature2": "可直接复制的提示词，无需猜测步骤",
    "userType.ai.feature3": "含 MCP 连接检查",
    "userType.market.title": "ClawHub / WorkBuddy",
    "userType.market.desc": "从 Skill 商店安装 research-growth-signals，无需克隆仓库。",
    "userType.market.feature1": "ClawHub：打开并安装 research-growth-signals",
    "userType.market.feature2": "WorkBuddy：在 App 内搜索 SignalDig Growth Research",
    "userType.market.feature3": "仍需配置 SignalDig MCP API Key",
    "userType.dev.title": "开发者",
    "userType.nondev.title": "ZIP 下载",
    "userType.dev.desc": "通过终端克隆仓库并复制 Skill。提供 macOS/Linux 与 Windows 命令。",
    "userType.dev.feature1": "使用仓库当前版本",
    "userType.dev.feature2": "通过 <code>git pull</code> 更新",
    "userType.dev.feature3": "可查看完整源码",
    "userType.nondev.desc": "从 GitHub Releases 下载打包好的 Skill，不需要安装 Git。",
    "userType.nondev.feature1": "带版本号的发布包",
    "userType.nondev.feature2": "下载、解压、复制即可",
    "userType.nondev.feature3": "无需终端命令",
    "userType.btnSelect": "选择此方式",

    "workflow.title": "一次研究请求如何运行",
    "workflow.subtitle": "同一个工具负责提交请求和读取结果，全程沿用同一个 analysis ID。",
    "workflow.step1.title": "提交研究请求",
    "workflow.step1.desc": "Skill 判断该用 Social 还是 SEO，只提交完成任务所需的最小范围，并保存返回的 analysis ID。",
    "workflow.step2.title": "获取研究结果",
    "workflow.step2.desc": "它使用同一个 analysis ID 查询进度，任务耗时较长时也不会重复提交。",
    "workflow.step3.title": "查看证据",
    "workflow.step3.desc": "结果会说明实际覆盖范围、来源链接、缺口与 analysis ID；缺失数据保持未知，不用猜测值补齐。",

    "features.title": "接入之后可以得到哪些数据",
    "features.subtitle": "Skill 通过一个 SignalDig MCP 连接路由自然语言研究。下面是当前可查询的平台、返回内容与研究任务。",
    "features.coverage.title": "当前可查询的数据源",
    "features.coverage.intro": "这里列的是当前接口可返回的公开数据和授权市场数据。具体覆盖取决于查询条件和数据可用性。",
    "features.coverage.search.label": "搜索",
    "features.coverage.search.data": "关键词月均搜索量与相关词、Google Trends 相对指数，以及 Google 或 Bing 当前 SERP。",
    "features.coverage.ai.label": "AI 搜索",
    "features.coverage.ai.data": "Google AI Mode 结果、品牌或域名提及、被引用页面与当前可见性指标。",
    "features.coverage.social.label": "社媒与内容",
    "features.coverage.social.data": "公开帖子、文章、账号资料、趋势，以及各平台当次返回的互动指标。",
    "features.c1.title": "搜索与关键词研究",
    "features.c1.get": "你会得到关键词指标、趋势数据和当前 SERP，供你继续判断选题与竞争情况。",
    "features.c1.desc": "Google Ads 月均搜索量、相关词、Google Trends 相对兴趣指数，以及 Google 或 Bing 实时 SERP。",
    "features.c2.title": "GEO 与 AI 搜索可见性",
    "features.c2.get": "你会得到指定条件下的提及、引用页面和可见性指标；结果是当前时点的观察快照。",
    "features.c2.desc": "Google AI Mode 结果、AI 搜索需求估算、品牌或域名提及，以及高频被引用页面。",
    "features.c3.title": "搜索竞品研究",
    "features.c3.get": "你会得到搜索重合、估算排名词和流量数据，供你圈定后续要比较的网站与页面。",
    "features.c3.desc": "共同出现在搜索结果中的域名、模型估算排名关键词，以及估算自然/付费搜索流量。",
    "features.c4.title": "网站外链研究",
    "features.c4.get": "你会得到来源页、目标页、锚文本与 live/lost 状态，供你筛选需要继续核查的链接。",
    "features.c4.desc": "可观察的外链与引用域名，含链接属性和时间信息——不是单一质量评分。",
    "features.c5.title": "社媒与内容需求研究",
    "features.c5.get": "你会得到原帖链接、发布时间和平台原生指标，供你整理重复讨论与内容线索。",
    "features.c5.desc": "在你指定的平台与话题范围内，查询 X、Reddit、知乎、小红书和 Threads 的公开帖子与资料。",
    "features.s1.title": "公开社媒研究",
    "features.s1.desc": "查找 X、Reddit、小红书、知乎和 Threads 上的公开话题讨论，不擅自扩大平台或话题范围。",
    "features.s2.title": "SEO 研究",
    "features.s2.desc": "查询关键词需求、SERP、趋势、竞品、GEO 可见度、外链、排名关键词和流量证据。",
    "features.cta": "在 signaldig.com 查看完整数据能力 →",

    "install.ai.title": "AI 一键接入",
    "install.ai.subtitle": "官方接入页可生成 API Key、提供可复制的 MCP 与 Skill 提示词，并包含连接检查。适合让 AI 客户端自行完成配置。",
    "install.ai.step1": "打开 Agent 接入页并登录，生成 SignalDig API Key（只显示一次）。",
    "install.ai.step2": "把 MCP 接入提示词复制给 AI。密钥只填入受保护的 Secret / 密码框，不要发到聊天里。",
    "install.ai.step3": "再复制 Skill 安装提示词，让客户端安装 <code>research-growth-signals</code>；若客户端更适合商店安装，可用 ClawHub / WorkBuddy。",
    "install.ai.note": "多数用户的推荐路径——API Key、MCP 与 Skill 安装在同一流程完成。",
    "install.ai.cta": "打开 AI 一键接入 →",

    "install.market.title": "从 ClawHub 或 WorkBuddy 安装",
    "install.market.subtitle": "商店安装会把 <code>research-growth-signals</code> 放进客户端，无需克隆本仓库。你仍需配置 SignalDig MCP 与 API Key。",
    "install.market.clawhub.title": "从 ClawHub 安装",
    "install.market.clawhub.body": "打开 ClawHub，安装持续维护的 <code>research-growth-signals</code> Skill。历史 SignalDig Skills 仅为兼容条目，新接入不必安装。",
    "install.market.clawhub.cta": "打开 ClawHub →",
    "install.market.workbuddy.title": "WorkBuddy：在 App 内直接安装",
    "install.market.workbuddy.body": "在 WorkBuddy 的 Skill 搜索中找到并安装 <strong>SignalDig Growth Research</strong>。无需先下载 ZIP。",
    "install.market.workbuddy.step1": "打开 WorkBuddy，进入 Skill 搜索。",
    "install.market.workbuddy.step2": "搜索 <strong>SignalDig Growth Research</strong> 或 <code>research-growth-signals</code>。",
    "install.market.workbuddy.step3": "安装该结果，再用 API Key 连接 SignalDig MCP。",

    "install.dev.title": "开发者安装",
    "install.dev.subtitle": "克隆仓库后，将 <code>research-growth-signals</code> 复制到 Agent 的 skills 目录。提供 macOS/Linux 与 Windows 命令。",
    "install.step1": "步骤 1：克隆仓库",
    "install.step1.hint": "各系统克隆命令相同。Windows 可在 Git Bash、已安装 Git 的 PowerShell 或 Windows Terminal 中执行。",
    "install.step2": "步骤 2：选择系统、Agent 并复制 Skill",
    "install.step2.hint": "先选操作系统，再选 AI 客户端。请在 <code>seo-signal-skills</code> 的父目录（包含已克隆仓库的那一层）执行复制命令。",
    "install.os.unix.hint": "macOS / Linux：在终端中、于已克隆仓库的父目录执行下方命令。",
    "install.os.windows.hint": "Windows：在 PowerShell 中、于已克隆仓库的父目录执行下方命令。若更习惯资源管理器，可将 <code>skills\\research-growth-signals</code> 复制到目标目录，提示覆盖时选择替换。",
    "install.step3": "步骤 3：连接 MCP 服务器（名称可自定义）",
    "install.mcp.note": "<strong>注意：</strong><code>signaldig</code> 只是可自定义的别名；所有客户端连接同一个服务地址。",
    "install.mcp.codex.path": "macOS/Linux：<code>~/.codex/config.toml</code> · Windows：<code>%USERPROFILE%\\.codex\\config.toml</code>",
    "install.mcp.windsurf.path": "macOS/Linux：<code>~/.codeium/mcp_config.json</code> · Windows：<code>%USERPROFILE%\\.codeium\\mcp_config.json</code>",
    "install.windowsEnv.title": "Windows：先设置 SIGNALDIG_API_KEY",
    "install.windowsEnv.1": "按 Windows 键，搜索并打开「编辑帐户的环境变量」。",
    "install.windowsEnv.2": "在「用户变量」中点击「新建」。变量名：<code>SIGNALDIG_API_KEY</code>；变量值：你的 SignalDig API Key。",
    "install.windowsEnv.3": "确定保存。完全退出 AI 客户端后再重新打开。<code>%USERPROFILE%</code> 指你的 Windows 用户目录。",
    "install.apikey.note": "从您的 SignalDig 工作空间控制台获取 API 密钥。",
    "install.apikey.cta": "前往官网获取 →",
    "install.mcp.clients.note": "<strong>提示：</strong>在每个 Agent 中各注册一次 SignalDig MCP 服务即可，连接参数固定。以下为常用客户端的配置示例：",
    "install.cmd.unix": "复制到 {client}（终端）",
    "install.cmd.windows": "复制到 {client}（PowerShell）",

    "install.nondev.title": "简易下载安装",
    "install.nondev.subtitle": "下载发布包并解压，再把 <code>research-growth-signals</code> 复制到 Agent 的 skills 目录。",
    "install.nondev.step1": "第 1 步：下载技能包",
    "install.nondev.downloadBtn": "下载 seo-signal-skills.zip",
    "install.nondev.downloadHint": "仅包含唯一受支持的 research-growth-signals Skill",
    "install.nondev.step1.1": "点击上面的按钮，浏览器会打开一个 GitHub「Releases（发行版）」页面。",
    "install.nondev.step1.2": "在页面上找到最新版本（标记为 <strong>Latest</strong>），点击它下方的 <code>seo-signal-skills-*.zip</code> 文件开始下载。",
    "install.nondev.step1.3": "文件会保存到你的「下载」文件夹（浏览器左下角也会出现下载提示）。",
    "install.nondev.step2": "第 2 步：解压下载好的文件",
    "install.nondev.extract1": "打开你的「下载」文件夹，找到 <code>seo-signal-skills-*.zip</code> 文件。",
    "install.nondev.extract2": "Windows：右键点击该文件 → 选择「全部解压…」→ 点击「提取」。Mac：直接双击该文件即可自动解压。",
    "install.nondev.extract3": "解压后会出现一个带版本号的文件夹，打开它。",
    "install.nondev.extract4": "解压后只会看到 <code>research-growth-signals</code> 目录；这是唯一受支持的 Skill。",
    "install.nondev.step3": "第 3 步：把技能放进您的 AI 客户端",
    "install.nondev.step3.hint": "每个 AI 客户端都有自己的 skills 文件夹。请把 <code>research-growth-signals</code> 复制进去。下方同时给出 macOS/Linux（<code>~</code>）与 Windows（<code>%USERPROFILE%</code>）路径。",
    "install.nondev.findFolder.title": "找不到技能文件夹？按下面这样做：",
    "install.nondev.findFolder.1": "打开你的主文件夹。Mac：在访达（Finder）中按 <code>Cmd + Shift + H</code>。Windows：打开文件资源管理器，进入 <code>C:\\Users\\你的用户名</code>。",
    "install.nondev.findFolder.2": "技能文件夹是「隐藏文件夹」（名字以 . 开头），默认看不到。Mac：按 <code>Cmd + Shift + .</code> 显示隐藏文件；Windows：点击顶部「查看」，勾选「隐藏的项目」。",
    "install.nondev.findFolder.3": "找到以你的 AI 客户端命名的文件夹：<code>.claude</code>、<code>.codex</code>、<code>.cursor</code> 或 <code>.windsurf</code>。双击进入，再进入里面的 <code>skills</code> 子文件夹。",
    "install.nondev.findFolder.4": "如果里面没有 <code>skills</code> 文件夹：右键 → 「新建文件夹」，命名为 <code>skills</code>。",
    "install.nondev.guide1": "打开你解压出的文件夹",
    "install.nondev.guide2": "选中 <code>research-growth-signals</code> 文件夹",
    "install.nondev.guide3": "复制它们（Windows 按 <code>Ctrl + C</code>，Mac 按 <code>Cmd + C</code>）",
    "install.nondev.guide4": "打开你 AI 客户端的 <code>skills</code> 文件夹并粘贴（<code>Ctrl + V</code> / <code>Cmd + V</code>）",
    "install.nondev.step3.done": "<strong>完成！</strong>skills 文件夹里现在应该能看到 <code>research-growth-signals</code>。请完全退出并重新打开 AI 应用。",
    "install.nondev.step4": "第 4 步：连接数据服务（必需）",
    "install.nondev.step4.hint": "技能需要通过 SignalDig 的数据服务（MCP）获取真实数据。跳过这一步，AI 就拿不到真实数据，所以这一步不能省。",
    "install.nondev.mcpWhat": "MCP 就像 AI 与 SignalDig 数据服务之间的「桥梁」。下面是配置它的最简单方法：",
    "install.nondev.mcp1": "用文本编辑器打开 <code>research-growth-signals/SKILL.md</code>。",
    "install.nondev.mcp2": "把 <code>SKILL.md</code> 的全部内容复制，粘贴到你的 AI 对话框中，然后告诉它：「请帮我配置这个 MCP 连接」。",
    "install.nondev.mcp3": "AI 会指导你操作，或直接帮你配置好。如果它向你要 API Key，点击下面的按钮去官网获取（免费）。",
    "install.nondev.mcpKeyHint": "API Key 相当于你连接 SignalDig 服务的「数据通行证」。请妥善保管，不要粘贴到不可信的聊天中。",
    "install.nondev.viewDocs": "查看完整文档 →",

    "install.backToSelection": "← 选择其他安装方式",

    "footer.tagline": "证据优先于观点。",
    "footer.site": "官方网站：signaldig.com"
  }
};

const LOCALE_HREFS = {
  "agent-setup": {
    en: "https://signaldig.com/agent-setup",
    zh: "https://signaldig.com/zh/agent-setup",
  },
  features: {
    en: "https://signaldig.com/features",
    zh: "https://signaldig.com/zh/features",
  },
};

let currentLang = "en";
let currentOs = "unix";
let currentPlatform = "claude";

function syncBlogNavLink(lang) {
  const blogLink = document.querySelector("[data-nav-blog]");
  if (!blogLink || !window.LangPref) return;
  blogLink.href = window.LangPref.blogIndexUrl(lang);
}

function syncLocaleHrefs(lang) {
  document.querySelectorAll("[data-locale-href]").forEach((el) => {
    const key = el.dataset.localeHref;
    const map = LOCALE_HREFS[key];
    if (!map) return;
    el.href = map[lang] || map.en;
  });
}

function setLanguage(lang) {
  const next = (window.LangPref && window.LangPref.normalize(lang)) || lang;
  if (!next || !I18N[next]) return;

  currentLang = next;
  if (window.LangPref) window.LangPref.setStoredLang(next);
  document.documentElement.lang = next;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (I18N[next] && I18N[next][key]) {
      el.innerHTML = I18N[next][key];
    }
  });

  document.querySelectorAll(".lang-switch button").forEach((btn) => {
    btn.classList.toggle("lang-active", btn.dataset.lang === next);
  });

  syncBlogNavLink(next);
  syncLocaleHrefs(next);
  updateOsHint();
}

// ── Skill data ──
const SKILLS = [
  {
    id: "research-growth-signals",
    name: { en: "SignalDig Growth Research", zh: "SignalDig 增长研究" },
    desc: {
      en: "Route natural-language questions to bounded Social or SEO research through one SignalDig MCP connection.",
      zh: "通过一个 SignalDig MCP 连接，把自然语言问题路由到有边界的 Social 或 SEO 研究。",
    },
    files: [
      { name: "SKILL.md", type: "file" },
      { name: "agents/", type: "dir" },
      { name: "  openai.yaml", type: "file" },
      { name: "references/", type: "dir" },
      { name: "  mcp-contract.md", type: "file" },
    ],
  },
];

// ── Platform config ──
const PLATFORMS = {
  claude: {
    label: "Claude Code",
    skillsDirUnix: "~/.claude/skills",
    skillsDirWin: "$env:USERPROFILE\\.claude\\skills",
  },
  codex: {
    label: "Codex",
    skillsDirUnix: "~/.codex/skills",
    skillsDirWin: "$env:USERPROFILE\\.codex\\skills",
  },
  cursor: {
    label: "Cursor",
    skillsDirUnix: "~/.cursor/skills",
    skillsDirWin: "$env:USERPROFILE\\.cursor\\skills",
  },
  windsurf: {
    label: "Windsurf",
    skillsDirUnix: "~/.windsurf/skills",
    skillsDirWin: "$env:USERPROFILE\\.windsurf\\skills",
  },
};

const REPO_DIR = "seo-signal-skills";

function buildFileTreeHTML(files) {
  return files
    .map((f) => {
      const cls = f.type === "dir" ? "tree-dir" : "tree-file";
      return `<span class="${cls}">${f.name}</span>`;
    })
    .join("\n");
}

function buildCopyCmd(skillId, platform, os) {
  if (os === "windows") {
    const dir = PLATFORMS[platform].skillsDirWin;
    return [
      `$dest = "${dir}"`,
      "New-Item -ItemType Directory -Force -Path $dest | Out-Null",
      `Remove-Item -Recurse -Force (Join-Path $dest "${skillId}") -ErrorAction SilentlyContinue`,
      `Copy-Item -Recurse (Join-Path (Get-Location) "${REPO_DIR}\\skills\\${skillId}") $dest`,
    ].join("\n");
  }

  const dir = PLATFORMS[platform].skillsDirUnix;
  return `mkdir -p ${dir} && rm -rf ${dir}/${skillId} && cp -r "$(pwd)/${REPO_DIR}/skills/${skillId}" ${dir}/`;
}

function cmdLabel(platform) {
  const key = currentOs === "windows" ? "install.cmd.windows" : "install.cmd.unix";
  const template = (I18N[currentLang] && I18N[currentLang][key]) || I18N.en[key];
  return template.replace("{client}", PLATFORMS[platform].label);
}

function updateOsHint() {
  const hint = document.getElementById("os-hint");
  if (!hint) return;
  const key = currentOs === "windows" ? "install.os.windows.hint" : "install.os.unix.hint";
  const text = (I18N[currentLang] && I18N[currentLang][key]) || I18N.en[key];
  hint.innerHTML = text;
  hint.dataset.i18n = key;
}

function renderSkillCards(platform) {
  const container = document.getElementById("skill-cards");
  if (!container) return;

  currentPlatform = platform || currentPlatform;

  container.innerHTML = SKILLS.map((skill) => {
    const cmd = buildCopyCmd(skill.id, currentPlatform, currentOs);
    const fileTreeHTML = buildFileTreeHTML(skill.files);
    const name = skill.name[currentLang] || skill.name.en;
    const desc = skill.desc[currentLang] || skill.desc.en;
    const encoded = encodeURIComponent(cmd);
    const displayCmd = cmd
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return `
      <div class="skill-card">
        <div class="skill-card-header">
          <h4>${name}</h4>
          <span class="skill-badge">${skill.id}</span>
        </div>
        <p class="skill-card-desc">${desc}</p>
        <div class="file-tree"><pre><code>${fileTreeHTML}</code></pre></div>
        <div class="skill-cmd">
          <span class="skill-cmd-label">${cmdLabel(currentPlatform)}</span>
          <div class="code-row">
            <pre><code>${displayCmd}</code></pre>
            <button type="button" data-copy-encoded="${encoded}">Copy</button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  bindCopyButtons();
}

function readCopyValue(button) {
  if (button.dataset.copyEncoded) {
    try {
      return decodeURIComponent(button.dataset.copyEncoded);
    } catch {
      return button.dataset.copyEncoded;
    }
  }
  return button.dataset.copy || "";
}

function bindCopyButtons() {
  document.querySelectorAll("[data-copy], [data-copy-encoded]").forEach((button) => {
    if (button.dataset.bound) return;
    button.dataset.bound = "1";

    button.addEventListener("click", async () => {
      const value = readCopyValue(button);
      if (!value) return;

      await navigator.clipboard.writeText(value);
      const original = button.textContent;
      button.textContent = currentLang === "zh" ? "已复制" : "Copied";
      window.setTimeout(() => {
        button.textContent = original;
      }, 1400);
    });
  });
}

function initOsTabs() {
  const tabs = document.querySelectorAll(".os-tabs button");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const os = tab.dataset.os;
      if (!os) return;
      currentOs = os;
      tabs.forEach((t) => t.setAttribute("aria-selected", "false"));
      tab.setAttribute("aria-selected", "true");
      updateOsHint();
      renderSkillCards(currentPlatform);
    });
  });
}

function initTabs() {
  const tabs = document.querySelectorAll(".platform-tabs button");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const platform = tab.dataset.platform;
      if (!platform) return;

      tabs.forEach((t) => t.setAttribute("aria-selected", "false"));
      tab.setAttribute("aria-selected", "true");

      renderSkillCards(platform);
    });
  });

  renderSkillCards(currentPlatform);
}

function initLanguageSwitch() {
  const initial =
    (window.LangPref && window.LangPref.getPreferredLang("en")) || "en";
  setLanguage(initial);

  document.querySelectorAll(".lang-switch button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      if (lang && lang !== currentLang) {
        setLanguage(lang);
        renderSkillCards(currentPlatform);
      }
    });
  });
}

function hideAllInstallSections() {
  document.querySelectorAll(
    ".install-ai-section, .install-market-section, .install-dev-section, .install-nondev-section"
  ).forEach((el) => {
    el.style.display = "none";
  });
}

function initUserTypeSelection() {
  const selectBtns = document.querySelectorAll(".select-user-btn");
  const userTypeSection = document.querySelector(".user-type-section");
  const backBtn = document.getElementById("back-to-selection");
  const backContainer = document.querySelector(".back-to-selection");
  const sectionMap = {
    ai: document.querySelector(".install-ai-section"),
    marketplace: document.querySelector(".install-market-section"),
    developer: document.querySelector(".install-dev-section"),
    "non-developer": document.querySelector(".install-nondev-section"),
  };

  selectBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const userType = btn.dataset.select;
      const target = sectionMap[userType];
      if (!target) return;

      if (userTypeSection) userTypeSection.style.display = "none";
      hideAllInstallSections();
      target.style.display = "block";
      if (backContainer) backContainer.style.display = "block";
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      hideAllInstallSections();
      if (backContainer) backContainer.style.display = "none";
      if (userTypeSection) {
        userTypeSection.style.display = "block";
        userTypeSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

initOsTabs();
initTabs();
initLanguageSwitch();
initUserTypeSelection();
bindCopyButtons();
