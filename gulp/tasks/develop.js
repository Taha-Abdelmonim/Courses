const { series, task } = require("gulp"),
  { starterMsg } = require("./messages"),
  { build } = require("./build");

const develop = task("develop", series(starterMsg, build));

module.exports = {
  develop,
};
