import { reviewModel } from '../model/reviewModel';
import { IReviewModel, newPost, review } from '../interfaces';

export class ReviewService {
  constructor(private reviewModel: IReviewModel) {}

  async getReview(userId: number): Promise<newPost[]> {
    const todoReview = await reviewModel.getReview(userId);
    if (!todoReview) {
      throw new Error(`not Found userId : ${userId}`);
    }
    return todoReview;
  }

  async writeReview(review: review): Promise<newPost> {
    return await reviewModel.writeReview(review);
  }
}

const reviewService = new ReviewService(reviewModel);

export { reviewService };
