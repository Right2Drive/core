import { RequestHandler } from 'express';

import { UserType } from '@/models/User/UserType';
import arrayIncludes from '@/utilities/functions/arrayIncludes';

export default function authorized(...types: UserType[]): RequestHandler {
  return (req, res, next) => {
    if (!arrayIncludes(types, req.user.type)) {
      // Send unauthorized status
      res.sendStatus(401);
      res.end();
    } else {
      // Continue
      next();
    }
  };
}
