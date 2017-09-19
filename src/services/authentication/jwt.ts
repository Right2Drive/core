import { Strategy, ExtractJwt } from 'passport-jwt';

export default function jwt() {
  const strategyOptions = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  this.use(new Strategy(strategyOptions, (payload, done) => {
    // TODO: Complete the strategy
  }));
}
