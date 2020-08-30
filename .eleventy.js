const lodash = require("lodash");

module.exports = function (eleventyConfig) {
  // filters
  eleventyConfig.addFilter("date", require("./src/_filters/date.js"));
  eleventyConfig.addFilter("exclude", require("./src/_filters/exclude.js"));
  eleventyConfig.addFilter("include", require("./src/_filters/include.js"));
  eleventyConfig.addFilter("jsonify", require("./src/_filters/jsonify.js"));
  eleventyConfig.addFilter("sortby", require("./src/_filters/sortby.js"));
  eleventyConfig.addFilter("limit", require("./src/_filters/limit.js"));
  eleventyConfig.addFilter("groupby", require("./src/_filters/groupby.js"));
  eleventyConfig.addFilter("translate", require("./src/_filters/translate.js"));
  eleventyConfig.addFilter("shuffle", require("./src/_filters/shuffle.js"));

  // passthrough copy
  eleventyConfig.addPassthroughCopy("./src/apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");
  eleventyConfig.addPassthroughCopy("./src/assets/img/");
  eleventyConfig.addPassthroughCopy("./src/assets/fonts/");

  // collections: books FR
  eleventyConfig.addCollection("books_fr", function (collection) {
    return collection
      .getFilteredByGlob("./src/fr/books/*.md")
      .sort((a, b) => {
        let yearA = parseInt(a.data.year, 10);
        let yearB = parseInt(b.data.year, 10);
        return yearA - yearB;
      })
      .reverse();
  });

  // collections: books EN
  eleventyConfig.addCollection("books_en", function (collection) {
    return collection
      .getFilteredByGlob("./src/en/books/*.md")
      .sort((a, b) => {
        let yearA = parseInt(a.data.year, 10);
        let yearB = parseInt(b.data.year, 10);
        return yearA - yearB;
      })
      .reverse();
  });

  // collections: links FR
  eleventyConfig.addCollection("links_fr", function (collection) {
    return collection.getFilteredByGlob("./src/fr/links/**/*.md");
  });

  // collections: grouped links by type FR
  eleventyConfig.addCollection("linksByTypes_fr", function (collection) {
    let allLinks = collection.getFilteredByGlob("./src/fr/links/**/*.md");
    allLinks = lodash.sortBy(allLinks, (item) => item.data.order);
    allLinks = lodash.groupBy(allLinks, (item) => item.data.type);
    Object.entries(allLinks).forEach((category) => {
      let entries = category[1];
      entries.sort((a, b) => {
        let titleA = a.data.title.toLowerCase();
        let titleB = b.data.title.toLowerCase();
        if (titleA > titleB) return 1;
        if (titleA < titleB) return -1;
        return 0;
      });
    });
    return allLinks;
  });

  // collections: links EN
  eleventyConfig.addCollection("links_en", function (collection) {
    return collection
      .getFilteredByGlob("./src/fr/links/**/*.md")
      .sort((a, b) => {
        let titleA = a.data.title.toLowerCase();
        let titleB = b.data.title.toLowerCase();
        if (titleA > titleB) return -1;
        if (titleA < titleB) return 1;
        return 0;
      })
      .reverse();
  });

  // collections: grouped links by type EN
  eleventyConfig.addCollection("linksByTypes_en", function (collection) {
    let allLinks = collection.getFilteredByGlob("./src/en/links/**/*.md");
    allLinks = lodash.sortBy(allLinks, (item) => item.data.order);
    allLinks = lodash.groupBy(allLinks, (item) => item.data.type);
    Object.entries(allLinks).forEach((category) => {
      let entries = category[1];
      entries.sort((a, b) => {
        let titleA = a.data.title.toLowerCase();
        let titleB = b.data.title.toLowerCase();
        if (titleA > titleB) return 1;
        if (titleA < titleB) return -1;
        return 0;
      });
    });
    return allLinks;
  });

  // base config
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    passthroughFileCopy: true
  };
};
