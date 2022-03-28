// filters
const dateISO = require("./src/_11ty/filters/date.js").dateISO;
const dateFull = require("./src/_11ty/filters/date.js").dateFull;
const dateFeed = require("./src/_11ty/filters/date.js").dateFeed;
const dateYear = require("./src/_11ty/filters/date.js").dateYear;
const limit = require("./src/_11ty/filters/limit.js");
const translate = require("./src/_11ty/filters/translate.js");
const shuffle = require("./src/_11ty/filters/shuffle.js");
const setFileExtension = require("./src/_11ty/filters/setFileExtension.js");

// collections
const books_fr = require("./src/_11ty/collections/books_fr.js");
const books_en = require("./src/_11ty/collections/books_en.js");
const links_fr = require("./src/_11ty/collections/links_fr.js");
const links_en = require("./src/_11ty/collections/links_en.js");
const linksByTypes_fr = require("./src/_11ty/collections/linksByTypes_fr.js");
const linksByTypes_en = require("./src/_11ty/collections/linksByTypes_en.js");

module.exports = function (eleventyConfig) {
  // filters
  eleventyConfig.addFilter("dateISO", dateISO);
  eleventyConfig.addFilter("dateFull", dateFull);
  eleventyConfig.addFilter("dateFeed", dateFeed);
  eleventyConfig.addFilter("dateYear", dateYear);
  eleventyConfig.addFilter("limit", limit);
  eleventyConfig.addFilter("translate", translate);
  eleventyConfig.addFilter("shuffle", shuffle);
  eleventyConfig.addFilter("setFileExtension", setFileExtension);

  // collections
  eleventyConfig.addCollection("books_fr", books_fr);
  eleventyConfig.addCollection("books_en", books_en);
  eleventyConfig.addCollection("links_fr", links_fr);
  eleventyConfig.addCollection("links_en", links_en);
  eleventyConfig.addCollection("linksByTypes_fr", linksByTypes_fr);
  eleventyConfig.addCollection("linksByTypes_en", linksByTypes_en);

  // passthrough copy
  eleventyConfig.addPassthroughCopy({"./src/static/":"/"});
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
