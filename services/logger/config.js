const winston = require("winston");
require("winston-mongodb");

const SERVICE = "Simple node server";

exports.DEFAULT_META = { service: SERVICE };

const ENV_PRODUCTION = process.env.NODE_ENV === "production";

exports.LEVEL = ENV_PRODUCTION ? "http" : "debug";

exports.LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

exports.COLORS = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

exports.FORMAT = {
  CONSOLE: winston.format.combine(
    // Add the message timestamp with the preferred format
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    // Tell Winston that the logs must be colored
    winston.format.colorize({ all: true }),
    // Define the format of the message showing the timestamp, the server name, the level and the message
    winston.format.printf(
      (info) => `[${info.timestamp}] ${info.level} :>> ${info.message}`
    )
  ),
  FILE: winston.format.combine(
    // Add the message timestamp with the preferred format
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    // Define the format of the message showing the json format {level, message, service, pm_index, timestamp}
    winston.format.json()
  ),
};

const TRANSPORTS = {
  CONSOLE: [
    new winston.transports.Console({
      handleExceptions: true,
      format: this.FORMAT.CONSOLE,
    }),
  ],
  FILE: [
    new winston.transports.DailyRotateFile({
      filename: "./logs/error/%DATE%/simple-node-server-error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      level: "error",
      maxSize: "1m",
      format: this.FORMAT.FILE,
    }),
    new winston.transports.DailyRotateFile({
      filename: "./logs/all/%DATE%/simple-node-server-all-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxSize: "1m",
      format: this.FORMAT.FILE,
    }),
  ],
  MONGODB: [
    new winston.transports.MongoDB({
      level: "debug",
      // metaKey: this.DEFAULT_META,
      db:
        process.env.MONGODB_URI ||
        "mongodb://localhost:27017/logs?retryWrites=true&w=majority",
      options: {
        useUnifiedTopology: true,
      },
      collection: "logs",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.metadata({ fillExcept: ["message", "level", "timestamp"] }),
        winston.format.json()
      ),
    }),
  ],
};

exports.TRANSPORTS = [
  ...TRANSPORTS.CONSOLE,
  ...(ENV_PRODUCTION ? TRANSPORTS.FILE : []),
  ...TRANSPORTS.MONGODB,
];
