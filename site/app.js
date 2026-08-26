// ── Internationalization (i18n) ──
const I18N = {
  en: {
    // Navigation
    "nav.install": "Install",
    "nav.workflow": "Workflow",
    "nav.site": "Official Site",
    
    // Hero
    "hero.title": "Turn traceable signals<br />into content decisions",
    "hero.subtitle": "Three focused skills.<br />From research evidence to a testable recommendation.",
    "hero.btnInstall": "Install Skills",
    "hero.btnDownload": "Download Release",
    
    // User Type Selection
    "userType.title": "Choose Your Installation Method",
    "userType.subtitle": "Select your user type to get the right installation guide for you.",
    "userType.desc": "Select the best installation method for your needs.",
    "userType.dev.title": "Developer / 开发者",
    "userType.nondev.title": "Non-Developer / 非开发者",
    "userType.btnSelect": "Select This Method",
    
    // Workflow
    "workflow.title": "Research first. Decide from evidence.",
    "workflow.subtitle": "Each skill is a step in a loop: gather evidence, retrieve the result, then decide what to test next.",
    "workflow.step1.title": "Submit research",
    "workflow.step1.desc": "Ask your agent to research a keyword, topic, or market. It submits a traceable evidence run.",
    "workflow.step2.title": "Poll the result",
    "workflow.step2.desc": "Retrieve the finished evidence — search demand, social conversations, and native metrics.",
    "workflow.step3.title": "Decide and test",
    "workflow.step3.desc": "Review confidence, counter-evidence, and alternatives, then ship the recommendation and schedule the next test.",

    // Features
    "features.title": "What SignalDig does",
    "features.subtitle": "Three focused skills turn traceable SEO and social evidence into a clear, testable content decision.",
    "features.s1.title": "Research SEO demand signals",
    "features.s1.desc": "Find evidence-backed SEO demand for keywords, domains, markets, and languages — Google Trends, keyword volume, and SERP data.",
    "features.s2.title": "Retrieve social signals",
    "features.s2.desc": "Validate platform inputs and pull traceable public conversations, creator histories, account content, and native metrics from X, Reddit, Xiaohongshu, Zhihu, LinkedIn, and WeChat.",
    "features.s3.title": "Decide content opportunities",
    "features.s3.desc": "Turn completed SEO and social evidence into a recommended content direction — with confidence, counter-evidence, alternatives, and a next test.",
    "features.uc.title": "When to use it",
    "features.uc.1": "Pick the right keyword — confirm which keyword or topic has real, traceable search demand before you write.",
    "features.uc.2": "Validate a trending topic — check the evidence when a topic is buzzing on social platforms, before investing in content.",
    "features.uc.3": "Plan your content roadmap — turn research evidence into a prioritized content direction with a clear next test.",
    "features.uc.4": "Research a new market or language — gauge keyword, domain, and market demand across languages.",
    
    // Developer Install
    "install.dev.title": "Developer Installation",
    "install.dev.subtitle": "Clone the repo and copy the skill folders into your agent's skills directory. Each skill includes its own instructions, agent metadata, and only the references or templates it needs.",
    "install.step1": "Step 1: Clone the repository",
    "install.step2": "Step 2: Choose your agent & copy the skill folders",
    "install.step2.hint": "Select an agent platform to see the exact commands for each skill.",
    "install.step3": "Step 3: Connect MCP servers (optional naming)",
    "install.mcp.note": "<strong>Note:</strong> The server names below (e.g., <code>daily-growth-signals</code>) are <em>reference names</em>. You can customize them when configuring your AI client. The actual service endpoints remain the same.",
    "install.mcp.seo.title": "SEO Data Service",
    "install.mcp.seo.desc": "Google Trends, Keywords, SERP data",
    "install.mcp.social.title": "Social Media Service",
    "install.mcp.social.desc": "X, Reddit, Xiaohongshu, Zhihu, LinkedIn, WeChat",
    "install.mcp.decision.title": "Decision Engine",
    "install.mcp.decision.desc": "Content opportunity recommendations",
    "install.apikey.note": "Get your API key from your SignalDig workspace dashboard.",
    "install.apikey.cta": "Get your API Key →",
    "install.mcp.clients.note": "<strong>Tip:</strong> Register the SignalDig MCP server once per agent — connection parameters are fixed. Examples for common clients:",
    
    // Non-Developer Install
    "install.nondev.title": "Simple Download Installation",
    "install.nondev.subtitle": "Download the skills zip file, unzip it, and paste the skill folders into your AI agent. No coding or command line needed — just follow each step below.",
    "install.nondev.step1": "Step 1: Download the skills",
    "install.nondev.downloadBtn": "Download seo-signal-skills.zip",
    "install.nondev.downloadHint": "Contains all three skill folders, ready to use",
    "install.nondev.step1.1": "Click the button above — a GitHub \"Releases\" page opens in a new tab.",
    "install.nondev.step1.2": "Find the newest version (marked <strong>Latest</strong>) and click the <code>seo-signal-skills-*.zip</code> file to download it.",
    "install.nondev.step1.3": "The file is saved to your <strong>Downloads</strong> folder — a download prompt also appears in your browser.",
    "install.nondev.step2": "Step 2: Unzip the downloaded file",
    "install.nondev.extract1": "Open your <strong>Downloads</strong> folder and find the <code>seo-signal-skills-*.zip</code> file.",
    "install.nondev.extract2": "Windows: right-click the file → choose <strong>\"Extract All…\"</strong> → click <strong>Extract</strong>. Mac: just double-click the file — it unzips automatically.",
    "install.nondev.extract3": "A new folder with a similar name appears (e.g. <code>seo-signal-skills-1.2.0</code>). Double-click it to open it.",
    "install.nondev.extract4": "Inside you will see exactly three skill folders: <code>research-seo-signals</code>, <code>research-social-signals</code> and <code>decide-content-opportunities</code>.",
    "install.nondev.step3": "Step 3: Put the skills into your AI agent",
    "install.nondev.step3.hint": "Every AI client (Claude Code, Codex, Cursor, Windsurf…) has its own <strong>skills folder</strong>. Anything inside it becomes a skill your AI can use. Copy all three skill folders there.",
    "install.nondev.findFolder.title": "Can't find the skills folder? Do this:",
    "install.nondev.findFolder.1": "Open your home folder. Mac: press <code>Cmd + Shift + H</code> in Finder. Windows: open File Explorer and go to <code>C:\\Users\\YourUserName</code>.",
    "install.nondev.findFolder.2": "The skills folder is <strong>hidden</strong> (its name starts with a dot). To see hidden files: Mac — press <code>Cmd + Shift + .</code>; Windows — click <strong>View</strong> at the top, then tick <strong>Hidden items</strong>.",
    "install.nondev.findFolder.3": "Look for the folder named after your AI client: <code>.claude</code>, <code>.codex</code>, <code>.cursor</code> or <code>.windsurf</code>. Open it, then open the <code>skills</code> sub-folder inside.",
    "install.nondev.findFolder.4": "No <code>skills</code> folder? Right-click → <strong>New Folder</strong> → name it exactly <code>skills</code>.",
    "install.nondev.guide1": "Open the folder you unzipped (the one holding the three skill folders)",
    "install.nondev.guide2": "Select all three skill folders — click the first, hold <code>Shift</code>, click the last",
    "install.nondev.guide3": "Copy them: <code>Ctrl + C</code> (Windows) / <code>Cmd + C</code> (Mac)",
    "install.nondev.guide4": "Open your AI's <code>skills</code> folder and paste: <code>Ctrl + V</code> / <code>Cmd + V</code>",
    "install.nondev.step3.done": "<strong>Done!</strong> Your skills folder should now contain the three folders. Fully quit and reopen your AI app so it notices the new skills.",
    "install.nondev.step4": "Step 4: Connect the data service (required)",
    "install.nondev.step4.hint": "The skills fetch real data through SignalDig's data service (called MCP). Without this step the AI cannot get real data — so this step cannot be skipped.",
    "install.nondev.mcpWhat": "MCP is like a <strong>bridge</strong> between your AI and SignalDig's data service. Here is the easiest way to set it up:",
    "install.nondev.mcp1": "Open any skill folder you unzipped (e.g. <code>research-seo-signals</code>) and open its <code>SKILL.md</code> file with a text editor (Notepad / TextEdit).",
    "install.nondev.mcp2": "Copy the whole content of <code>SKILL.md</code>, paste it into your AI chat, and tell it: <em>\"Please configure this MCP connection for me.\"</em>",
    "install.nondev.mcp3": "The AI will guide you or configure it directly. If it asks for an API Key, click the button below to get a free one.",
    "install.nondev.mcpKeyHint": "The API Key is like your <strong>data pass</strong> for SignalDig services. Keep it private — don't paste it into chats you don't trust.",
    "install.nondev.viewDocs": "View Full Documentation →",
    
    // Common
    "install.backToSelection": "← Choose a different installation method",
    
    // Footer
    "footer.tagline": "Evidence before opinion.",
    "footer.site": "Official site: signaldig.com"
  },
  zh: {
    // Navigation
    "nav.install": "安装",
    "nav.workflow": "工作流程",
    "nav.site": "官方网站",
    
    // Hero
    "hero.title": "将可追溯的信号<br />转化为内容决策",
    "hero.subtitle": "三个专注的技能。<br />从研究证据到可测试的建议。",
    "hero.btnInstall": "安装技能",
    "hero.btnDownload": "下载发布包",
    
    // User Type Selection
    "userType.title": "选择您的安装方式",
    "userType.subtitle": "选择您的用户类型，获取适合您的安装指南。",
    "userType.desc": "选择最适合您需求的安装方式。",
    "userType.dev.title": "开发者 / Developer",
    "userType.nondev.title": "非开发者 / Non-Developer",
    "userType.btnSelect": "选择此方式",
    
    // Workflow
    "workflow.title": "先研究，基于证据做决策。",
    "workflow.subtitle": "每个技能都是循环中的一步：收集证据、获取结果、决定下一步测试什么。",
    "workflow.step1.title": "提交研究请求",
    "workflow.step1.desc": "让您的 Agent 研究某个关键词、话题或市场，它会提交一次可追溯的证据采集任务。",
    "workflow.step2.title": "获取研究结果",
    "workflow.step2.desc": "取回已完成的证据——搜索需求、社交对话和原生指标。",
    "workflow.step3.title": "决策并测试",
    "workflow.step3.desc": "审阅置信度、反证和替代方案，然后落地建议并安排下一次测试。",

    // Features
    "features.title": "SignalDig 能做什么",
    "features.subtitle": "三个专注的技能将可追溯的 SEO 与社交证据转化为清晰、可测试的内容决策。",
    "features.s1.title": "研究 SEO 需求信号",
    "features.s1.desc": "查找关键词、域名、市场和语言层面有据可依的 SEO 需求——Google Trends、关键词量与 SERP 数据。",
    "features.s2.title": "检索社交信号",
    "features.s2.desc": "校验平台参数，并抓取 X、Reddit、小红书、知乎、LinkedIn、微信公众号上可追溯的公开对话、创作者历史、账号内容与原生指标。",
    "features.s3.title": "决策内容机会",
    "features.s3.desc": "将完成的 SEO 与社交证据转化为推荐的内容方向——包含置信度、反证、替代方案与下一步测试。",
    "features.uc.title": "何时使用",
    "features.uc.1": "选对关键词——在动笔前确认哪个关键词或话题具有真实、可追溯的搜索需求。",
    "features.uc.2": "验证热门话题——当某个话题在社交平台发酵时，先核实证据再投入内容。",
    "features.uc.3": "规划内容路线——将研究证据转化为有优先级的、带下一步测试的内容方向。",
    "features.uc.4": "研究新市场或语言——衡量跨语言的关键词、域名与市场需求。",
    
    // Developer Install
    "install.dev.title": "开发者安装",
    "install.dev.subtitle": "克隆仓库并将技能文件夹复制到 Agent 的技能目录。每个技能包含自己的说明、Agent 元数据以及所需的引用或模板。",
    "install.step1": "步骤 1：克隆仓库",
    "install.step2": "步骤 2：选择您的 Agent 并复制技能文件夹",
    "install.step2.hint": "选择一个 Agent 平台以查看每个技能的确切命令。",
    "install.step3": "步骤 3：连接 MCP 服务器（名称可自定义）",
    "install.mcp.note": "<strong>注意：</strong>以下服务器名称（如 <code>daily-growth-signals</code>）是<em>参考名称</em>。您在配置 AI 客户端时可以自定义这些名称。实际服务端点保持不变。",
    "install.mcp.seo.title": "SEO 数据服务",
    "install.mcp.seo.desc": "Google Trends、关键词、SERP 数据",
    "install.mcp.social.title": "社交媒体服务",
    "install.mcp.social.desc": "X、Reddit、小红书、知乎、LinkedIn、微信公众号",
    "install.mcp.decision.title": "决策引擎",
    "install.mcp.decision.desc": "内容机会建议",
    "install.apikey.note": "从您的 SignalDig 工作空间控制台获取 API 密钥。",
    "install.apikey.cta": "前往官网获取 →",
    "install.mcp.clients.note": "<strong>提示：</strong>在每个 Agent 中各注册一次 SignalDig MCP 服务即可，连接参数固定。以下为常用客户端的配置示例：",
    
    // Non-Developer Install
    "install.nondev.title": "简易下载安装",
    "install.nondev.subtitle": "下载技能 zip 包 → 解压 → 把技能文件夹放进您的 AI 客户端。不需要任何编程或命令行经验，按下面每一步操作即可。",
    "install.nondev.step1": "第 1 步：下载技能包",
    "install.nondev.downloadBtn": "下载 seo-signal-skills.zip",
    "install.nondev.downloadHint": "包含全部 3 个技能文件夹，下载后即可使用",
    "install.nondev.step1.1": "点击上面的按钮，浏览器会打开一个 GitHub「Releases（发行版）」页面。",
    "install.nondev.step1.2": "在页面上找到最新版本（标记为 <strong>Latest</strong>），点击它下方的 <code>seo-signal-skills-*.zip</code> 文件开始下载。",
    "install.nondev.step1.3": "文件会保存到你的「下载」文件夹（浏览器左下角也会出现下载提示）。",
    "install.nondev.step2": "第 2 步：解压下载好的文件",
    "install.nondev.extract1": "打开你的「下载」文件夹，找到 <code>seo-signal-skills-*.zip</code> 文件。",
    "install.nondev.extract2": "Windows：右键点击该文件 → 选择「全部解压…」→ 点击「提取」。Mac：直接双击该文件即可自动解压。",
    "install.nondev.extract3": "解压后会生成一个同名文件夹（例如 <code>seo-signal-skills-1.2.0</code>），双击打开它。",
    "install.nondev.extract4": "你会看到 3 个技能文件夹：<code>research-seo-signals</code>、<code>research-social-signals</code> 和 <code>decide-content-opportunities</code>。",
    "install.nondev.step3": "第 3 步：把技能放进您的 AI 客户端",
    "install.nondev.step3.hint": "每个 AI 客户端（Claude Code、Codex、Cursor、Windsurf 等）都有自己专属的「技能文件夹」。放进这个文件夹的内容，AI 就能自动识别并使用。请把 3 个技能文件夹全部复制进去。",
    "install.nondev.findFolder.title": "找不到技能文件夹？按下面这样做：",
    "install.nondev.findFolder.1": "打开你的主文件夹。Mac：在访达（Finder）中按 <code>Cmd + Shift + H</code>。Windows：打开文件资源管理器，进入 <code>C:\\Users\\你的用户名</code>。",
    "install.nondev.findFolder.2": "技能文件夹是「隐藏文件夹」（名字以 . 开头），默认看不到。Mac：按 <code>Cmd + Shift + .</code> 显示隐藏文件；Windows：点击顶部「查看」，勾选「隐藏的项目」。",
    "install.nondev.findFolder.3": "找到以你的 AI 客户端命名的文件夹：<code>.claude</code>、<code>.codex</code>、<code>.cursor</code> 或 <code>.windsurf</code>。双击进入，再进入里面的 <code>skills</code> 子文件夹。",
    "install.nondev.findFolder.4": "如果里面没有 <code>skills</code> 文件夹：右键 → 「新建文件夹」，命名为 <code>skills</code>。",
    "install.nondev.guide1": "打开你解压出的文件夹（装着 3 个技能文件夹的那个）",
    "install.nondev.guide2": "选中全部 3 个技能文件夹（点第一个，按住 <code>Shift</code> 再点最后一个）",
    "install.nondev.guide3": "复制它们（Windows 按 <code>Ctrl + C</code>，Mac 按 <code>Cmd + C</code>）",
    "install.nondev.guide4": "打开你 AI 客户端的 <code>skills</code> 文件夹并粘贴（<code>Ctrl + V</code> / <code>Cmd + V</code>）",
    "install.nondev.step3.done": "<strong>完成！</strong>现在 skills 文件夹里应该能看到这 3 个文件夹。请完全退出并重新打开你的 AI 应用，让它识别新技能。",
    "install.nondev.step4": "第 4 步：连接数据服务（必需）",
    "install.nondev.step4.hint": "技能需要通过 SignalDig 的数据服务（MCP）获取真实数据。跳过这一步，AI 就拿不到真实数据，所以这一步不能省。",
    "install.nondev.mcpWhat": "MCP 就像 AI 与 SignalDig 数据服务之间的「桥梁」。下面是配置它的最简单方法：",
    "install.nondev.mcp1": "打开你解压出的任意一个技能文件夹（例如 <code>research-seo-signals</code>），用记事本（Windows）或文本编辑（Mac）打开其中的 <code>SKILL.md</code> 文件。",
    "install.nondev.mcp2": "把 <code>SKILL.md</code> 的全部内容复制，粘贴到你的 AI 对话框中，然后告诉它：「请帮我配置这个 MCP 连接」。",
    "install.nondev.mcp3": "AI 会指导你操作，或直接帮你配置好。如果它向你要 API Key，点击下面的按钮去官网获取（免费）。",
    "install.nondev.mcpKeyHint": "API Key 相当于你连接 SignalDig 服务的「数据通行证」。请妥善保管，不要粘贴到不可信的聊天中。",
    "install.nondev.viewDocs": "查看完整文档 →",
    
    // Common
    "install.backToSelection": "← 选择其他安装方式",
    
    // Footer
    "footer.tagline": "证据优先于观点。",
    "footer.site": "官方网站：signaldig.com"
  }
};

