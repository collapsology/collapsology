/**
 * Translate strings
 *
 * @param {String} str - String to translate
 * @param {String} locale - Locale code
 * @return {String} translated String
 */

const path = require("path");
const fs = require("fs");

module.exports = function (str, locale = "") {
  let filePath = path.resolve(`./translations/${locale}.js`);

  if (!fs.existsSync(filePath)) {
    return str;
  }

  let translations = require(filePath);
  return translations[str];
};
