const childProcess = require("child_process");

// Run Eleventy
function build() {
  return childProcess.spawn("npx", ["eleventy", "--quiet"], {
    stdio: "inherit"
  });
}

module.exports = { build };
