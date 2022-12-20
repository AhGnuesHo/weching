import { Request, Response, NextFunction } from 'express';
import { log } from '../logger';
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
      log.warn(`email ${email} already exists`);
      throw new Error(`email ${email} already exists`);
    }
    const isNickName = await userModel.isNickName(nickName);
    if (isNickName) {
      log.warn(`nickname ${nickName} already exists`);
      throw new Error(`nickname ${nickName} already exists`);
    }

    if (nickName.length > 12) {
      log.warn('nickName is too long');
      throw new Error('nickName is too long');
    }
    next();
  } catch (err) {
    next(err);
  }
}
