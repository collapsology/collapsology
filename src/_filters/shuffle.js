/**
 * Shuffle arrays
 *
 * @param {Array} arr - array to shuffle
 * @return {Array} - shuffled array
 */

const lodash = require("lodash");

module.exports = function (arr) {
  let shuffled = lodash.shuffle(arr);
  return shuffled;
};
