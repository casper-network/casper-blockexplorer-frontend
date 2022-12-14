import express from "express";
import { StatusCodes } from "http-status-codes";

import { NODE_ENV } from "../config";
import { ApiError } from "../utils";

export const errorConverter = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || StatusCodes[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

export const errorHandler = (
  err: ApiError,
  req: express.Request,
  res: express.Response
) => {
  console.error(err);
  let { statusCode, message } = err;
  if (NODE_ENV === "production" && !err.isOperational) {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    message = StatusCodes[StatusCodes.INTERNAL_SERVER_ERROR];
  }

  const response = {
    code: statusCode,
    message,
    ...(NODE_ENV === "development" && { stack: err.stack }),
  };

  if (NODE_ENV === "development") {
    console.error(err);
  }

  res.status(statusCode).send(response);
};
