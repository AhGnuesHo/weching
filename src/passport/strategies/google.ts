const GoogleStrategy = require("passport-google-oauth20").Strategy;
import { clientID, clientSecret } from "../../config";
import { userService } from "../../services/userService";
import { userEnum } from "../../interfaces";
import { log } from "../../logger";
const config = {
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: "auth/google/callback",
  scope: ["profile", "email"],
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
