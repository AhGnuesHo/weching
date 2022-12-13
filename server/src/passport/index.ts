
import passport from 'passport';
import { google } from './strategies/google';
module.exports = () => {
  passport.use(google);
};
