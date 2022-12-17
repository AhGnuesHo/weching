import { user, IUserModel } from '../services/interfaces/interface';
import { pg } from '../app';

export class UserModel implements IUserModel {
  async createUser(user: user): Promise<user> {
    const { email, nickName } = user;
    const newUser = await pg.query(
      'INSERT INTO users ( email, nickname ) VALUES ($1, $2) RETURNING *',
      [email, nickName]
    );

    return newUser.rows[0];
  }

  async isUser(email: string): Promise<user> {
    const result = await pg.query(`select * from users where email = $1`, [
      email,
    ]);
    if (result.rows.length > 1) {
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
