import * as express from 'express';
import * as bodyParser from 'body-parser';

const app = express();
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 8090;
const isDevelopment = process.env.NODE_ENV === 'development';

const server = app.listen(port, () => {
  console.log(`LishaBora Hub running on localhost:${port}`);
});

process.on('message', (msg) => {
  if (msg && msg.type === 'close') {
    server.close(() => {
      console.log('Server shut down');
      process.send({
        type: 'close',
      });
    });
  }
});
