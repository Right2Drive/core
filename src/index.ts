import * as Express from 'express';

const app = Express();
const port = process.env.PORT || 8090;
const isDevelopment = process.env.NODE_ENV === 'development';

const server = app.listen(port, () => {
  console.log(`LishaBora Hub running on http://localhost:${port}`);
});
