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

  async writeReview(
    userId: number,
    postId: number,
    content: string
  ): Promise<newPost> {
    const review = await pg.query(
      `update review set content = $1 where post_id = $2 and user_id = $3`,
      [content, postId, userId]
    );
    return review.rows[0];
  }
}

export const reviewModel = new ReviewModel();
