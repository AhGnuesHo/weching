import { Request, Response, NextFunction } from 'express';
import { point } from '../interfaces';
import { userModel } from '../model/userModel';
export async function checkPoint(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email } = req.body;
  try {
    const deduct = point.POST;
    await userModel.updatePoint(email, deduct);

    next();
  } catch (err) {
    next(err);
  }
}
