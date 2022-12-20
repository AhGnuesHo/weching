import { Router } from 'express';
import { reportController } from '../controller';
import { asyncHandler } from '../utils';

export const reportRouter = Router();

reportRouter.post('/:reviewId', asyncHandler(reportController.createReport));
reportRouter.get('/', asyncHandler(reportController.findReport));
