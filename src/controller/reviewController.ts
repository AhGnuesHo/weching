import { reviewService } from '../services';
import { AsyncRequestHandler } from '../types';

interface reviewControllerInterface {
  getReview: AsyncRequestHandler;
}

export const reviewController: reviewControllerInterface = {
  async getReview(req: any, res: any): Promise<any> {
    const userId = req.body.userId;
    const user = await reviewService.getReview(userId);
    res.json(user);
  },
};
