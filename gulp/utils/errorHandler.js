const gutil = require("gulp-util");

function errorHandler(err) {
  gutil.log(gutil.colors.yellow("❌ Error files"), gutil.colors.red(err.message));
  gutil.beep();
}

module.exports = {
  errorHandler,
};
