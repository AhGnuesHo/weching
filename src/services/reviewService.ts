import { reviewModel } from '../model/reviewModel';
import { IReviewModel, newPost, review } from './interfaces/interface';

export class ReviewService {
  constructor(private reviewModel: IReviewModel) {}

  async getReview(userId: number): Promise<newPost[]> {
    const todoReview = await reviewModel.getReview(userId);
    if (!todoReview) {
      throw new Error(`not Found userId : ${userId}`);
    }
    return todoReview;
  }

  async writeReview(request: review): Promise<newPost> {
    const { userId, content, postId } = request;
    return await reviewModel.writeReview(userId, postId as number, content);
  }
}

const reviewService = new ReviewService(reviewModel);

export { reviewService };
