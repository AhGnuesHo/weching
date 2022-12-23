import { Router } from 'express';
import { reviewController } from '../controller';
import { asyncHandler } from '../utils';

export const reviewRouter = Router();

reviewRouter.get('/', asyncHandler(reviewController.getReview));
reviewRouter.patch(
  '/write/:postId',
  asyncHandler(reviewController.writeReview)
);
reviewRouter.patch('/:reviewId', asyncHandler(reviewController.gradeReview));
reviewRouter.patch(
  '/bookmark/:id',
  asyncHandler(reviewController.reviewBookmark)
);
reviewRouter.get('/bookmark', asyncHandler(reviewController.bookmark));
