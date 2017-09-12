import * as Express from 'express';
import { config } from 'dotenv';

// Import database to initialize connection
import { connect } from './context/database';

// Connect database
connect().subscribe((err) => {

});

// Load configuration from .env file at root
config();

// Setup express server
const app = Express();
const port = process.env.PORT || 8090;
const isDevelopment = process.env.NODE_ENV === 'development';

const server = app.listen(port, () => {
  console.log(`LishaBora Core running on http://localhost:${port}`);
});
