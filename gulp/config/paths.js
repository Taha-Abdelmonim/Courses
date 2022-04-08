module.exports = {
  src: "src/**/*",
  tmp: "tmp",
  dist: "dist",
  wat: "src/**/*.*",
  srcDist: "dist/**/*.*",
  fonts: {
    srcFont: "src/webfonts/*.*",
    distFont: "dist/webfonts/",
  },
  images: {
    srcImgs: "src/images/**/*.{png,jpg,ico,svg}",
    distImgs: "dist/images/",
  },
  styles: {
    // srcCSS: "src/scss/**/*.{scss, sass}",
    srcCSS: "src/scss/**/*.scss",
    srcAllCss: "src/scss/**/*.css",
    srcStyle: "src/scss/main.scss",
    distCSS: "dist/css/",
    injectDevCss: "dist/css/*.css",
    injectDistCss: "dist/css/*.min.css",
  },
  scripts: {
    srcJS: "src/scripts/**/*.js",
    distJS: "dist/js/",
    injectDevJs: "dist/js/*.js",
    injectDistJs: "dist/js/*.min.js",
  },
  templates: {
    srcHTML: "src/pug/*.pug",
    srcHTMLReload: "src/**/*.pug",
    distIndex: "dist/index.html",
  },
};
