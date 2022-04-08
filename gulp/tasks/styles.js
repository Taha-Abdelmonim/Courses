const { dest, src } = require("gulp"),
  sass = require("gulp-sass"),
  plumber = require("gulp-plumber"),
  { styles } = require("../config/paths"),
  { plumberConfig } = require("../config/pluginsConfig"),
  gutil = require("gulp-util"),
  notify = require("gulp-notify"), // notify in terminal
  notifier = require("node-notifier"), // use with gulpif
  browserSync = require("browser-sync").create(),
  gulpif = require("gulp-if"),
  { isDev } = require("../utils/env"),
  cleanCSS = require("gulp-clean-css"), // minify css
  concat = require("gulp-concat"), // marge files css in one file
  sourcemaps = require("gulp-sourcemaps"),
  newer = require("gulp-newer"),
  autoprefixer = require("gulp-autoprefixer");
sass.compiler = require("node-sass");

const css = async (done) => {
  await new Promise((res, rej) => {
    // src([styles.srcCSS, "node_modules/bootstrap/dist/css/bootstrap.min.css"])
    src([styles.srcStyle, styles.srcAllCss])
      // .pipe(newer([styles.srcStyle, styles.srcAllCss]))
      .pipe(sourcemaps.init())
      .pipe(plumber(plumberConfig))
      .pipe(sass())
      .pipe(gulpif(!isDev, cleanCSS()))
      .pipe(gulpif(!isDev, concat("main.min.css"), concat("main.css")))
      .pipe(autoprefixer())
      .pipe(sourcemaps.write("."))
      .pipe(dest(styles.distCSS))
      .pipe(browserSync.stream())
      .on("end", res);
    gutil.log(gutil.colors.green("✔️ css files were successfully compiled"));
    done();
  });
};

module.exports = {
  css,
};
