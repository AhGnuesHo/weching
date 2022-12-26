import {
  post,
  IPostModel,
  newPost,
  newPostAndTargetReview,
} from '../interfaces';
import { pg } from '../app';
import { PoolClient } from 'pg';
import { postService } from '../services/postService';
import { log } from '../logger';
import { plainToInstance } from 'class-transformer';
import { PostEntity } from '../dto';

export class PostModel implements IPostModel {
  async postingAndMatchingReview(post: post): Promise<newPostAndTargetReview> {
    const postingPg = await pg.connect();
    try {
      postingPg.query('begin');
      const posting = await this.posting(post, postingPg);
      await postingPg.query('commit');
      log.info('posting success : ' + post);

      const target = await postService.createReview(post.userId);
      await this.createReview(target, posting);

      const result = {
        post: posting,
        target: target,
      };

      return result;
    } catch (err) {
      await postingPg.query('rollback');
      throw new Error(err + '아이디가 존재하지 않습니다');
    } finally {
      await postingPg.query('commit');
      postingPg.release();
    }
  }

  async posting(post: post, pool: PoolClient): Promise<PostEntity> {
    const { userId, content } = post;
    const newPost = await pool.query(
      'INSERT INTO posts ( user_id, content ) VALUES ($1, $2) RETURNING *',
      [userId, content]
    );

    return plainToInstance(PostEntity, newPost.rows[0]);
  }

  async getAllUsersCount(): Promise<number> {
    const result = await pg.query(`select max(id) from users `);
    return result.rows[0].max;
  }

  async createReview(targetUser: number[], post: PostEntity): Promise<void> {
    const reviewPool = await pg.connect();
    try {
      await Promise.allSettled(
        targetUser.map(
          async (user) =>
            await reviewPool.query(
              `insert into review (user_id, post_id ) VALUES ($1, $2)`,
              [user, post.id]
            )
        )
      );
    } catch (err) {
      await reviewPool.query('rollback');
      const newTarget = await postService.createReview(post.userId);
      this.createReview(newTarget, post);
    } finally {
      await reviewPool.query('commit');
      reviewPool.release();
    }
  }

  async getPosts(userId: number): Promise<PostEntity[]> {
    const getPost = await pg.query(
      `select * from posts where user_id = $1 order by id desc`,
      [userId]
    );

    return plainToInstance(PostEntity, getPost.rows);
  }

  async getPost(userId: number, postId: number): Promise<PostEntity> {
    const getPost = await pg.query(
      `select * from posts where user_id = $1 and id = $2 order by id desc`,
      [userId, postId]
    );

    return plainToInstance(PostEntity, getPost.rows[0]);
  }

  async hasNewReview(postId: number, check: number): Promise<void> {
    await pg.query(`update posts set is_checked = ${check} where id = $1 `, [
      postId,
    ]);
  }
}

export const postModel = new PostModel();
