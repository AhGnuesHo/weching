import { newPost, IReviewModel } from '../services/interfaces/interface';
import { pg } from '../app';

export class ReviewModel implements IReviewModel {
  async getReview(userId: number): Promise<newPost[]> {
    const todoReview = await pg.query(
      `select * from posts where id = (select post_id from review where user_id = $1)`,
      [userId]
    );
    return todoReview.rows;
  }
}

export const reviewModel = new ReviewModel();
