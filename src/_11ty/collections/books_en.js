module.exports = function (collection) {
  return collection
    .getFilteredByGlob("./src/content/en/books/*.md")
    .sort((a, b) => {
      let yearA = parseInt(a.data.year, 10);
      let yearB = parseInt(b.data.year, 10);
      return yearA - yearB;
    })
    .reverse();
}