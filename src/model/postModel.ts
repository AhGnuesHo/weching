import {
  post,
  IPostModel,
  newPost,
  review,
} from '../services/interfaces/interface';
import { pg } from '../app';
import { QueryResult } from 'pg';

export class PostModel implements IPostModel {
  async post(post: post): Promise<newPost> {
    const { userId, content } = post;
    const newPost: QueryResult<newPost> = await pg.query(
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
    await Promise.all(
      targetUser.map(
        async (user) =>
          await pg.query(
            `insert into review (user_id, post_id ) VALUES ($1, $2)`,
            [user, postId]
          )
      )
    );
  }

  async getPost(postId: number, userId: number): Promise<review> {
    const getPost = await pg.query(
      `select  * from posts p FULL OUTER JOIN
   review r on p.id = r.post_id where p.id =$1  and r.user_id = $2`,
      [postId, userId]
    );
    return getPost.rows[0];
  }
}

export const postModel = new PostModel();
