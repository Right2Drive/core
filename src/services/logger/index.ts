import { Logger, transports } from 'winston';
import * as path from 'path';

import levels from './levels';
import { LoggerMethods, Loggers } from '@/models/logger';

let loggers: Loggers = null;

function resolve(filename: string) {
  return path.resolve(__dirname, '..', '..', '..', 'logs', filename);
}

function check() {
  if (!loggers) {
    throw new Error('Logger was not initialized');
  }
}

function generateLogger(name: string) {
  return {
    [name]: new (Logger)({
      transports: [
        new (transports.File)({
          name: `${name}-file`,
          filename: resolve(`server-${name}.log`),
          level: name,
        }),

        new (transports.Console)({
          handleExceptions: true,
          colorize: true,
        }),
      ],
    }),
  };
}

function generateLoggerMethod(name: string) {
  let fn: (msg: string) => void = null;

  switch (name) {
    case 'info':
      fn = function (msg: string) {
        loggers[name].info(msg);
      };
      break;

    default:
      fn = function (msg: string) {
        loggers[name].log(name, msg);
      };
      break;
  }

  return {
    [name]: fn,
  };
}

/**
 * Initialize the logging for The Core
 */
export function initLogger() {
  if (loggers) {
    throw new Error('Already initialized logger');
  }
  loggers = Object.assign({}, ...levels.map(level => level.name).map(generateLogger));
}

export default Object.assign(
  {},
  ...levels.map(level => level.name).map(generateLoggerMethod),
) as LoggerMethods;
