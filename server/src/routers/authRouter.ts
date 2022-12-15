import { Router } from 'express';
import passport from 'passport';
import { setUserToken } from '../utils/jwt';
import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { jwtSecret } from '../config';
import { userEnum } from '../services/interfaces/interface';

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
  (req: Request, res: Response, next: NextFunction) => {
    if (req.user === userEnum.GUEST) {
      res.status(400).json(req.user);
      return;
    }

    res.json(setUserToken(res, req.user));
  }
);
