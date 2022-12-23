import { newPost, IReviewModel, review, user } from '../interfaces';
import { pg } from '../app';
import { Review } from '../controller/reviewController';
import { log } from '../logger';

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
      `update review set content = $1, month = (select to_date(to_char(now(), 'yyyy-mm'),'yyyy-mm')) where post_id = $2 and user_id = $3 `,
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

  async getDoneReviewCountThisMonth(reviewId: number): Promise<number> {
    const count = await pg.query(
      `select count(*) from review where user_id = (select user_id from review where id = $1) 
      and content is not null and is_done = 1 and month = (select to_date(to_char(now(), 'yyyy-mm'),'yyyy-mm'))`,
      [reviewId]
    );
    return count.rows[0].count;
  }
  async getPostInfoByReviewId(reviewId: number): Promise<number> {
    // Promise<newPost>
    const post = await pg.query(
      'select * from posts where id = (select post_id from review where id = $1) ',
      [reviewId]
    );
    // 직렬화 해주기
    // return post.rows[0];
    return post.rows[0].user_id;
  }
  async isDone(id: number, userId: number): Promise<Boolean> {
    const postOwner = await this.getPostInfoByReviewId(id);
    // 쿼리 결과 어떻게 직렬화 하지?
    if (userId !== postOwner) {
      log.error('is not owner');
      throw new Error('본인의 게시글에만 평가를 남길 수 있습니다.');
    }
    const isDone = await pg.query(
      `update review set is_done = 1 where id = $1`,
      [id]
    );
    return isDone.rowCount === 1;
  }

  async getReviewWriter(reviewId: number): Promise<user> {
    const user = await pg.query(
      `select * from users where id = (select user_id from review where id = $1)`,
      [reviewId]
    );
    return user.rows[0];
  }
}

export const reviewModel = new ReviewModel();
