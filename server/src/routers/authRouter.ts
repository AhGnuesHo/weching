import { Router } from 'express';
import passport from 'passport';
import { setUserToken } from '../utils/jwt';

export const authRouter = Router();

authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res, next) => {
    console.log(req);
    setUserToken(res, req.user);
    res.redirect('/');
  }
);
