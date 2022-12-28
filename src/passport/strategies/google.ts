const GoogleStrategy = require("passport-google-oauth20").Strategy;
import { clientID, clientSecret } from "../../config";
import { userService } from "../../services/userService";
import { userEnum } from "../../interfaces";
import { log } from "../../logger";
const config = {
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: "/auth/google/callback",
  scope: ["profile", "email"],
};

const login = new GoogleStrategy(
  "https://accounts.google.com/o/oauth2/auth?" +
    "client_id=17968900627-jbhguaptvim7icgl0ar9k28isnnq2848.apps.googleusercontent.com&" +
    "redirect_uri=http://kdt-sw3-team09.elicecoding.com:3001/auth/google/callback&" +
    "response_type=token&" +
    "scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
  async (
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any
  ) => {
    try {
      const exUser = await userService.isUser(profile._json.email);

      if (exUser) {
        done(null, exUser);
      } else {
        const res = {
          email: profile._json.email,
        };
        done(null, userEnum.GUEST, res);
      }
    } catch (error) {
      log.err(error);
      done(error);
    }
  }
);
export { login };
