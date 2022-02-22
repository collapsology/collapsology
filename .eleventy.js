module.exports = function (eleventyConfig) {
  // filters
  eleventyConfig.addFilter("date", require("./src/_11ty/filters/date.js"));
  eleventyConfig.addFilter("exclude", require("./src/_11ty/filters/exclude.js"));
  eleventyConfig.addFilter("include", require("./src/_11ty/filters/include.js"));
  eleventyConfig.addFilter("jsonify", require("./src/_11ty/filters/jsonify.js"));
  eleventyConfig.addFilter("sortby", require("./src/_11ty/filters/sortby.js"));
  eleventyConfig.addFilter("limit", require("./src/_11ty/filters/limit.js"));
  eleventyConfig.addFilter("groupby", require("./src/_11ty/filters/groupby.js"));
  eleventyConfig.addFilter("translate", require("./src/_11ty/filters/translate.js"));
  eleventyConfig.addFilter("shuffle", require("./src/_11ty/filters/shuffle.js"));

  // passthrough copy
  eleventyConfig.addPassthroughCopy("./src/apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");
  eleventyConfig.addPassthroughCopy("./src/assets/img/");
  eleventyConfig.addPassthroughCopy("./src/assets/fonts/");

  // collections
  eleventyConfig.addCollection("books_fr", require("./src/_11ty/collections/books_fr.js"));
  eleventyConfig.addCollection("books_en", require("./src/_11ty/collections/books_en.js"));
  eleventyConfig.addCollection("links_fr", require("./src/_11ty/collections/links_fr.js"));
  eleventyConfig.addCollection("links_en", require("./src/_11ty/collections/links_en.js"));
  eleventyConfig.addCollection("linksByTypes_fr", require("./src/_11ty/collections/linksByTypes_fr.js"));
  eleventyConfig.addCollection("linksByTypes_en", require("./src/_11ty/collections/linksByTypes_en.js"));

  // base config
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    passthroughFileCopy: true
  };
};
