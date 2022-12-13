const GoogleStrategy = require('passport-google-oauth20').Strategy;
import { clientID, clientSecret } from '../../config';
const config = {
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: '/auth/google/callback',
};

const google = new GoogleStrategy(
  config,
  async (accessToken: any, refreshToken: any, profile: any, done: any) => {
    const { email, name } = profile._json;
    console.log(name);
  }
);
export { google };
// async function findOrCreateUser({ name, email }: any) {
//   const user = await User.findOne({
//     email,
//   });

//   if (user) {
//     return user;
//   }

//   const created = await User.create({
//     name,
//     email,
//     password: 'GOOGLE_OAUTH',
//   });

//   return created;
// }

// try {
//   const user = await findOrCreateUser({ email, name });
//   done(null, {
//     shortId: user.shortId,
//     email: user.email,
//     name: user.name,
//   });
// } catch (e) {
//   done(e, null);
// }
