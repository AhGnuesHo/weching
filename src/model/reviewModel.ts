import { newPost, IReviewModel, review } from '../interfaces';
import { pg } from '../app';

export class ReviewModel implements IReviewModel {
  async todoReview(userId: number): Promise<newPost[]> {
    const todoReview = await pg.query(
      `select id, content from posts where id in (select post_id from review where user_id = $1)`,
      [userId]
    );
    return todoReview.rows;
  }

  async writeReview(review: review): Promise<Boolean> {
    const { postId, userId, content } = review;
    const myReview = await pg.query(
      `update review set content = $1 where not content in ($1) and post_id = $2 and user_id = $3 `,
      [content, postId, userId]
    );
    return myReview.rowCount === 1;
  }

  async getReviewByPost(postId: number): Promise<review[]> {
    const reviews = await pg.query(
      `select id, content, grade, status from review where post_id = $1`,
      [postId]
    );
    return reviews.rows;
  }
}

export const reviewModel = new ReviewModel();
