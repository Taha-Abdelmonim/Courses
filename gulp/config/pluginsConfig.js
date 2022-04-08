const { dist, srcDist } = require("../config/paths"),
  { dest, src } = require("gulp"),
  errorHandler = require("../utils/errorHandler"),
  imagemin = require("gulp-imagemin"),
  gulpif = require("gulp-if"),
  { isDev } = require("../utils/env"),
  zip = require("gulp-zip"),
  ftp = require("vinyl-ftp"),
  browserSync = require("browser-sync").create(),
  delConfig = dist,
  pugConfig = { pretty: true },
  plumberConfig = errorHandler;

// browserSync
const browserSyncConfig = {
  server: {
    baseDir: dist,
  },
};

// zip
const compress = (done) => {
  src(srcDist, { allowEmpty: true }).pipe(zip("website.zip")).pipe(dest("."));
  done();
};

// Upload Design With FTP
const deploy = (done) => {
  let conn = ftp.create({
    host: "files.000webhost.com",
    user: "corsesnew",
    password: "Taha@2000",
    parallel: 10,
  });

  src(srcDist, { allowEmpty: true }, { base: ".", buffer: false })
    .pipe(conn.newer("/public_html")) // upload file only edit
    .pipe(conn.dest("/public_html"))
    .pipe(browserSync.stream());
  done();
};

const imageminConfig = {
  images: [
    imagemin.mozjpeg({
      quality: 75,
      progressive: true,
    }),
    imagemin.optipng({
      optimizationLevel: 5,
    }),
    imagemin.svgo({
      plugins: [
        {
          removeViewBox: false,
        },
      ],
    }),
  ],
};

module.exports = {
  delConfig,
  pugConfig,
  plumberConfig,
  browserSyncConfig,
  imageminConfig,
  compress,
  deploy,
};
