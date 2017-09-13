import * as Express from 'express';
import { config } from 'dotenv';
import * as path from 'path';

// Import database to initialize connection
import { connect } from '@/context/database';
import logger, { initLogger } from '@/utilities/logger';

// Load configuration from .env file at root
config({
  path: path.join(CORE_ROOT, '.env'),
});

// Now that the env variables are loaded, initialize the logger and retrieve the morgan middleware
const morgan = initLogger();

// Setup express server
const app = Express();
const port = process.env.PORT || 8090;
const isDevelopment = process.env.NODE_ENV === 'development';

// Configure middleware
app.use(morgan);

// Start listening for requests
const server = app.listen(port, () => {
  logger.info(`The Core is running on http://localhost:${port}`);
});

// Connect database
connect().subscribe((err) => {
  logger.error(err);
});
