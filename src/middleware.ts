import { initLogger } from '@/utilities/logger';
import * as compression from 'compression';
import * as cors from 'cors';

const morgan = initLogger();

export default function middleware() {
  this.use(cors());
  this.use(compression());
  this.use(morgan);
}