let currentLang = 'en';

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  
  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (I18N[lang] && I18N[lang][key]) {
      el.innerHTML = I18N[lang][key];
    }
  });
  
  // Update language switcher buttons
  document.querySelectorAll('.lang-switch button').forEach(btn => {
    btn.classList.toggle('lang-active', btn.dataset.lang === lang);
  });
}

// ── Skill data ──
const SKILLS = [
  {
    id: "research-seo-signals",
    name: { en: "SEO Signal Research", zh: "SEO 信号研究" },
    desc: { 
      en: "Research evidence-backed SEO demand signals for keywords, domains, markets, and languages via SignalDig MCP.",
      zh: "通过 SignalDig MCP 研究有据可依的 SEO 需求信号（关键词、域名、市场、语言）。"
    },
    files: [
      { name: "SKILL.md",           type: "file" },
      { name: "agents/",             type: "dir" },
      { name: "  openai.yaml",       type: "file" },
      { name: "references/",         type: "dir" },
      { name: "  mcp-contract.md",   type: "file" },
    ],
  },
  {
    id: "research-social-signals",
    name: { en: "Social Signal Retrieval", zh: "社交信号检索" },
    desc: { 
      en: "Validate platform inputs and retrieve traceable public conversations, creator histories, account content, and native metrics without making decisions.",
      zh: "校验平台参数并检索可追溯的公开对话、创作者历史、账号内容和原生指标，不提供分析决策。"
    },
    files: [
      { name: "SKILL.md",           type: "file" },
      { name: "agents/",             type: "dir" },
      { name: "  openai.yaml",       type: "file" },
      { name: "references/",         type: "dir" },
      { name: "  mcp-contract.md",   type: "file" },
      { name: "  parameter-guide.md", type: "file" },
    ],
  },
  {
    id: "decide-content-opportunities",
    name: { en: "Content Opportunity Decisions", zh: "内容机会决策" },
    desc: { 
      en: "Turn completed SEO and social evidence into a recommended content direction with confidence, counter-evidence, alternatives, and a next test.",
      zh: "将完成的 SEO 和社交证据转化为推荐的内容方向，包含置信度、反证、替代方案和下一步测试。"
    },
    files: [
      { name: "SKILL.md",                       type: "file" },
      { name: "agents/",                         type: "dir" },
      { name: "  openai.yaml",                   type: "file" },
      { name: "references/",                     type: "dir" },
      { name: "  evidence-evaluation.md",         type: "file" },
      { name: "  confidence-rubric.md",           type: "file" },
      { name: "assets/",                          type: "dir" },
      { name: "  content-decision-template.md",   type: "file" },
    ],
  },
];

