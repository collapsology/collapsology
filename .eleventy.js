module.exports = function (eleventyConfig) {
  // filters
  eleventyConfig.addFilter("dateISO", require("./src/_11ty/filters/date.js").dateISO);
  eleventyConfig.addFilter("dateFull", require("./src/_11ty/filters/date.js").dateFull);
  eleventyConfig.addFilter("dateFeed", require("./src/_11ty/filters/date.js").dateFeed);
  eleventyConfig.addFilter("dateYear", require("./src/_11ty/filters/date.js").dateYear);
  eleventyConfig.addFilter("limit", require("./src/_11ty/filters/limit.js"));
  eleventyConfig.addFilter("translate", require("./src/_11ty/filters/translate.js"));
  eleventyConfig.addFilter("shuffle", require("./src/_11ty/filters/shuffle.js"));

  // collections
  eleventyConfig.addCollection("books_fr", require("./src/_11ty/collections/books_fr.js"));
  eleventyConfig.addCollection("books_en", require("./src/_11ty/collections/books_en.js"));
  eleventyConfig.addCollection("links_fr", require("./src/_11ty/collections/links_fr.js"));
  eleventyConfig.addCollection("links_en", require("./src/_11ty/collections/links_en.js"));
  eleventyConfig.addCollection("linksByTypes_fr", require("./src/_11ty/collections/linksByTypes_fr.js"));
  eleventyConfig.addCollection("linksByTypes_en", require("./src/_11ty/collections/linksByTypes_en.js"));

  // passthrough copy
  eleventyConfig.addPassthroughCopy("./src/apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");
  eleventyConfig.addPassthroughCopy("./src/assets/img/");
  eleventyConfig.addPassthroughCopy("./src/assets/fonts/");

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
    markdownTemplateEngine: "njk"
  };
};
