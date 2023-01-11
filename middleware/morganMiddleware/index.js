const morgan = require("morgan");
const logger = require("../../services/logger");

const ENV_PRODUCTION = process.env.NODE_ENV === "production";

class Stream {
  write(text) {
    logger.http(text);
  }
}
const stream = new Stream();

module.exports = () => morgan(ENV_PRODUCTION ? "combined" : "dev", { stream });
