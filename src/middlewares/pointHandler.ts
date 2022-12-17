import { Request, Response, NextFunction } from 'express';
import { point } from '../services/interfaces/interface';
import { userModel } from '../model/userModel';
export async function checkPoint(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email } = req.body;
  try {
    const deduct = point.POST;
    const checkPoint = await userModel.hasPoint(email, deduct);
    if (!checkPoint) {
      throw new Error(`Invalid point`);
    }

    next();
  } catch (err) {
    next(err);
  }
}
