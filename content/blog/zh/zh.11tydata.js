module.exports = {
  layout: "layouts/post.njk",
  lang: "zh",
  tags: ["posts"],
  eleventyComputed: {
    permalink: (data) => {
      if (!data.slug) return false;
      return `/blog/zh/${data.slug}/`;
    },
  },
};
