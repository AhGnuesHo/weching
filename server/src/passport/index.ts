import passport from 'passport';
import { login } from './strategies/google';
module.exports = () => {
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: any, done) => {
    done(null, id);
  });

  passport.use(login);
};
