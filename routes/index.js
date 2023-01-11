const express = require("express");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const router = express.Router();
const Error = require("http-errors");

/**
 * @example api of router
 * method : method of protocol http POST, PUT, GET, PATCH ...
 * expressHandler is function acceptee as arguments request anr response then return response of request or throw error http
 * router[method](requestUrl, asyncHandler(expressHandler(handler)));
 */

router.get(
  "/hello-word",
  asyncHandler((req, res) => {
    res.status(StatusCodes.OK).send("hello word !!");
  })
);

router.get(
  "/test/:id",
  asyncHandler((req, res) => {
    const id = req.params.id;
    if (id > 0 && id < 10) res.status(StatusCodes.OK).send("valid id");
    else throw new Error(StatusCodes.BAD_REQUEST, "invalid id");
  })
);

module.exports = router;
