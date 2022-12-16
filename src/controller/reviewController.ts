import { reviewService } from '../services';
import { AsyncRequestHandler } from '../types';
import { Request } from 'express';
import { RequestBody } from '../services/interfaces/interface';

interface reviewControllerInterface {
  getReview: AsyncRequestHandler;
  writeReview: AsyncRequestHandler;
}
export const reviewController: reviewControllerInterface = {
  async getReview(req, res) {
    const { userId } = req.body;
    const user = await reviewService.getReview(userId);
    res.json(user);
  },

  async writeReview(req, res) {
    const { userId, content } = req.body;
    const postId = parseInt(req.params.postId);
    const review = await reviewService.writeReview(userId, postId, content);
    res.json(review);
  },
};
