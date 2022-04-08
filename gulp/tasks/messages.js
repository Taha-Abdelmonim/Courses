const gutil = require("gulp-util"),
  { NODE_ENV } = require("../utils/env");

const starterMsg = (done) => {
  gutil.log(gutil.colors.bgBlue(`✅ Starting Gulp in [${NODE_ENV}] mode. `));
  done();
};

module.exports = {
  starterMsg,
};
