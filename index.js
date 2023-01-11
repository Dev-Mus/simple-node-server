require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser"); // body parser
const compression = require("compression");
const cors = require("cors");
const useragent = require("express-useragent");
const { errorHandler, morgan } = require("./middleware");
const logger = require("./services/logger");
const routes = require("./routes");
const { StatusCodes } = require("http-status-codes");

const app = new express();
app.set("trust proxy", true);

const PORT = process.env.PORT || 4000;
/**
 * middleware
 */
const middleware = {
  compression: () => compression(),
  morgan: () => morgan(),
  bodyParser: () => bodyParser.json({ limit: "50mb" }),
  urlencoded: () => bodyParser.urlencoded({ extended: false }),
  cors: () => cors(),
  useragent: () => useragent.express(),
};
Object.values(middleware).map((item) => app.use(item()));

/**
 * APIS definition
 */
app.use("/", routes);
app.use("*", (req, res) => res.status(StatusCodes.NOT_FOUND).send("Not Found"));

/**
 * error middleware
 */
app.use(errorHandler);

app.listen(PORT, () =>
  logger.info(`simple node server is listening on port ${PORT}`)
);

console.log("run index.js ");
