import {
  newPost,
  IReviewModel,
  review,
} from '../interfaces';
import { pg } from '../app';

export class ReviewModel implements IReviewModel {
  async getReview(userId: number): Promise<newPost[]> {
    const todoReview = await pg.query(
      `select * from posts where id in (select post_id from review where user_id = $1)`,
      [userId]
    );
    return todoReview.rows;
  }

  async writeReview(review: review): Promise<newPost> {
    const { postId, userId, content } = review;
    const myReview = await pg.query(
      `update review set content = $1 where post_id = $2 and user_id = $3`,
      [content, postId, userId]
    );
    return myReview.rows[0];
  }
}

export const reviewModel = new ReviewModel();
