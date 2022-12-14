const GoogleStrategy = require('passport-google-oauth20').Strategy;
import { doesNotMatch } from 'assert';
import { clientID, clientSecret } from '../../config';
import { guestService } from '../../services/guestService';

const config = {
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: '/auth/google/callback',
};

const login = new GoogleStrategy(
  config,
  async (
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any
  ) => {
    try {
      const exUser = await guestService.isUser(profile._json.email);

      if (exUser) {
        done(null, exUser);
      } else {
        // throw new Error('회원가입되지 않은 사용자');
        done(null, profile._json.email);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }
);
export { login };
