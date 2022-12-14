import { Router } from 'express';
import passport from 'passport';
import { setUserToken } from '../utils/jwt';

export const authRouter = Router();

authRouter.get(
  '/google/login',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
  }),
  (req: any, res: any, next: any) => {
    console.log(req.users);

    if (typeof req.uses === 'string') {
      res.status(400).json(req.users);
    } else {
      setUserToken(res, req.user);
      res.redirect('/');
    }
  }
);
