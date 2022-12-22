import { reviewModel } from '../model/reviewModel';
import { IReviewModel, newPost, point, review, grade } from '../interfaces';
import { userModel, postModel } from '../model';
import { log } from '../logger';
import { userService } from './userService';

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

  async gradeReview(
    grade: number,
    reviewId: number,
    userId: number
  ): Promise<grade> {
    const isDone = await reviewModel.isDone(reviewId, userId);
    if (!isDone) {
      log.error('평가 실패 : 평가 미완료');
      throw new Error('평가 실패 : 평가 미완료');
    }
    return await userService.userGradeUpdate(grade, reviewId);
  }
}

const reviewService = new ReviewService(reviewModel);

export { reviewService };
