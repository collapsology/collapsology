/**
 * Select all objects in an array
 * where the key does not contain the passed value
 *
 * @param {Array} arr - array to inspect
 * @param {String} key - path to inspect
 * @param {String} value - value to match
 * @return {Array} new array
 */

const lodash = require("lodash");

module.exports = function (arr, key, value) {
  return arr.filter((item) => {
    let keyValue = lodash.get(item, key);
    return !keyValue.includes(value);
  });
};
