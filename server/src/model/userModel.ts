import { userType } from '../services/interfaces/userInterface';
import { pg } from '../app';
import { QueryResult } from 'pg';
export class UserModel {
  async createUser(user: userType): Promise<void> {
    const { email, password, ranking, point } = user;
    pg.query(
      'INSERT INTO users ( email, password, ranking, point) VALUES ($1, $2,$3, $4) RETURNING *',
      [email, password, ranking, point],
      (error, results) => {
        if (error) {
          throw error;
        }

        console.log(`User added with ID: ${results.rows[0].id}`);
      }
    );
  }

  async isEmail(email: string): Promise<boolean> {
    const result: QueryResult<any> = await pg.query(
      `select * from users where email = $1`,
      [email]
    );
    return result.rows.length >= 1;
  }
}

export const userModel = new UserModel();
