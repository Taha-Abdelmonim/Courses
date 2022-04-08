const { plumberConfig } = require("../config/pluginsConfig"),
  uglify = require("gulp-uglify-es").default, // minify js
  { scripts } = require("../config/paths"),
  { isDev } = require("../utils/env"),
  plumber = require("gulp-plumber"), // search error
  { dest, src } = require("gulp"),
  notify = require("gulp-notify"),
  babel = require("gulp-babel"), // convert es6 to es5
  gutil = require("gulp-util"),
  gulpif = require("gulp-if"), // if state meant
  concat = require("gulp-concat"), // concat fils
  browserSync = require("browser-sync").create(),
  newer = require("gulp-newer");

const js = async (done) => {
  await new Promise((res, rej) => {
    // src([scripts.srcJS,"node_modules/jquery/dist/jquery.min.js" ,"node_modules/bootstrap/dist/js/bootstrap.min.js"])
    src(["node_modules/jquery/dist/jquery.min.js", scripts.srcJS, "!./src/scripts/layoutJs/global.js"], { allowEmpty: true })
      .pipe(plumber(plumberConfig))
      .pipe(babel({ presets: ["@babel/preset-env"] }))
      .pipe(gulpif(!isDev, uglify()))
      .pipe(gulpif(!isDev, concat("main.min.js"), concat("main.js")))
      .pipe(dest(scripts.distJS))
      .pipe(browserSync.stream())
      .on("end", res);
    gutil.log(gutil.colors.green("✔️ js files were successfully compiled"));
    done();
  });
};

const jsGlobal = async (done) => {
  await new Promise((res, rej) => {
    src("./src/scripts/layoutJs/*.js", { allowEmpty: true })
      .pipe(plumber(plumberConfig))
      .pipe(babel({ presets: ["@babel/preset-env"] }))
      .pipe(gulpif(!isDev, uglify()))
      .pipe(gulpif(!isDev, concat("global.min.js"), concat("global.min.js")))
      .pipe(dest("dist/layout/js/"))
      .pipe(browserSync.stream())
      .on("end", res);
    gutil.log(gutil.colors.green("✔️ js Global files were successfully compiled"));
    done();
  });
};

module.exports = {
  js,
  jsGlobal,
};
