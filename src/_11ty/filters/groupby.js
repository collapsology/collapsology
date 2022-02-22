/**
 * Groups all objects in an array by the passed property
 *
 * @param {Array} arr - Array to group
 * @param {String} path - path of the property to group by
 */

const lodash = require("lodash");

module.exports = function (arr, path) {
  // create object grouped by property
  let goupedObj = lodash.groupBy(arr, (item) => {
    let pathValue = lodash.get(item, path);
    return pathValue;
  });

  // sort keys
  goupedObj = Object.entries(goupedObj).sort();

  return goupedObj;
};
