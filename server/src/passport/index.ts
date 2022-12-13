import passport from 'passport';
import { google } from './strategies/google';
module.exports = () => {
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: any, done) => {
    // User.findOne({ where: { id } })
    //   .then((user) => done(null, user))
    //   .catch((err) => done(err));

    done(null, id);
  });

  passport.use(google);
};
