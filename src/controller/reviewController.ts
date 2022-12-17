import { reviewService } from '../services';
import { AsyncRequestHandler } from '../types';
import { plainToClass } from 'class-transformer';
import { review } from '../services/interfaces/interface';
interface reviewControllerInterface {
  getReview: AsyncRequestHandler;
  writeReview: AsyncRequestHandler;
}
export class Review implements review {
  postId: string;
  userId: number;
  content: string;
  constructor(postId: string, userId: number, content: string) {
    this.postId = postId;
    this.userId = userId;
    this.content = content;
  }
  get strToNumber(): number {
    const postId = parseInt(this.postId, 10);
    return postId;
  }
}

export class ReviewController implements reviewControllerInterface {
  getReview: AsyncRequestHandler = async (req, res) => {
    const { userId } = req.body;
    const user = await reviewService.getReview(userId);
    res.json(user);
  };

  writeReview: AsyncRequestHandler = async (req, res) => {
    const request: review = {
      postId: req.params.postId,
      userId: req.body.userId,
      content: req.body.content,
    };
    const review = plainToClass(Review, request);

    const result = await reviewService.writeReview(review);
    res.json(result);
  };
}

const reviewController = new ReviewController();
export { reviewController };
