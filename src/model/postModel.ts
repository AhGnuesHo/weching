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
import { PostDto } from '../dto';

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

  async posting(post: post, pool: PoolClient): Promise<PostDto> {
    const { userId, content } = post;
    const newPost = await pool.query(
      'INSERT INTO posts ( user_id, content ) VALUES ($1, $2) RETURNING *',
      [userId, content]
    );

    // todo 아직 역직렬화 제대로 안됨, db 필드는 user_id이고 dto는 userId라서
    // entity 라는 것을 따로 만들어서 사용해야하는 것인지..?
    return plainToInstance(PostDto, newPost.rows[0]);
  }

  async getAllUsersCount(): Promise<number> {
    const result = await pg.query(`select max(id) from users `);
    return result.rows[0].max;
  }

  async createReview(targetUser: number[], post: PostDto): Promise<void> {
    const reviewPool = await pg.connect();
    try {
      await Promise.all(
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

  async getPosts(userId: number): Promise<PostDto[]> {
    const getPost = await pg.query(
      `select * from posts where user_id = $1 order by id desc`,
      [userId]
    );

    return getPost.rows;
  }

  async getPost(userId: number, postId: number): Promise<newPost> {
    const getPost = await pg.query(
      `select * from posts where user_id = $1 and post_id = $2 order by id desc`,
      [userId, postId]
    );

    return getPost.rows[0];
  }
}

export const postModel = new PostModel();
