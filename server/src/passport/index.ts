import passport from 'passport';
import { login } from './strategies/google';
module.exports = () => {
  passport.serializeUser((user: any, done) => {
    done(null, user.email);
  });

  passport.deserializeUser((email: any, done) => {
    done(null, email);
  });

  passport.use(login);
};
