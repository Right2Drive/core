import { LoggerInstance } from 'winston';

/**
 * The methods used in The Core to log at various priority levels
 */
export interface LoggerMethods {
  /** Log using 'silly' level */
  silly(msg: string): void;
  /** Log using 'debug' level */
  debug(msg: string): void;
  /** Log using 'verbose' level */
  verbose(msg: string): void;
  /** Log using 'info' level */
  info(msg: string): void;
  /** Log using 'warn' level */
  warn(msg: string): void;
  /** Log using 'error' level */
  error(msg: string): void;
}

export interface Loggers {
  [key: string]: LoggerInstance;
}
