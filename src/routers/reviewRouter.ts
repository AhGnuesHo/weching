import { Router } from 'express';
import { reviewController } from '../controller';
import { asyncHandler } from '../utils';

export const reviewRouter = Router();

reviewRouter.get('/', asyncHandler(reviewController.getReview));
reviewRouter.patch('/', asyncHandler(reviewController.writeReview));
reviewRouter.patch('/grade', asyncHandler(reviewController.gradeReview));
reviewRouter.patch('/bookmark', asyncHandler(reviewController.reviewBookmark));
reviewRouter.get('/bookmark', asyncHandler(reviewController.bookmark));
