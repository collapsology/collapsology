const lodash = require("lodash");

module.exports = function (collection) {
  let allLinks = collection.getFilteredByGlob("./src/content/en/links/**/*.md");
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
} 