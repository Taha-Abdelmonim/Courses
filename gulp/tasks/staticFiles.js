const notifier = require("node-notifier"),
  notify = require("gulp-notify"),
  gutil = require("gulp-util"),
  plumber = require("gulp-plumber"),
  { dest, src } = require("gulp"),
  { images, fonts } = require("../config/paths"),
  { plumberConfig } = require("../config/pluginsConfig"),
  imagemin = require("gulp-imagemin"),
  gulpif = require("gulp-if"),
  { isDev } = require("../utils/env"),
  { imageminConfig } = require("../config/pluginsConfig"),
  newer = require("gulp-newer");

const staticFiles = (done) => {
  src(images.srcImgs)
    // .pipe(newer(images.srcImgs))
    .pipe(plumber(plumberConfig))
    .pipe(gulpif(!isDev, imagemin(imageminConfig.images, { verbose: true })))
    .pipe(dest(images.distImgs), { sourcemaps: true });
  gutil.log(gutil.colors.green("✔️ images files were successfully compiled"));
  done();
};

const webFonts = (done) => {
  src(fonts.srcFont)
    .pipe(plumber(plumberConfig))
    .pipe(dest(fonts.distFont), { sourcemaps: true });
  gutil.log(gutil.colors.green("✔️ Fonts were successfully compiled"));
  done();
};

module.exports = {
  staticFiles,
  webFonts,
};
