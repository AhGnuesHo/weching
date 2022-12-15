import { post } from '../services/interfaces/interface';
import { pg } from '../app';
import { QueryResult } from 'pg';
export class PostModel {
  async post(post: post): Promise<QueryResult<any>> {
    const { userId, content } = post;
    const newPost: QueryResult<any> = await pg.query(
      'INSERT INTO posts ( user_id, content ) VALUES ($1, $2) RETURNING *',
      [userId, content]
    );

    return newPost.rows[0];
  }
}

export const postModel = new PostModel();
