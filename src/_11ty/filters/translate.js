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
  const filePath = path.resolve(`./translations/${locale}.js`);

  if (!fs.existsSync(filePath)) {
    return str;
  }

  const translations = require(filePath);
  return translations[str];
};
