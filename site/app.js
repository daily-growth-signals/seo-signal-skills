// ── Skill data ──
// Add new skills here — the UI renders them automatically
const SKILLS = [
  {
    id: "research-seo-signals",
    name: "SEO Signal Research",
    desc: "Research evidence-backed SEO demand signals for keywords, domains, markets, and languages via Daily Growth Signals MCP.",
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
    name: "Social Signal Research",
    desc: "Research traceable public social-media conversations for brand mentions, pain points, and audience language.",
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
  claude: {
    label: "Claude Code",
    skillsDir: "~/.claude/skills",
  },
  codex: {
    label: "Codex",
    skillsDir: "~/.codex/skills",
  },
  cursor: {
    label: "Cursor",
    skillsDir: "~/.cursor/skills",
  },
  windsurf: {
    label: "Windsurf",
    skillsDir: "~/.windsurf/skills",
  },
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
  return `mkdir -p ${dir} && cp -R ${REPO_DIR}/skills/${skillId} ${dir}/`;
}

// ── Render all skill cards ──
function renderSkillCards(platform) {
  const container = document.getElementById("skill-cards");
  if (!container) return;

  container.innerHTML = SKILLS.map((skill) => {
    const cmd = buildCopyCmd(skill.id, platform);
    const fileTreeHTML = buildFileTreeHTML(skill.files);
    return `
      <div class="skill-card">
        <div class="skill-card-header">
          <h4>${skill.name}</h4>
          <span class="skill-badge">${skill.id}</span>
        </div>
        <p class="skill-card-desc">${skill.desc}</p>
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

  // Re-bind copy buttons for the newly rendered cards
  bindCopyButtons();
}

// ── Copy button handler ──
function bindCopyButtons() {
  document.querySelectorAll("[data-copy]").forEach((button) => {
    // Avoid double-binding
    if (button.dataset.bound) return;
    button.dataset.bound = "1";

    button.addEventListener("click", async () => {
      const value = button.dataset.copy;
      if (!value) return;

      await navigator.clipboard.writeText(value);
      const original = button.textContent;
      button.textContent = "Copied";
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

      // Update aria-selected
      tabs.forEach((t) => t.setAttribute("aria-selected", "false"));
      tab.setAttribute("aria-selected", "true");

      // Re-render skill cards
      renderSkillCards(platform);
    });
  });

  // Initial render
  renderSkillCards(defaultPlatform);
}

// ── Boot ──
initTabs();
