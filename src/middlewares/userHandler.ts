import { Request, Response, NextFunction } from 'express';
import { log } from '../logger';
import { userModel } from '../model/userModel';
export async function checkEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const email = req.body.email;

  try {
    const isUser = await userModel.isUser(email);
    if (isUser) {
      log.warn(`email ${email} already exists`);
      res.status(400).send({ message: `email ${email} already exists` });
    }

    next();
  } catch (err) {
    next(err);
  }
}

export const userHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const nameState = req.body.nameState;
    if (!nameState) {
      log.warn(`중복 검사가 안된 닉네임`);
      res.status(400).send({ message: '중복검사해주세요' });
    }
    next();
  } catch (err) {
    next(err);
  }
};

export const checkName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const nickName = req.body.nickName;

    const isNickName = await userModel.isNickName(nickName);
    if (isNickName) {
      log.warn(`nickname ${nickName} already exists`);
      res.status(400).send({ message: ` ${nickName} is already exists` });
    }

    if (nickName.length > 12) {
      log.warn('nickName is too long');
      res.status(400).send({ message: ` nickName is too long` });
    }

    res.status(200).send({ message: ` ${nickName} is available` });
  } catch (err) {
    next(err);
  }
};
