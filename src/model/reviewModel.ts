import { ReviewEntity } from "./../dto/reviewDto";
import { plainToInstance } from "class-transformer";
import { newPost, IReviewModel, review, user, newReview } from "../interfaces";
import { pg } from "../app";
import { query } from "../types";
import { PostEntity } from "../dto";
export class ReviewModel implements IReviewModel {
  async todoReview(userId: number): Promise<PostEntity[]> {
    const todoReview = await pg.query(
      `select * from posts where id in (select post_id from review where user_id = $1) order by id desc`,
      [userId]
    );
    return plainToInstance(PostEntity, todoReview.rows);
  }

  async writeReview(review: review): Promise<Boolean> {
    const { postId, userId, content } = review;
    const myReview = await pg.query(
      `update review set content = $1, month = ${query.MONTH} where post_id = $2 and user_id = $3 and content is null `,
      [content, postId, userId]
    );

    return myReview.rowCount === 1;
  }

  async getReviewByPost(postId: number): Promise<ReviewEntity[]> {
    const reviews = await pg.query(
      `select id, content, status from review where post_id = $1 and content is not null`,
      [postId]
    );

    return plainToInstance(ReviewEntity, reviews.rows);
  }

  async getReview(id: number): Promise<ReviewEntity> {
    const review = await pg.query(`select * from review where id=($1)`, [id]);

    return plainToInstance(ReviewEntity, review.rows[0]);
  }

  async getDoneReviewCountThisMonth(reviewId: number): Promise<number> {
    const count = await pg.query(
      `select count(content) from review where user_id = (select user_id from review where id = $1) 
      and content is not null and is_done = 1 and month = ${query.MONTH}`,
      [reviewId]
    );

    return count.rows[0].count;
  }

  async getPostInfoByReviewId(reviewId: number): Promise<newPost> {
    const post = await pg.query(
      "select * from posts where id = (select post_id from review where id = $1)",
      [reviewId]
    );

    return post.rows[0];
  }

  async isDone(id: number): Promise<Boolean> {
    const isDone = await pg.query(
      `update review set is_done = 1 where id = $1 and is_done = 0`,
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

  async reviewBookmark(id: number): Promise<Boolean> {
    const reviewStatus = await pg.query(
      `SELECT bookmark FROM review WHERE id= ($1)`,
      [id]
    );
    let status = reviewStatus.rows[0].bookmark ? false : true;

    const reviewBookmark = await pg.query(
      `UPDATE review SET bookmark = ($1) where id = ($2)`,
      [status, id]
    );

    return reviewBookmark.rowCount === 1;
  }

  async bookmark(userId: number): Promise<newReview[]> {
    const myBookmark = await pg.query(
      `select * from review  where bookmark = true and post_id in ( select id  from posts  where user_id =($1))`,
      [userId]
    );
    return myBookmark.rows;
  }
}

export const reviewModel = new ReviewModel();
