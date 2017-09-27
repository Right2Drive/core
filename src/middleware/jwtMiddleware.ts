import * as expressJwt from 'express-jwt';

export default function jwtMiddleware() {
  // TODO: Look into expiry
  // TODO: Look into audience/issuer
  return expressJwt({
    secret: process.env.JWT_SECRET,
  }).unless({
    path: [
      // Allow access to the login path
      '/authentication/login',
    ],
  });
}
