const { parallel, series, task } = require("gulp"),
  { html } = require("./templates"),
  { css } = require("./styles"),
  { js, jsGlobal } = require("./scripts"),
  { staticFiles, webFonts } = require("./staticFiles"), // images
  { server } = require("./server"),
  { watcher } = require("./watch"),
  { cleanup } = require("./cleanup"),
  browserSync = require("browser-sync").create();

task("serving", parallel(watcher, server));
const build = series(cleanup, parallel(css, js, jsGlobal, webFonts, staticFiles), html, "serving");

module.exports = {
  build,
};
