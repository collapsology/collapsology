/**
 * Sort all objects in an array by the passed property (simple sort)
 *
 * @param {Array} arr - Array to sort
 * @param {String} key - path of the property to sort by
 */

const lodash = require("lodash");

module.exports = function (arr, key, locale = "en") {
  return arr.sort((a, b) => {
    let valueA = lodash.get(a, key);
    let valueB = lodash.get(b, key);

    if (typeof valueA === "string" && typeof valueB === "string") {
      return valueA.localeCompare(valueB, locale, { sensitivity: "base" });
    }

    return valueA - valueB;
  });
};
