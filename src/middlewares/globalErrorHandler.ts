import { ErrorRequestHandler, RequestHandler } from 'express';
import mongoose from 'mongoose';
import { MongoServerError } from 'mongodb';
import config from '../config';

// Not Found Handler
export const notFoundHandler: RequestHandler = (req, res): void => {
  res.status(404).json({
    message: 'Route not found',
    success: false,
    error: {
      name: 'NotFound',
      errors: {
        path: {
          message: `No handler found for ${req.originalUrl}`,
          path: req.originalUrl,
        },
      },
    },
  });
};

// Global Error Handler
export const errorHandler: ErrorRequestHandler = (err, req, res, next): void => {
  // Validation Error
  if (err instanceof mongoose.Error.ValidationError) {
    const formattedErrors: Record<string, any> = {};

    for (const key in err.errors) {
      const error = err.errors[key];
      if (error instanceof mongoose.Error.ValidatorError) {
        const properties: Record<string, unknown> = {
          message: error.properties?.message,
          type: error.properties?.type,
        };
        if ('min' in (error.properties || {})) {
          properties.min = (error.properties as any).min;
        }

        formattedErrors[key] = {
          message: error.message,
          name: error.name,
          properties,
          kind: error.kind,
          path: error.path,
          value: error.value,
        };
      }
    }

    res.status(400).json({
      message: 'Validation failed',
      success: false,
      error: {
        name: err.name,
        errors: formattedErrors,
      },
    });
    return;
  }

  // Duplicate Key Error
  if (err instanceof MongoServerError && err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0];
    const value = err.keyValue?.[field];

    res.status(409).json({
      message: 'Validation failed',
      success: false,
      error: {
        name: 'DuplicateKeyError',
        errors: {
          [field]: {
            message: `Duplicate value '${value}' for ${field}`,
            path: field,
            value,
          },
        },
      },
    });
    return;
  }

  // Other errors
  res.status(err.statusCode || 500).json({
    message: 'Something went wrong',
    success: false,
    error: {
      name: err.name || 'Error',
      errors: {
        general: {
          message: err.message || 'Internal Server Error',
        },
      },
    },
    ...(config.node_env === 'development' && { stack: err.stack }),
  });
};
