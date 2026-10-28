/** Absolute http(s) URLs are off-site; relative / hash / mailto stay same-tab. */
function isExternalHref(href) {
  if (!href) return false;
  return /^(https?:)?\/\//i.test(String(href).trim());
}

/** Stable heading ids for TOC / in-page anchors (CJK + ASCII). */
function slugifyHeading(text) {
  const raw = String(text || "")
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");
  let slug = raw
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || "section";
}

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
module.exports = function (eleventyConfig) {
  // Landing page + static assets from site/ (generated sitemap.xml wins over passthrough)
  eleventyConfig.addPassthroughCopy({ site: "/" });

  // Markdown body: off-site links + heading ids for TOC anchors
  eleventyConfig.amendLibrary("md", (md) => {
    const defaultLinkOpen =
      md.renderer.rules.link_open ||
      function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
      };

    md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
      const token = tokens[idx];
      const href = token.attrGet("href");
      if (isExternalHref(href)) {
        token.attrSet("target", "_blank");
        token.attrSet("rel", "noopener noreferrer");
      }
      return defaultLinkOpen(tokens, idx, options, env, self);
    };

    const defaultHeadingOpen =
      md.renderer.rules.heading_open ||
      function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
      };

    md.renderer.rules.heading_open = function (tokens, idx, options, env, self) {
      const token = tokens[idx];
      if (!token.attrGet("id")) {
        const inline = tokens[idx + 1];
        const text =
          inline && inline.type === "inline" && inline.children
            ? inline.children
                .filter((t) => t.type === "text" || t.type === "code_inline")
                .map((t) => t.content)
                .join("")
            : "";
        const used = (env._headingIds = env._headingIds || Object.create(null));
        let id = slugifyHeading(text);
        if (used[id]) {
          let n = 2;
          while (used[`${id}-${n}`]) n += 1;
          id = `${id}-${n}`;
        }
        used[id] = true;
        token.attrSet("id", id);
      }
      return defaultHeadingOpen(tokens, idx, options, env, self);
    };
  });

  eleventyConfig.addFilter("absoluteUrl", (path, site) => {
    const base = String(site.baseUrl || "").replace(/\/$/, "");
    if (!path) return `${base}/`;
    if (/^https?:\/\//i.test(path)) return path;
    const normalized = path.startsWith("/") ? path : `/${path}`;
    return `${base}${normalized}`;
  });

  eleventyConfig.addFilter("toolById", (tools, id) => {
    if (!Array.isArray(tools) || !id) return null;
    return tools.find((tool) => tool.id === id) || null;
  });

  eleventyConfig.addFilter("postsByLang", (posts, lang) => {
    if (!Array.isArray(posts)) return [];
    return posts
      .filter((post) => post.data && post.data.lang === lang)
      .sort((a, b) => {
        const da = a.date ? new Date(a.date).getTime() : 0;
        const db = b.date ? new Date(b.date).getTime() : 0;
        return db - da;
      });
  });

  eleventyConfig.addFilter("alternatePost", (posts, slug, lang) => {
    if (!Array.isArray(posts) || !slug || !lang) return null;
    return (
      posts.find(
        (post) =>
          post.data && post.data.slug === slug && post.data.lang === lang
      ) || null
    );
  });

  eleventyConfig.addFilter("relatedPosts", (posts, current, tools) => {
    if (!Array.isArray(posts) || !current) return [];
    const toolMap = Array.isArray(tools)
      ? Object.fromEntries(tools.map((t) => [t.id, t]))
      : {};
    const currentTool = toolMap[current.toolId];
    const currentCategory = currentTool && currentTool.category;

    return posts
      .filter((post) => {
        if (!post.data) return false;
        if (post.data.lang !== current.lang) return false;
        if (post.data.slug === current.slug) return false;
        return true;
      })
      .sort((a, b) => {
        const aTool = toolMap[a.data.toolId];
        const bTool = toolMap[b.data.toolId];
        const aSame = aTool && aTool.category === currentCategory ? 0 : 1;
        const bSame = bTool && bTool.category === currentCategory ? 0 : 1;
        if (aSame !== bSame) return aSame - bSame;
        const da = a.date ? new Date(a.date).getTime() : 0;
        const db = b.date ? new Date(b.date).getTime() : 0;
        return db - da;
      })
      .slice(0, 3);
  });

  eleventyConfig.addFilter("isoDate", (value) => {
    if (!value) return "";
    return new Date(value).toISOString().slice(0, 10);
  });

  return {
    pathPrefix: "/seo-signal-skills/",
    dir: {
      input: "content",
      includes: "../_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
};
