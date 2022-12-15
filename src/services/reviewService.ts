import { reviewModel } from '../model/reviewModel';
import { IReviewModel, newPost } from './interfaces/interface';
export class ReviewService {
  constructor(private reviewModel: IReviewModel) {}

  async getReview(userId: number): Promise<newPost[]> {
    const todoReview = await reviewModel.getReview(userId);
    if (!todoReview) {
      throw new Error(`not Found userId : ${userId}`);
    }
    return todoReview;
  }
}

const reviewService = new ReviewService(reviewModel);

export { reviewService };
