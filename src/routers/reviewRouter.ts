import { Router } from 'express';
import { reviewController } from '../controller';
import { asyncHandler } from '../utils';

export const reviewRouter = Router();

reviewRouter.get('/', asyncHandler(reviewController.getReview));
