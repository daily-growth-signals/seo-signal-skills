/**
 * Blog chrome: shared lang preference + index UI + post alternate navigation.
 */
(function () {
  var LP = window.LangPref;
  if (!LP) return;

  var INDEX_I18N = {
    en: {
      "footer.tagline": "Evidence before opinion.",
      "footer.site": "Official site: signaldig.com",
      "index.kicker": "Guides",
      "index.title": "Practical guides for SEO & social research",
      "index.lede":
        "Short, problem-first how-tos for marketers and operators using SignalDig tools—keyword checks, visibility, backlinks, and public social research.",
      "index.empty.title": "Guides are on the way",
      "index.empty.body":
        "We are publishing practical how-tos for SignalDig SEO, AI-search, and social tools. Check back soon, or install the Growth Research Skill to start researching today.",
      "index.empty.cta": "Install the Skill",
      "index.enHeading": "English guides",
      "index.zhHeading": "Chinese guides",
      "index.enEmptyTitle": "No English guides yet",
      "index.zhEmptyTitle": "No Chinese guides yet",
      "index.enEmpty": "No English guides yet—new ones land here first.",
      "index.zhEmpty": "No Chinese guides yet—switch language or check back soon.",
      "crumb.home": "Home",
      "crumb.blog": "Blog",
    },
    zh: {
      "footer.tagline": "证据优先于观点。",
      "footer.site": "官方网站：signaldig.com",
      "index.kicker": "实用指南",
      "index.title": "面向运营的 SEO 与社媒研究指南",
      "index.lede":
        "写给市场与运营同学的短篇实操：用 SignalDig 做关键词、可见度、外链与公开社媒研究，每篇都指向具体工具页。",
      "index.empty.title": "指南即将上线",
      "index.empty.body":
        "我们正在整理 SignalDig SEO、AI 搜索与社媒工具的实操指南。先安装 Growth Research Skill，也可以马上开始研究。",
      "index.empty.cta": "安装 Skill",
      "index.enHeading": "English guides",
      "index.zhHeading": "中文指南",
      "index.enEmptyTitle": "暂无英文指南",
      "index.zhEmptyTitle": "暂无中文指南",
      "index.enEmpty": "暂无英文指南，稍后会在这里更新。",
      "index.zhEmpty": "暂无中文指南，稍后会在这里更新。",
      "crumb.home": "首页",
      "crumb.blog": "指南",
    },
  };

  function pageConfig() {
    var el = document.getElementById("blog-page-config");
    if (!el) return { kind: "index", lang: "en", altEn: "", altZh: "" };
    try {
      return JSON.parse(el.textContent);
    } catch (_) {
      return { kind: "index", lang: "en", altEn: "", altZh: "" };
    }
  }

  function applyIndexCopy(lang) {
    var dict = INDEX_I18N[lang] || INDEX_I18N.en;
    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      var key = node.getAttribute("data-i18n");
      if (key && dict[key]) node.innerHTML = dict[key];
    });
  }

  function markActiveLang(lang) {
    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.classList.toggle("lang-active", btn.getAttribute("data-lang") === lang);
    });
  }

  /** Show only the preferred language section; hide the other. */
  function filterIndexByLang(lang) {
    var en = document.getElementById("guides-en");
    var zh = document.getElementById("guides-zh");
    var showEn = lang === "en";
    var showZh = lang === "zh";

    if (en) {
      en.hidden = !showEn;
      en.setAttribute("aria-hidden", showEn ? "false" : "true");
    }
    if (zh) {
      // Keep lang-anchor stub hidden when it is not a real section
      if (zh.classList.contains("blog-lang-anchor")) {
        zh.hidden = true;
        zh.setAttribute("aria-hidden", "true");
      } else {
        zh.hidden = !showZh;
        zh.setAttribute("aria-hidden", showZh ? "false" : "true");
      }
    }
  }

  function syncIndexHash(lang) {
    var hash = lang === "zh" ? "guides-zh" : "guides-en";
    if (!location.hash || location.hash === "#guides-en" || location.hash === "#guides-zh") {
      history.replaceState(null, "", "#" + hash);
    }
  }

  function navigateForLang(lang, config) {
    LP.setStoredLang(lang);
    markActiveLang(lang);

    if (config.kind === "post") {
      var alt = lang === "zh" ? config.altZh : config.altEn;
      if (alt) {
        location.href = alt;
        return;
      }
      location.href = LP.blogIndexUrl(lang);
      return;
    }

    // Blog index: stay on page, update chrome + filter list
    document.documentElement.lang = lang;
    applyIndexCopy(lang);
    filterIndexByLang(lang);
    syncIndexHash(lang);
  }

  function initLangSwitch(config) {
    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var lang = LP.normalize(btn.getAttribute("data-lang"));
        if (!lang) return;
        var current =
          config.kind === "post"
            ? LP.normalize(config.lang) || "en"
            : LP.getPreferredLang(config.lang || "en");
        if (lang === current && config.kind === "index") {
          filterIndexByLang(lang);
          syncIndexHash(lang);
          return;
        }
        if (lang === current && config.kind === "post") return;
        navigateForLang(lang, config);
      });
    });
  }

  function prefersReducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function slugifyHeading(text) {
    var raw = String(text || "").trim().toLowerCase();
    try {
      raw = raw.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
    } catch (_) {}
    var slug = raw
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .replace(/[\s_]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    return slug || "section";
  }

  function ensureHeadingIds(headings) {
    var used = Object.create(null);
    headings.forEach(function (el) {
      var id = el.id;
      if (!id) {
        id = slugifyHeading(el.textContent);
        var base = id;
        var n = 2;
        while (used[id] || document.getElementById(id)) {
          id = base + "-" + n;
          n += 1;
        }
        el.id = id;
      }
      used[id] = true;
    });
  }

  function collectPostHeadings() {
    var prose = document.getElementById("blog-prose");
    if (!prose) return [];
    var headings = Array.prototype.slice.call(
      prose.querySelectorAll("h2, h3")
    );
    ensureHeadingIds(headings);
    return headings;
  }

  function buildTocLists(headings) {
    var lists = document.querySelectorAll("[data-blog-toc-list]");
    lists.forEach(function (list) {
      list.innerHTML = "";
      headings.forEach(function (heading) {
        var li = document.createElement("li");
        li.className =
          "blog-toc-item blog-toc-item--" + heading.tagName.toLowerCase();
        var a = document.createElement("a");
        a.href = "#" + heading.id;
        a.textContent = heading.textContent.trim();
        a.setAttribute("data-toc-target", heading.id);
        li.appendChild(a);
        list.appendChild(li);
      });
    });
  }

  function setActiveToc(id) {
    document.querySelectorAll("[data-toc-target]").forEach(function (link) {
      var active = link.getAttribute("data-toc-target") === id;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  function initScrollSpy(headings) {
    if (!headings.length || !("IntersectionObserver" in window)) return;

    var visible = Object.create(null);
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) visible[entry.target.id] = true;
          else delete visible[entry.target.id];
        });
        var activeId = null;
        for (var i = 0; i < headings.length; i++) {
          if (visible[headings[i].id]) {
            activeId = headings[i].id;
            break;
          }
        }
        if (!activeId) {
          // Fallback: last heading above mid-viewport
          var mid = window.scrollY + 120;
          for (var j = 0; j < headings.length; j++) {
            if (headings[j].offsetTop <= mid) activeId = headings[j].id;
          }
        }
        if (activeId) setActiveToc(activeId);
      },
      {
        rootMargin: "-96px 0px -55% 0px",
        threshold: [0, 1],
      }
    );

    headings.forEach(function (h) {
      observer.observe(h);
    });
  }

  function closeTocSheet() {
    var sheet = document.querySelector("[data-blog-toc-sheet]");
    var openBtn = document.querySelector("[data-blog-toc-open]");
    if (!sheet) return;
    sheet.hidden = true;
    document.body.classList.remove("blog-toc-sheet-open");
    if (openBtn) openBtn.setAttribute("aria-expanded", "false");
  }

  function openTocSheet() {
    var sheet = document.querySelector("[data-blog-toc-sheet]");
    var openBtn = document.querySelector("[data-blog-toc-open]");
    if (!sheet) return;
    sheet.hidden = false;
    document.body.classList.add("blog-toc-sheet-open");
    if (openBtn) openBtn.setAttribute("aria-expanded", "true");
  }

  function initMobileToc() {
    var openBtn = document.querySelector("[data-blog-toc-open]");
    if (!openBtn) return;

    openBtn.addEventListener("click", function () {
      var sheet = document.querySelector("[data-blog-toc-sheet]");
      if (!sheet || sheet.hidden) openTocSheet();
      else closeTocSheet();
    });

    document.querySelectorAll("[data-blog-toc-close]").forEach(function (el) {
      el.addEventListener("click", closeTocSheet);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeTocSheet();
    });

    document.querySelectorAll("[data-blog-toc-list] a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeTocSheet();
      });
    });
  }

  function scrollToTop() {
    if (prefersReducedMotion()) {
      window.scrollTo(0, 0);
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function initBackToTop() {
    var btn = document.querySelector("[data-blog-back-top]");
    if (!btn) return;

    var threshold = 480;
    function sync() {
      var show = window.scrollY > threshold;
      btn.classList.toggle("is-visible", show);
      btn.setAttribute("aria-hidden", show ? "false" : "true");
      btn.tabIndex = show ? 0 : -1;
    }

    btn.addEventListener("click", function () {
      scrollToTop();
    });

    window.addEventListener("scroll", sync, { passive: true });
    sync();
  }

  function initPostReadingUx() {
    var headings = collectPostHeadings();
    var rail = document.querySelector("[data-blog-toc]");
    var mobile = document.querySelector("[data-blog-toc-mobile]");

    if (headings.length) {
      buildTocLists(headings);
      if (rail) rail.hidden = false;
      if (mobile) mobile.hidden = false;
      initScrollSpy(headings);
      initMobileToc();
    }

    initBackToTop();
  }

  function boot() {
    var config = pageConfig();
    var preferred = LP.getPreferredLang(config.lang || "en");

    if (config.kind === "post") {
      // Persist the language of the article the user is reading
      LP.setStoredLang(config.lang || preferred);
      markActiveLang(config.lang || preferred);
      initLangSwitch(config);
      initPostReadingUx();
      return;
    }

    // Index: hash can override stored preference on first paint
    if (location.hash === "#guides-en" || location.hash === "#guides-zh") {
      preferred = location.hash === "#guides-zh" ? "zh" : "en";
    }

    LP.setStoredLang(preferred);
    document.documentElement.lang = preferred;
    applyIndexCopy(preferred);
    markActiveLang(preferred);
    filterIndexByLang(preferred);
    syncIndexHash(preferred);
    initLangSwitch(config);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
