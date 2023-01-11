const winston = require("winston");
require("winston-daily-rotate-file");
const { createLogger } = winston;
const { LEVEL, LEVELS, COLORS, TRANSPORTS, DEFAULT_META } = require("./config");

winston.addColors(COLORS);

const logger = createLogger({
  level: LEVEL,
  levels: LEVELS,
  defaultMeta: DEFAULT_META,
  transports: TRANSPORTS,
});

module.exports = logger;
