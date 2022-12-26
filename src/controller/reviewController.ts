import { reviewService } from '../services';
import { AsyncRequestHandler } from '../types';

interface reviewControllerInterface {
  getReview: AsyncRequestHandler;
  writeReview: AsyncRequestHandler;
  gradeReview: AsyncRequestHandler;
  bookmark: AsyncRequestHandler;
}

export class ReviewController implements reviewControllerInterface {
  getReview: AsyncRequestHandler = async (req, res) => {
    const { userId } = req.body;
    const user = await reviewService.getReview(userId);
    res.json(user);
  };

  writeReview: AsyncRequestHandler = async (req, res) => {
    const review = req.body;
    const result = await reviewService.writeReview(review);
    res.json(result);
  };

  gradeReview: AsyncRequestHandler = async (req, res) => {
    const { grade, id, userId } = req.body;
    const result = await reviewService.gradeReview(grade, id, userId);
    res.json(result);
  };

  reviewBookmark: AsyncRequestHandler = async (req, res) => {
    const reviewBookmark = await reviewService.reviewBookmark(req.body.id);
    res.json(reviewBookmark);
  };

  bookmark: AsyncRequestHandler = async (req, res) => {
    const { userId } = req.body;
    const result = await reviewService.bookmark(userId);
    res.json(result);
  };
}

const reviewController = new ReviewController();
export { reviewController };
