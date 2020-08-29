const del = require("del");

// clean dist folder
function dist() {
  return del(["./dist/"]);
}

module.exports = { dist };
