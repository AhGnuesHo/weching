import { user } from '../services/interfaces/interface';
import { pg } from '../app';
import { QueryResult } from 'pg';
export class UserModel {
  async createUser(user: user): Promise<QueryResult<any>> {
    const { email, nickName, birthday } = user;
    const newUser: QueryResult<any> = await pg.query(
      'INSERT INTO users ( email, nickname , birthday) VALUES ($1, $2,$3) RETURNING *',
      [email, nickName, birthday]
    );

    return newUser.rows[0];
  }

  async isUser(email: string): Promise<QueryResult<any>> {
    const result: QueryResult<any> = await pg.query(
      `select * from users where email = $1`,
      [email]
    );
    if (result.rows.length === 1) {
      throw new Error(`user ${result.rows.length} is already`);
    }
    return result.rows[0];
  }
}

export const userModel = new UserModel();

// db 인덱스 메모리 영역에 저장됨 
// radis, 인메모리 같은거
// 빠름, 근데 비쌈 
// B-tree 구조 