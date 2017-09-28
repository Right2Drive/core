import { ErrorRequestHandler } from 'express';

/**
 * Express Middleware to handle when a jwt token is not provided
 *
 * @returns {ErrorRequestHandler} Express error request handler middleware
 */
export default function jwtUnauthorized(): ErrorRequestHandler {
  return (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).end();
      return;
    }

    next();
  };
}
