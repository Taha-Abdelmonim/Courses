const { series, parallel, task } = require("gulp"),
  { starterMsg } = require("./messages"),
  { build } = require("./build");

const prod = task("prod", series(starterMsg, build));

module.exports = {
  prod,
};
