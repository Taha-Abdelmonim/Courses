const { dest, src } = require("gulp"),
  pug = require("gulp-pug"),
  { templates, dist, scripts, styles } = require("../config/paths"),
  { pugConfig } = require("../config/pluginsConfig"),
  notify = require("gulp-notify"),
  gutil = require("gulp-util"),
  plumber = require("gulp-plumber"),
  { plumberConfig } = require("../config/pluginsConfig"),
  gulpif = require("gulp-if"),
  { isDev } = require("../utils/env"),
  browserSync = require("browser-sync").create(),
  inject = require("gulp-inject"), // send or inject css and js automatic in html
  htmlmin = require("gulp-htmlmin"),
  newer = require("gulp-newer");

const html = async (done) => {
  await new Promise((res, rej) => {
    src(templates.srcHTML)
      // .pipe(newer(templates.srcHTML))
      .pipe(plumber(plumberConfig))
      .pipe(pug(pugConfig))
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(
        inject(
          gulpif(
            isDev,
            src([scripts.injectDevJs, styles.injectDevCss], { read: false }),
            src([scripts.injectDistJs, styles.injectDistCss], { read: false })
          ),
          {
            ignorePath: dist,
            addRootSlash: false,
          }
        )
      )
      .pipe(dest(dist))
      .pipe(browserSync.stream())
      .on("end", res);
    gutil.log(gutil.colors.green("✔️ html files were successfully compiled"));
    done();
  });
};

module.exports = {
  html,
};
