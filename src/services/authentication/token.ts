import * as jwt from 'jsonwebtoken';

import { UserType } from '@/models/User/UserType';

/**
 * Generate a json web token for the specified user
 *
 * @param username {string} User to sign the token for
 */
export function createToken(username: string, type: UserType) {
  // TODO: Look into expiry
  // TODO: Look into audience/issuer
  return new Promise((resolve, reject) => {
    jwt.sign(
      { // Payload
        username,
        type,
      },
      // Secret
      process.env.JWT_SECRET,
      { // Options
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE,
        expiresIn: process.env.JWT_EXPIRES,
      },
      (err, encoded) => {
        err && reject(err);

        resolve(encoded);
      },
    );
  });
}
