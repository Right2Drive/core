import * as path from 'path';

// Setup config environment
import { config } from 'dotenv';
config({
  path: path.resolve(__dirname, 'test.env'),
});

// Import tests
import './unit';
