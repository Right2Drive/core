import * as Express from 'express';
import { config } from 'dotenv';
import * as path from 'path';

// Import database to initialize connection
// FIXME: Should be able to use '@' alias
import { connect } from './context/database';
import logger, { initLogger } from './services/logger';

// Load configuration from .env file at root
config({
  path: path.resolve(__dirname, '..', '.env'),
});

// Initialize the logger now that the env variables are loaded
initLogger();

// Setup express server
const app = Express();
const port = process.env.PORT || 8090;
const isDevelopment = process.env.NODE_ENV === 'development';

const server = app.listen(port, () => {
  console.log(`The Core is running on http://localhost:${port}`);
});

// Connect database
connect().subscribe((err) => {
  // TODO: Perform error handling
  console.error(err);
});

logger.info('info');
logger.debug('debug');
logger.error('error');
logger.silly('haha I\'m silly');
throw new Error('Haha I threw an error!');
