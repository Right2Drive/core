import * as Express from 'express';
import * as BodyParser from 'body-parser';

/**
 * Creates a new instance of Express.Router configured with body-parser.
 *
 * @returns {Router} The Express router.
 */
export default function generateRouter() {
  const router = Express.Router();
  router.use(BodyParser.urlencoded({ extended: true }));

  return router;
}
