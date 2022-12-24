import { user, IUserModel } from '../interfaces';
import { pg } from '../app';
import { QueryResult } from 'pg';
import { reviewModel } from './reviewModel';
import { reviewRouter } from '../routers/reviewRouter';
export class UserModel implements IUserModel {
  async createUser(user: user): Promise<user> {
    const { email, nickName } = user;
    const newUser = await pg.query(
      'INSERT INTO users ( email, nickname ) VALUES ($1, $2) RETURNING *',
      [email, nickName]
    );

    return newUser.rows[0];
  }
  async userInfo(id: number): Promise<user> {
    const info = await pg.query(
      'select *,(select count(*) from posts where user_id = ($1)) as post_count,(select count(*) from review  where user_id = ($1) ) as review_count from users where id =($1)',
      [id]
    );
    return info.rows[0];
  }
  // 다형성을 써보려고 했는데 코드가 좀 별로 인 것 같음
  async isUser(info: string | number): Promise<any> {
    if (typeof info === 'string') {
      let result = await pg.query(
        `select id, email, nickname, status, point  from users where email = $1 and status = 0`,
        [info]
      );
      return result.rows[0];
    } else if (typeof info === 'number') {
      let result = await pg.query(
        `select id, email, nickname, status, point  from users where id = $1 and status = 0`,
        [info]
      );
      return result.rows[0];
    }
  }

  async isNickName(nickName: string): Promise<Boolean> {
    const result = await pg.query('select * from users where nickname = $1', [
      nickName,
    ]);

    return result.rows.length >= 1;
  }

  async updatePoint(info: string | number, deduct: number): Promise<void> {
    const point = (await this.isUser(info)).point;

    // todo point가 문자열로 판단되어 계산오류 생김
    if (typeof point !== 'undefined') {
      // todo * 1 수정하기
      const rest = point * 1 + deduct;
      if (rest < 0) {
        throw new Error('lack of points ');
      }
      if (typeof info === 'string') {
        await pg.query(`update users set point = $1 where email = $2`, [
          rest,
          info,
        ]);
      } else if (typeof info === 'number') {
        await pg.query(`update users set point = $1 where id = $2`, [
          rest,
          info,
        ]);
      }
    }
  }

  async getAllUsersCount(): Promise<number> {
    const result = await pg.query(`select max(id) from users `);

    return result.rows[0];
  }

  async userStatusUpdate(id: number): Promise<user> {
    return await pg
      .query('UPDATE users SET status = 1 WHERE id=($1)', [id])
      .then(() => this.userInfo(id));
  }

  async userGrade(grade: number, reviewId: number): Promise<Boolean> {
    const review = await reviewModel.getReview(reviewId);
    const id = review.userId;
    const row = await pg.query(
      'UPDATE users SET grade =(grade +($1))WHERE id=($2)',
      [grade, id]
    );
    return row.rowCount === 1;
  }

  async updateAvg(avg: number, id: number): Promise<Boolean> {
    const formattedAvg = avg.toFixed(2);
    const update = await pg.query(
      `update users SET avg = $1 where id = (select user_id from review where id = $2)`,
      [formattedAvg, id]
    );
    return update.rowCount === 1;
  }

  async getGrade(id: number): Promise<number> {
    const grade = await pg.query(
      'SELECT grade FROM users WHERE id = (select user_id from review where id = $1)',
      [id]
    );
    return grade.rows[0].grade;
  }

  async updateNickname(nickName: string, userId: number): Promise<boolean> {
    const update = await pg.query(
      'UPDATE users SET nickname = $1 where id= $2',
      [nickName, userId]
    );
    return update.rowCount === 1;
  }
}

export const userModel = new UserModel();
