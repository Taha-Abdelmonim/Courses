const del = require("del"),
  { delConfig } = require("../config/pluginsConfig"),
  notifier = require("node-notifier"),
  gutil = require("gulp-util");

const cleanup = async (done) => {
  const deletedPaths = await del(delConfig);

  gutil.log(
    // show notifi in terminal
    gutil.colors.bgRed("⚠️  directories that would be deleted:\n"),
    "✔️ ",
    gutil.colors.red(deletedPaths.join("\n"))
  );
  done();
};

module.exports = {
  cleanup,
};
