module.exports = {
  layout: "layouts/post.njk",
  lang: "en",
  tags: ["posts"],
  eleventyComputed: {
    permalink: (data) => {
      if (!data.slug) return false;
      return `/blog/en/${data.slug}/`;
    },
  },
};
