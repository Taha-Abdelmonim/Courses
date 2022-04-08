const { watch, series } = require("gulp"),
  { styles, scripts, templates, wat } = require("../config/paths"),
  { compress, deploy } = require("../config/pluginsConfig"),
  { html } = require("./templates"),
  { css } = require("./styles"),
  { js, jsGlobal } = require("./scripts"),
  { reload } = require("./server"),
  { isDev } = require("../utils/env");

const watcher = (done) => {
  watch(styles.srcCSS, series(css, reload));
  watch(scripts.srcJS, series(js, jsGlobal, reload));
  watch(templates.srcHTMLReload, series(html, reload));
  // !isDev ? watch(wat, series(compress)) : null;
  // !isDev ? watch(wat, series(deploy)) : null;
  done();
};

module.exports = {
  watcher,
};
