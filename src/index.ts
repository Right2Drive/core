import * as Express from 'express';
import { config } from 'dotenv';
import * as path from 'path';

import logger from '@/utilities/logger';
import router from '@/router';
import middleware from '@/middleware';

// Load configuration from .env file at root
config({
  path: path.join(CORE_ROOT, '.env'),
});

// Setup express server
const app = Express();
const port = process.env.PORT || 8090;

// Configure middleware
middleware.apply(app);

// Start listening for requests
const server = app.listen(port, () => {
  logger.info(`The Core is running on http://localhost:${port}`);
});

// Setup routes
app.use('/', router);
