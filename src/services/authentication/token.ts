import * as jwt from 'jsonwebtoken';

/**
 * Generate a json web token for the specified user
 *
 * @param username {string} User to sign the token for
 */
export function createToken(username: string) {
  // TODO: Look into expiry
  // TODO: Look into audience/issuer
  return jwt.sign({ username }, process.env.JWT_SECRET);
}
