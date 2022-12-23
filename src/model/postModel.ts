import { endPoint } from './../constants';
import {
  post,
  IPostModel,
  newPost,
  newPostAndTargetReview,
} from '../interfaces';
import { pg } from '../app';
import { Pool, PoolClient, QueryResult } from 'pg';
import { postService } from '../services/postService';
import { log } from '../logger';

export class PostModel implements IPostModel {
  async postingAndMatchingReview(post: post): Promise<newPostAndTargetReview> {
    const postingPg = await pg.connect();
    try {
      postingPg.query('begin');
      const posting = await this.posting(post, postingPg);
      await postingPg.query('commit');
      log.info('posting success : ' + post);
      
      const target = await postService.createReview();
      await this.createReview(target, posting.id as number);
      const result = {
        post: posting,
        target: target,
      };
      return result;
    } catch (err) {
      await postingPg.query('ROLLBACK');
      throw new Error(err + '아이디가 존재하지 않습니다');
    } finally {
      await postingPg.query('commit');
      postingPg.release();
    }
  }

  async posting(post: post, pool: PoolClient): Promise<newPost> {
    const { userId, content } = post;
    const newPost = await pool.query(
      'INSERT INTO posts ( user_id, content ) VALUES ($1, $2) RETURNING *',
      [userId, content]
    );

    return newPost.rows[0];
  }

  async getAllUsersCount(): Promise<number> {
    const result: QueryResult<any> = await pg.query(
      `select max(id) from users `
    );

    return result.rows[0].max;
  }

  async createReview(targetUser: number[], postId: number): Promise<void> {
    const reviewPool = await pg.connect();
    try {
      await Promise.all(
        targetUser.map(
          async (user) =>
            await reviewPool.query(
              `insert into review (user_id, post_id ) VALUES ($1, $2)`,
              [user, postId]
            )
        )
      );
    } catch (err) {
      await reviewPool.query('ROLLBACK');
      const newTarget = await postService.createReview();
      this.createReview(newTarget, postId);
      // throw new Error('리뷰 매칭 실패 ' + targetUser + '가 존재하지 않습니다');
    } finally {
      await reviewPool.query('commit');
      reviewPool.release();
    }
  }

  async getPosts(userId: number): Promise<newPost[]> {
    const getPost = await pg.query(`select * from posts where user_id = $1`, [
      userId,
    ]);
    return getPost.rows;
  }
}

export const postModel = new PostModel();
