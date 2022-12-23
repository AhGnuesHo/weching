import { newPost, IReviewModel, review, user, newReview } from '../interfaces';
import { pg } from '../app';
import { log } from '../logger';

export class ReviewModel implements IReviewModel {
  async todoReview(userId: number): Promise<newPost[]> {
    const todoReview = await pg.query(
      `select id, content from posts where id in (select post_id from review where user_id = $1) order by id desc`,
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
      `select id, content, status from review where post_id = $1 and content is not null`,
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
  async getPostInfoByReviewId(reviewId: number): Promise<newPost> {
    // Promise<newPost>
    const post = await pg.query(
      'select * from posts where id = (select post_id from review where id = $1)',
      [reviewId]
    );
    // 직렬화 해주기
    return post.rows[0];
  }
  async isDone(id: number, userId: number): Promise<Boolean> {
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
    const post_Id = await pg.query(
      `select id  from posts  where user_id = ($1)`,
      [userId]
    );

    const post = post_Id.rows;
    const postId: number[] = [];
    post.map((item) => {
      const { id } = item;
      postId.push(id);
    });

    const bookmarkReview: any[] = await Promise.all(
      postId.map(async (id) => {
        const bookmark = await pg.query(
          `select * from review  where bookmark = true and post_id = ($1)`,
          [id]
        );

        if (bookmark.rowCount !== 0) {
          return bookmark.rows;
        }
      })
    );
    const myBookmark: any[] = bookmarkReview.filter((bookmark) => {
      return bookmark !== undefined || null;
    });

    return myBookmark;
  }
}
export const reviewModel = new ReviewModel();
