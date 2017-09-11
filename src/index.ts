import * as Express from 'express';

const app = Express();
const port = process.env.PORT || 8090;
const isDevelopment = process.env.NODE_ENV === 'development';
const isLogging = process.argv[2] === 'FIRST_RUN';

const server = app.listen(port, () => {
  isLogging && console.log(`LishaBora Hub running on http://localhost:${port}`);
});

process.on('message', (msg) => {
  if (msg && msg.type === 'close') {
    server.close(() => {
      process.send({
        type: 'close',
      });
    });
  }
});
