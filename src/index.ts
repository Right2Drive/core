import * as express from 'express';

const app = express();
const port = process.env.PORT || 8090;

const server = app.listen(port, () => {
  console.log(`The magic happens on localhost:${port}`);
});
