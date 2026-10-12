// ── Internationalization (i18n) ──
const I18N = {
  en: {
    // Navigation
    "nav.install": "Install",
    "nav.workflow": "Workflow",
    "nav.site": "Official Site",
    
    // Hero
    "hero.title": "Social and SEO research<br />from one Agent Skill",
    "hero.subtitle": "Research public conversations, keywords, SERPs, trends, competitors, GEO visibility, backlinks, rankings, and traffic through one SignalDig MCP connection.",
    "hero.btnInstall": "Install the Skill",
    "hero.btnDownload": "Latest release",
    
    // User Type Selection
    "userType.title": "Choose Your Installation Method",
    "userType.subtitle": "Select your user type to get the right installation guide for you.",
    "userType.dev.title": "Developer / 开发者",
    "userType.nondev.title": "Non-Developer / 非开发者",
    "userType.dev.desc": "Clone the repository and copy the Skill from a terminal.",
    "userType.dev.feature1": "Current repository version",
    "userType.dev.feature2": "Update with <code>git pull</code>",
    "userType.dev.feature3": "Inspect the complete source",
    "userType.nondev.desc": "Download the packaged Skill from GitHub Releases. Git is not required.",
    "userType.nondev.feature1": "Versioned release archive",
    "userType.nondev.feature2": "Download, unzip, and copy",
    "userType.nondev.feature3": "No terminal commands",
    "userType.btnSelect": "Select This Method",
    
    // Workflow
    "workflow.title": "How a research request runs",
    "workflow.subtitle": "The same tool submits the request and reads the result. A single analysis ID keeps the run traceable.",
    "workflow.step1.title": "Submit research",
    "workflow.step1.desc": "The Skill selects Social or SEO, sends the smallest useful scope, and stores the returned analysis ID.",
    "workflow.step2.title": "Poll the result",
    "workflow.step2.desc": "It checks that same analysis ID until the run completes. Slow work is not submitted twice.",
    "workflow.step3.title": "Read the evidence",
    "workflow.step3.desc": "The answer includes the actual coverage, source links, gaps, and analysis ID. Missing data stays unknown rather than becoming a guessed value.",

    // Features
    "features.title": "What you can research",
    "features.subtitle": "The Skill chooses one of two public research tools and keeps the request within the scope you asked for.",
    "features.s1.title": "Public social research",
    "features.s1.desc": "Find public topic discussions on X, Reddit, Xiaohongshu, Zhihu, and Threads. Retrieve supported public posts and profiles without widening the requested platform or topic.",
    "features.s2.title": "SEO research",
    "features.s2.desc": "Check keyword demand, related queries, SERPs, trends, competitors, GEO visibility, backlinks, ranked keywords, and traffic evidence.",
    "features.uc.title": "When to use it",
    "features.uc.1": "Compare keyword demand before choosing a page topic.",
    "features.uc.2": "Check whether a social trend has enough public evidence to investigate.",
    "features.uc.3": "Review a domain's competitors, backlinks, rankings, traffic, or GEO visibility.",
    "features.uc.4": "Research a market or language with the requested country, language, and platform boundaries intact.",
    
    // Developer Install
    "install.dev.title": "Developer Installation",
    "install.dev.subtitle": "Clone the repository and copy <code>research-growth-signals</code> into your agent's skills directory. The repository contains one maintained Skill and one SignalDig MCP connection.",
    "install.step1": "Step 1: Clone the repository",
    "install.step2": "Step 2: Choose your agent and copy the Skill",
    "install.step2.hint": "Select a client to get the correct destination folder.",
    "install.step3": "Step 3: Connect SignalDig MCP",
    "install.mcp.note": "<strong>Note:</strong> The alias <code>signaldig</code> is configurable. Every client connects to the same endpoint.",
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
    "install.nondev.step3.hint": "Every AI client has its own <strong>skills folder</strong>. Copy <code>research-growth-signals</code> there.",
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
    "hero.title": "一个 Agent Skill<br />完成 Social 与 SEO 研究",
    "hero.subtitle": "通过一个 SignalDig MCP 连接，查询公开社媒讨论、关键词、SERP、趋势、竞品、GEO 可见度、外链、排名与流量证据。",
    "hero.btnInstall": "安装 Skill",
    "hero.btnDownload": "最新版本",
    
    // User Type Selection
    "userType.title": "选择您的安装方式",
    "userType.subtitle": "选择您的用户类型，获取适合您的安装指南。",
    "userType.dev.title": "开发者 / Developer",
    "userType.nondev.title": "非开发者 / Non-Developer",
    "userType.dev.desc": "通过终端克隆仓库并复制 Skill。",
    "userType.dev.feature1": "使用仓库当前版本",
    "userType.dev.feature2": "通过 <code>git pull</code> 更新",
    "userType.dev.feature3": "可查看完整源码",
    "userType.nondev.desc": "从 GitHub Releases 下载打包好的 Skill，不需要安装 Git。",
    "userType.nondev.feature1": "带版本号的发布包",
    "userType.nondev.feature2": "下载、解压、复制即可",
    "userType.nondev.feature3": "无需终端命令",
    "userType.btnSelect": "选择此方式",
    
    // Workflow
    "workflow.title": "一次研究请求如何运行",
    "workflow.subtitle": "同一个工具负责提交请求和读取结果，全程沿用同一个 analysis ID。",
    "workflow.step1.title": "提交研究请求",
    "workflow.step1.desc": "Skill 判断该用 Social 还是 SEO，只提交完成任务所需的最小范围，并保存返回的 analysis ID。",
    "workflow.step2.title": "获取研究结果",
    "workflow.step2.desc": "它使用同一个 analysis ID 查询进度，任务耗时较长时也不会重复提交。",
    "workflow.step3.title": "查看证据",
    "workflow.step3.desc": "结果会说明实际覆盖范围、来源链接、缺口与 analysis ID；缺失数据保持未知，不用猜测值补齐。",

    // Features
    "features.title": "可以研究什么",
    "features.subtitle": "Skill 会从两个公开研究工具中选择一个，并严格遵守你提出的研究范围。",
    "features.s1.title": "公开社媒研究",
    "features.s1.desc": "查找 X、Reddit、小红书、知乎和 Threads 上的公开话题讨论，也可读取受支持的公开帖子与账号资料，不擅自扩大平台或话题范围。",
    "features.s2.title": "SEO 研究",
    "features.s2.desc": "查询关键词需求、相关搜索、SERP、趋势、竞品、GEO 可见度、外链、排名关键词和流量证据。",
    "features.uc.title": "何时使用",
    "features.uc.1": "写页面前比较关键词需求。",
    "features.uc.2": "判断一个社媒话题是否有足够的公开证据值得继续研究。",
    "features.uc.3": "查看域名的竞品、外链、排名、流量或 GEO 可见度。",
    "features.uc.4": "按指定国家、语言和平台边界研究新市场。",
    
    // Developer Install
    "install.dev.title": "开发者安装",
    "install.dev.subtitle": "克隆仓库后，将 <code>research-growth-signals</code> 复制到 Agent 的 skills 目录。仓库只维护这一个 Skill 和一个 SignalDig MCP 连接。",
    "install.step1": "步骤 1：克隆仓库",
    "install.step2": "步骤 2：选择 Agent 并复制 Skill",
    "install.step2.hint": "选择客户端，查看对应的目标目录。",
    "install.step3": "步骤 3：连接 MCP 服务器（名称可自定义）",
    "install.mcp.note": "<strong>注意：</strong><code>signaldig</code> 只是可自定义的别名；所有客户端连接同一个服务地址。",
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
    "install.nondev.step3.hint": "每个 AI 客户端都有自己的 skills 文件夹。请把 <code>research-growth-signals</code> 复制进去。",
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
    id: "research-growth-signals",
    name: { en: "SignalDig Growth Research", zh: "SignalDig 增长研究" },
    desc: { 
      en: "Route natural-language questions to bounded Social or SEO research through one SignalDig MCP connection.",
      zh: "通过一个 SignalDig MCP 连接，把自然语言问题路由到有边界的 Social 或 SEO 研究。"
    },
    files: [
      { name: "SKILL.md",           type: "file" },
      { name: "agents/",             type: "dir" },
      { name: "  openai.yaml",       type: "file" },
      { name: "references/",         type: "dir" },
      { name: "  mcp-contract.md",   type: "file" },
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
