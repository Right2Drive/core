import { Router } from 'express';
import { urlencoded, json } from 'body-parser';

export enum ParserType {
  JSON = 0x1,
  URL_ENCODED = 0x2,
}

/**
 * Creates a new instance of Express.Router configured with body-parser.
 *
 * @returns {Router} The Express router.
 */
export default function createRouter(...parserTypes: ParserType[]) {
  const router = Router();

  const contains = (el: ParserType) => arrayIncludes(parserTypes, el);

  if (contains(ParserType.JSON)) {

  } else if (contains(ParserType.URL_ENCODED)) {

  } else {
    // Default to JSON
  }

  return router;
}
