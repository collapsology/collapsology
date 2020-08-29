// required packages
const gulp = require("gulp");

// import tasks
const clean = require("./gulp_tasks/clean.js");
const eleventy = require("./gulp_tasks/eleventy.js");
const server = require("./gulp_tasks/browsersync.js");
const images = require("./gulp_tasks/images.js");
const scripts = require("./gulp_tasks/scripts.js");
const styles = require("./gulp_tasks/styles.js");

// watch all files
function watchFiles() {
  gulp.watch(["./src/assets/scss/**/*"], styles.build);
  gulp.watch(["./src/assets/js/**/*"], scripts.build);
  gulp.watch(["./src/assets/images/**/*"], images.resize);
  gulp.watch(
    ["./.eleventy.js", "./src/**/*", "!./src/assets/**/*"],
    eleventy.build
  );
}

const watch = gulp.parallel(server.init, watchFiles);
const build = gulp.series(
  clean.dist,
  gulp.parallel(styles.build, scripts.build, images.resize, eleventy.build)
);

exports.build = build;
exports.styles = styles.build;
exports.default = build;
exports.watch = watch;
