import { user } from '../services/interfaces/userInterface';
import { pg } from '../app';
import { QueryResult } from 'pg';
export class UserModel {
  async createUser(user: user): Promise<QueryResult<any>> {
    const { email, nickName, birthday, point } = user;
    const newUser: QueryResult<any> = await pg.query(
      'INSERT INTO users ( email, nickname , birthday, point) VALUES ($1, $2,$3, $4) RETURNING *',
      [email, nickName, birthday, point]
    );

    return newUser.rows[0];
  }

  async isUser(email: string): Promise<boolean> {
    const result: QueryResult<any> = await pg.query(
      `select * from users where email = $1`,
      [email]
    );
    return result.rows.length >= 1;
  }
}

export const userModel = new UserModel();
