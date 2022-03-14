const path = require("path");

module.exports = function (filepath, extension) {
  const fileName = path.parse(filepath).name;

  return `${fileName}.${extension}`;
};