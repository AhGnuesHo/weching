import { Request, Response, NextFunction } from 'express';
import { log } from '../logger';
import { userModel } from '../model/userModel';
export async function checkEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email } = req.body;

  try {
    const isUser = await userModel.isUser(email);
    if (isUser) {
      log.warn(`${email}은 사용 중인 이메일 입니다.`);
      res
        .status(400)
        .send({ state: false, message: `${email}은 사용 중인 이메일 입니다.` });
      return;
    }

    next();
  } catch (err) {
    next(err);
  }
}
export const expireUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status } = req.body;
    if (status !== 0) {
      res.status(400).send({ message: `탈퇴한 회원입니다.` });
      return;
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
    const { nickName } = req.body;

    const isNickName = await userModel.isNickName(nickName);

    if (isNickName) {
      log.warn(`${nickName} 은(는) 존재하는 닉네임입니다. `);
      res.status(400).json({
        state: false,
        message: `${nickName}은 존재하는 닉네임 입니다.`,
      });
      return;
    }

    if (nickName.length > 12) {
      log.warn('닉네임 너무 길다 :' + nickName.Length);
      res
        .status(400)
        .json({ state: false, message: `닉네임은 12자까지 가능합니다` });
      return;
    }
    req.body.nameState = true;
    next();
  } catch (err) {
    next(err);
  }
};

export const updateHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { nameState } = req.body;
    if (!nameState) {
      res.status(400).send({ message: '중복 검사 해주세요' });
      return;
    }

    next();
  } catch (err) {
    next(err);
  }
};
