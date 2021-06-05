if (process.env.Node_ENV == "production") {
  module.exports = require("./config.prod");
} else {
  module.exports = require("./config.dev");
}
