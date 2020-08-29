const browsersync = require("browser-sync").create();

// browsersync server
function init(done) {
  browsersync.init({
    server: "./dist/",
    files: ["./dist/**/*"],
    port: 3000,
    open: false
  });
  done();
}

module.exports = { init };
