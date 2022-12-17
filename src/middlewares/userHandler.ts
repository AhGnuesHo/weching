import { Request, Response, NextFunction } from 'express';

import { userModel } from '../model/userModel';
export async function userHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const email = req.body.email;
  const nickName = req.body.nickName;
  try {
    const isUser = await userModel.isUser(email);
    if (isUser) {
      throw new Error(`email ${email} already exists`);
    }
    const isNickName = await userModel.isNickName(nickName);
    if (isNickName) {
      throw new Error(`nickname ${nickName} already exists`);
    }

    if (nickName.length > 15) {
      throw new Error('nickName is too long');
    }
    next();
  } catch (err) {
    next(err);
  }
}
