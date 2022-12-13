const GoogleStrategy = require('passport-google-oauth20').Strategy;
import { clientID, clientSecret } from '../../config';
import { guestService } from '../../services/guestService';

const config = {
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: '/auth/google/callback',
};

const google = new GoogleStrategy(
  config,
  async (
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any
  ) => {
    try {
      const exUser = await guestService.isEmail(profile._json.email);

      if (exUser) {
        done(null, exUser);
      } else {
        // todo 회원가입 하도록 리다이렉트
        console.log('회원가입되지 않은 이메일입니다.');
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }
);
export { google };
