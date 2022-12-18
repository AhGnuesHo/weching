import { reviewModel } from '../model/reviewModel';
import { IReviewModel, newPost, point, review } from '../interfaces';
import { userModel } from '../model';

export class ReviewService {
  constructor(private reviewModel: IReviewModel) {}

  async getReview(userId: number): Promise<newPost[]> {
    const todoReview = await reviewModel.todoReview(userId);
    if (!todoReview) {
      throw new Error(`not Found userId : ${userId}`);
    }
    return todoReview;
  }

  async writeReview(review: review): Promise<review> {
    const result = await reviewModel.writeReview(review);
    if (!result) {
      throw new Error(`칭찬 실패`);
    }
    const { userId } = review;
    await userModel.updatePoint(userId, point.REVIEW);

    return review;
  }
}

const reviewService = new ReviewService(reviewModel);

export { reviewService };
