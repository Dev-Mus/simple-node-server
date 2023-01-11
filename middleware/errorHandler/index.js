const { StatusCodes } = require("http-status-codes");

/**
 * this is a error handler middleware, that override the default express error handler
 * override it by setting any unknown error status to 500 status, if the status is exist
 * ex: 400, 403, ... m it wi
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const errorHandler = function (err, req, res, next) {
  if (err instanceof Error && !err.statusCode) {
    err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(err.statusCode).send("INTERNAL_SERVER_ERROR");
  } else {
    res.status(err.statusCode).send(err.message);
  }
};

module.exports = errorHandler;
