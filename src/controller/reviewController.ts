import { reviewService } from '../services';
import { AsyncRequestHandler } from '../types';
import { Request } from 'express';
import { RequestBody } from '../services/interfaces/interface';
interface reviewControllerInterface {
  getReview: AsyncRequestHandler<Request<RequestBody>>;
}

export const reviewController: reviewControllerInterface = {
  async getReview(req, res) {
    const { userId } = req.body;
    const user = await reviewService.getReview(userId);
    res.json(user);
  },
};
