/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, RequestHandler } from 'express';
import config from '../config';

// Not Found Route Handler
export const notFoundHandler: RequestHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `🔍 Not Found: ${req.originalUrl}`,
  });
};

// Global Error Handler
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    stack: config.node_env === 'development' ? err.stack : undefined,
  });
};