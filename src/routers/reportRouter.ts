import { Router } from 'express';
import { reportController } from '../controller';
import { asyncHandler } from '../utils';
import { checkReport } from '../middlewares';

export const reportRouter = Router();

reportRouter.post(
  '/:reviewId',
  checkReport,
  asyncHandler(reportController.createReport)
);
reportRouter.get('/', reportController.findReport);
