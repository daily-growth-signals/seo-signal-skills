/**
 * Shared language preference for landing + blog (GitHub Pages / static).
 * Key: seo-signal-skills-lang → "en" | "zh"
 */
(function (global) {
  var KEY = "seo-signal-skills-lang";
  var SUPPORTED = { en: true, zh: true };

  function normalize(lang) {
    if (!lang) return null;
    var base = String(lang).toLowerCase().split("-")[0];
    return SUPPORTED[base] ? base : null;
  }

  function getStoredLang() {
    try {
      return normalize(global.localStorage.getItem(KEY));
    } catch (_) {
      return null;
    }
  }

  function setStoredLang(lang) {
    var next = normalize(lang);
    if (!next) return null;
    try {
      global.localStorage.setItem(KEY, next);
    } catch (_) {}
    return next;
  }

  function getPreferredLang(fallback) {
    return getStoredLang() || normalize(fallback) || "en";
  }

  function pathPrefix() {
    var path = (global.location && global.location.pathname) || "";
    var match = path.match(/^(\/seo-signal-skills)(?=\/|$)/);
    return match ? match[1] : "";
  }

  function withPrefix(pathname) {
    var prefix = pathPrefix();
    var normalized = pathname.charAt(0) === "/" ? pathname : "/" + pathname;
    return prefix + normalized;
  }

  function blogIndexUrl(lang) {
    var hash = normalize(lang) === "zh" ? "guides-zh" : "guides-en";
    return withPrefix("/blog/") + "#" + hash;
  }

  function homeUrl() {
    return withPrefix("/");
  }

  global.LangPref = {
    KEY: KEY,
    normalize: normalize,
    getStoredLang: getStoredLang,
    setStoredLang: setStoredLang,
    getPreferredLang: getPreferredLang,
    pathPrefix: pathPrefix,
    withPrefix: withPrefix,
    blogIndexUrl: blogIndexUrl,
    homeUrl: homeUrl,
  };
})(typeof window !== "undefined" ? window : globalThis);
