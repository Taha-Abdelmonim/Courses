const { develop } = require("./gulp/tasks/develop");
const { prod } = require("./gulp/tasks/prod");
const { build } = require("./gulp/tasks/build");
module.exports = {
  develop,
  prod,
  build,
};