// ── Platform config ──
const PLATFORMS = {
  claude: { label: "Claude Code", skillsDir: "~/.claude/skills" },
  codex:   { label: "Codex",       skillsDir: "~/.codex/skills" },
  cursor:  { label: "Cursor",      skillsDir: "~/.cursor/skills" },
  windsurf:{ label: "Windsurf",    skillsDir: "~/.windsurf/skills" },
};

const REPO_DIR = "seo-signal-skills";

// ── Build file tree HTML ──
function buildFileTreeHTML(files) {
  return files
    .map((f) => {
      const cls = f.type === "dir" ? "tree-dir" : "tree-file";
      return `<span class="${cls}">${f.name}</span>`;
    })
    .join("\n");
}

// ── Build copy command for a skill + platform ──
function buildCopyCmd(skillId, platform) {
  const dir = PLATFORMS[platform].skillsDir;
  // 复制而非软链接：先删除旧副本保证幂等，避免重复执行时目录嵌套
  return `mkdir -p ${dir} && rm -rf ${dir}/${skillId} && cp -r "$(pwd)/${REPO_DIR}/skills/${skillId}" ${dir}/`;
}

// ── Render all skill cards ──
function renderSkillCards(platform) {
  const container = document.getElementById("skill-cards");
  if (!container) return;

  container.innerHTML = SKILLS.map((skill) => {
    const cmd = buildCopyCmd(skill.id, platform);
    const fileTreeHTML = buildFileTreeHTML(skill.files);
    const name = skill.name[currentLang] || skill.name.en;
    const desc = skill.desc[currentLang] || skill.desc.en;
    return `
      <div class="skill-card">
        <div class="skill-card-header">
          <h4>${name}</h4>
          <span class="skill-badge">${skill.id}</span>
        </div>
        <p class="skill-card-desc">${desc}</p>
        <div class="file-tree"><pre><code>${fileTreeHTML}</code></pre></div>
        <div class="skill-cmd">
          <span class="skill-cmd-label">Copy into ${PLATFORMS[platform].label}</span>
          <div class="code-row">
            <pre><code>${cmd}</code></pre>
            <button type="button" data-copy="${cmd.replace(/"/g, '&quot;')}">Copy</button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  bindCopyButtons();
}

// ── Copy button handler ──
function bindCopyButtons() {
  document.querySelectorAll("[data-copy]").forEach((button) => {
    if (button.dataset.bound) return;
    button.dataset.bound = "1";

    button.addEventListener("click", async () => {
      const value = button.dataset.copy;
      if (!value) return;

      await navigator.clipboard.writeText(value);
      const original = button.textContent;
      button.textContent = currentLang === 'zh' ? '已复制' : "Copied";
      window.setTimeout(() => {
        button.textContent = original;
      }, 1400);
    });
  });
}

// ── Platform tab switching ──
function initTabs() {
  const tabs = document.querySelectorAll(".platform-tabs button");
  const defaultPlatform = "claude";

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const platform = tab.dataset.platform;
      if (!platform) return;

      tabs.forEach((t) => t.setAttribute("aria-selected", "false"));
      tab.setAttribute("aria-selected", "true");

      renderSkillCards(platform);
    });
  });

  renderSkillCards(defaultPlatform);
}

// ── Language switching ──
function initLanguageSwitch() {
  const langBtns = document.querySelectorAll('.lang-switch button');
  
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang && lang !== currentLang) {
        setLanguage(lang);
        // Re-render skill cards with new language
        const activeTab = document.querySelector('.platform-tabs button[aria-selected="true"]');
        if (activeTab) {
          renderSkillCards(activeTab.dataset.platform);
        }
      }
    });
  });
}

// ── User type selection ──
function initUserTypeSelection() {
  const selectBtns = document.querySelectorAll('.select-user-btn');
  const devSection = document.querySelector('.install-dev-section');
  const nondevSection = document.querySelector('.install-nondev-section');
  const userTypeSection = document.querySelector('.user-type-section');
  const backBtn = document.getElementById('back-to-selection');
  const backContainer = document.querySelector('.back-to-selection');

  selectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const userType = btn.dataset.select;
      
      // Hide user type selection
      if (userTypeSection) {
        userTypeSection.style.display = 'none';
      }
      
      // Show appropriate install section
      if (userType === 'developer') {
        devSection.style.display = 'block';
        nondevSection.style.display = 'none';
      } else {
        devSection.style.display = 'none';
        nondevSection.style.display = 'block';
      }
      
      // Show back button
      backContainer.style.display = 'block';
      
      // Scroll to install section
      if (devSection.style.display === 'block') {
        devSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        nondevSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Back to selection
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      devSection.style.display = 'none';
      nondevSection.style.display = 'none';
      backContainer.style.display = 'none';
      
      if (userTypeSection) {
        userTypeSection.style.display = 'block';
        userTypeSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

// ── Boot ──
initTabs();
initLanguageSwitch();
initUserTypeSelection();
bindCopyButtons();
