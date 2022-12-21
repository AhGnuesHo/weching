import { newPost, IReviewModel, review } from '../interfaces';
import { pg } from '../app';
import { Review } from '../controller/reviewController';

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
      `select id, content, status from review where post_id = $1`,
      [postId]
    );
    return reviews.rows;
  }

  async getReviewOne(id: number): Promise<review> {
    const review = await pg.query(`select user_id from review where id=($1)`, [
      id,
    ]);
    return review.rows[0].user_id;
  }

  async getDoneReviewCount(userId: number): Promise<number> {
    const count = await pg.query(
      `select count(*) from review where user_id = $1  and content is not null and is_done = 1 `,
      [userId]
    );
    return count.rows[0].count;
  }

  async isDone(id: number): Promise<Boolean> {
    const isDone = await pg.query(
      `update review set is_done = 1 where id = $1`,
      [id]
    );
    return isDone.rowCount === 1;
  }
}

export const reviewModel = new ReviewModel();
