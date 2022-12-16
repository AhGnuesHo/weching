import { user, IUserModel } from '../services/interfaces/interface';
import { pg } from '../app';
import { QueryResult } from 'pg';
export class UserModel implements IUserModel {
  async createUser(user: user): Promise<QueryResult<any>> {
    const { email, nickName } = user;
    const newUser: QueryResult<any> = await pg.query(
      'INSERT INTO users ( email, nickname ) VALUES ($1, $2) RETURNING *',
      [email, nickName]
    );

    return newUser.rows[0];
  }

  async isUser(email: string): Promise<QueryResult<any>> {
    const result: QueryResult<any> = await pg.query(
      `select * from users where email = $1`,
      [email]
    );
    if (result.rows.length > 1) {
      throw new Error(`user ${result.rows.length} is already`);
    }
    return result.rows[0];
  }

  async getAllUsersCount(): Promise<QueryResult<any>> {
    const result: QueryResult<any> = await pg.query(
      `select max(id) from users `
    );
    return result.rows[0];
  }

  async findUser(id: number): Promise<user[]> {
    const row = await pg.query('SELECT * FROM users WHERE id=($1)', [id]);
    return row.rows;
  }

  // async userStatusUpdate(status: number, id: number): Promise<user[]> {
  //   await pg.query('UPDATE users SET status = ($1) WHERE id=($2)', [
  //     status,
  //     id,
  //   ]).then(()=>this.);
  // }
}

export const userModel = new UserModel();

// db 인덱스 메모리 영역에 저장됨
// radis, 인메모리 같은거
// 빠름, 근데 비쌈
// B-tree 구조
