// ── Internationalization (i18n) ──
const I18N = {
  en: {
    // Navigation
    "nav.install": "Install",
    "nav.workflow": "Workflow",
    
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
    "workflow.step1.title": "Submit research",
    "workflow.step2.title": "Poll the result",
    "workflow.step3.title": "Decide and test",
    
    // Developer Install
    "install.dev.title": "Developer Installation",
    "install.dev.subtitle": "Clone the repo and create symbolic links to your agent's skills directory. Each skill includes its own instructions, agent metadata, and only the references or templates it needs.",
    "install.step1": "Step 1: Clone the repository",
    "install.step2": "Step 2: Choose your agent & create symlinks",
    "install.step2.hint": "Select an agent platform to see the exact commands for each skill.",
    "install.step3": "Step 3: Connect MCP servers (optional naming)",
    "install.mcp.note": "<strong>Note:</strong> The server names below (e.g., <code>daily-growth-signals</code>) are <em>reference names</em>. You can customize them when configuring your AI client. The actual service endpoints remain the same.",
    "install.mcp.seo.title": "SEO Data Service",
    "install.mcp.seo.desc": "Google Trends, Keywords, SERP data",
    "install.mcp.social.title": "Social Media Service",
    "install.mcp.social.desc": "X, Reddit, Xiaohongshu, Zhihu",
    "install.mcp.decision.title": "Decision Engine",
    "install.mcp.decision.desc": "Content opportunity recommendations",
    "install.apikey.note": "Get your API key from your Daily Growth Signals workspace dashboard.",
    
    // Non-Developer Install
    "install.nondev.title": "Simple Download Installation",
    "install.nondev.subtitle": "Download the pre-packaged skills zip file and extract it to your agent's skills directory. No Git or command line experience required.",
    "install.nondev.step1": "Step 1: Download the latest release",
    "install.nondev.downloadBtn": "Download seo-signal-skills.zip",
    "install.nondev.downloadHint": "Contains all three skill folders ready to use",
    "install.nondev.step2": "Step 2: Extract the zip file",
    "install.nondev.extract1": "Locate the downloaded <code>seo-signal-skills-*.zip</code> file",
    "install.nondev.extract2": "Right-click and choose \"Extract All\" (Windows) or double-click (Mac)",
    "install.nondev.extract3": "You'll see three folders: <code>research-seo-signals</code>, <code>research-social-signals</code>, <code>decide-content-opportunities</code>",
    "install.nondev.step3": "Step 3: Copy folders to your agent",
    "install.nondev.step3.hint": "Find your agent's skills folder and copy all three skill folders there:",
    "install.nondev.guide1": "Open the extracted folder",
    "install.nondev.guide2": "Select all three skill folders",
    "install.nondev.guide3": "Copy/Cut them",
    "install.nondev.guide4": "Paste into your agent's skills folder",
    "install.nondev.step4": "Step 4: Configure MCP (optional)",
    "install.nondev.step4.hint": "If you want to use the full features, you need to connect to our MCP services. Ask your AI agent to help you configure this, or follow your client's documentation.",
    "install.nondev.mcpSimple": "The MCP server URLs are provided in the included SKILL.md files in each skill folder.",
    "install.nondev.viewDocs": "View Full Documentation →",
    
    // Common
    "install.backToSelection": "← Choose a different installation method",
    
    // Footer
    "footer.tagline": "Evidence before opinion."
  },
  zh: {
    // Navigation
    "nav.install": "安装",
    "nav.workflow": "工作流程",
    
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
    "workflow.step1.title": "提交研究请求",
    "workflow.step2.title": "获取研究结果",
    "workflow.step3.title": "决策并测试",
    
    // Developer Install
    "install.dev.title": "开发者安装",
    "install.dev.subtitle": "克隆仓库并创建符号链接到 Agent 的技能目录。每个技能包含自己的说明、Agent 元数据以及所需的引用或模板。",
    "install.step1": "步骤 1：克隆仓库",
    "install.step2": "步骤 2：选择您的 Agent 并创建符号链接",
    "install.step2.hint": "选择一个 Agent 平台以查看每个技能的确切命令。",
    "install.step3": "步骤 3：连接 MCP 服务器（名称可自定义）",
    "install.mcp.note": "<strong>注意：</strong>以下服务器名称（如 <code>daily-growth-signals</code>）是<em>参考名称</em>。您在配置 AI 客户端时可以自定义这些名称。实际服务端点保持不变。",
    "install.mcp.seo.title": "SEO 数据服务",
    "install.mcp.seo.desc": "Google Trends、关键词、SERP 数据",
    "install.mcp.social.title": "社交媒体服务",
    "install.mcp.social.desc": "X、Reddit、小红书、知乎",
    "install.mcp.decision.title": "决策引擎",
    "install.mcp.decision.desc": "内容机会建议",
    "install.apikey.note": "从您的 Daily Growth Signals 工作空间控制台获取 API 密钥。",
    
    // Non-Developer Install
    "install.nondev.title": "简易下载安装",
    "install.nondev.subtitle": "下载预打包的技能 zip 文件并将其解压到 Agent 的技能目录。无需 Git 或命令行经验。",
    "install.nondev.step1": "步骤 1：下载最新版本",
    "install.nondev.downloadBtn": "下载 seo-signal-skills.zip",
    "install.nondev.downloadHint": "包含所有三个可立即使用的技能文件夹",
    "install.nondev.step2": "步骤 2：解压 zip 文件",
    "install.nondev.extract1": "找到下载的 <code>seo-signal-skills-*.zip</code> 文件",
    "install.nondev.extract2": "右键选择「全部解压」（Windows）或双击（Mac）",
    "install.nondev.extract3": "您将看到三个文件夹：<code>research-seo-signals</code>、<code>research-social-signals</code>、<code>decide-content-opportunities</code>",
    "install.nondev.step3": "步骤 3：复制文件夹到您的 Agent",
    "install.nondev.step3.hint": "找到您 Agent 的技能文件夹，并将所有三个技能文件夹复制到那里：",
    "install.nondev.guide1": "打开解压后的文件夹",
    "install.nondev.guide2": "选中所有三个技能文件夹",
    "install.nondev.guide3": "复制/剪切它们",
    "install.nondev.guide4": "粘贴到您 Agent 的技能文件夹中",
    "install.nondev.step4": "步骤 4：配置 MCP（可选）",
    "install.nondev.step4.hint": "如需使用完整功能，需要连接我们的 MCP 服务。请让您的 AI Agent 帮助您配置，或参考客户端文档。",
    "install.nondev.mcpSimple": "MCP 服务器 URL 已包含在每个技能文件夹的 SKILL.md 文件中。",
    "install.nondev.viewDocs": "查看完整文档 →",
    
    // Common
    "install.backToSelection": "← 选择其他安装方式",
    
    // Footer
    "footer.tagline": "证据优先于观点。"
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
      en: "Research evidence-backed SEO demand signals for keywords, domains, markets, and languages via Daily Growth Signals MCP.",
      zh: "通过 Daily Growth Signals MCP 研究有据可依的 SEO 需求信号（关键词、域名、市场、语言）。"
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
    name: { en: "Social Signal Research", zh: "社交信号研究" },
    desc: { 
      en: "Research traceable public social-media conversations for brand mentions, pain points, and audience language.",
      zh: "研究可追溯的公开社交媒体对话（品牌提及、痛点、用户语言）。"
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
  return `mkdir -p ${dir} && ln -s "$(pwd)/${REPO_DIR}/skills/${skillId}" ${dir}/`;
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
