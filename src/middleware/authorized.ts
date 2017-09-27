import { RequestHandler } from 'express';

export default function authorized(type: string): RequestHandler {
  return (req, res, next) => {
    if (req.user.type !== type) {
      // Send unauthorized status
      res.sendStatus(401);
      res.end();
    } else {
      // Continue
      next();
    }
  };
}
