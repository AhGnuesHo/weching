import { Request, Response, NextFunction } from 'express';
import { log } from '../logger';
import { reportModel } from '../model/reportModel';
import { newReport } from '../interfaces';
import { reviewRouter } from '../routers/reviewRouter';

export async function checkReport(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { reviewId } = req.params;

  const typeId = parseInt(reviewId);
  try {
    const isReport = await reportModel.findReport(typeId);
    if (isReport) {
      log.warn(`이미 신고한 리뷰 입니다.`);
      res
        .status(400)
        .send({ state: false, message: `이미 신고한 리뷰 입니다.` });
      return;
    }
    next();
  } catch (err) {
    next(err);
  }
}
