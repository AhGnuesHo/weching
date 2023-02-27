import { plainToInstance } from "class-transformer";
import { user, IUserModel } from "../interfaces";
import { pg } from "../app";
import { reviewModel } from "./reviewModel";
import { log } from "../logger";
import { UserDto, UserEntity } from "../dto";
export class UserModel implements IUserModel {
  async createUser(user: user): Promise<user> {
    const { email, nickName } = user;
    const newUser = await pg.query(
      "INSERT INTO users ( email, nickname ) VALUES ($1, $2) RETURNING *",
      [email, nickName]
    );

    return newUser.rows[0];
  }

  async userInfo(id: number): Promise<UserEntity> {
    const info = await pg.query(
      "select *, (select count(content) from posts where user_id = ($1)) as post_count,(select count(content) from review  where user_id = ($1) ) as review_count from users where id =($1)",
      [id]
    );

    return plainToInstance(UserEntity, info.rows[0]);
  }

  async rankInfo(id: number): Promise<any> {
    const info = await pg.query(`select distinct * from rank where user_id = $1`, [id]);
    return info.rows;
  }

  // 다형성을 써보려고 했는데 코드가 좀 별로 인 것 같습니다 !
  async isUser(info: string | number): Promise<UserEntity> {
    let query = "";
    if (typeof info === "string") {
      query = "select *  from users where email = $1 and status != 1 ";
    } else if (typeof info === "number") {
      query = "select *  from users where id = $1 and status != 1";
    }

    let result = await pg.query(query, [info]);

    return plainToInstance(UserEntity, result.rows[0]);
  }

  async isNickName(nickName: string): Promise<Boolean> {
    const result = await pg.query("select * from users where nickname = $1", [
      nickName,
    ]);

    return result.rows.length >= 1;
  }

  async updatePoint(info: string | number, deduct: number): Promise<void> {
    const user = await this.isUser(info);

    const rest = user.point + deduct;
    if (rest < 0) {
      log.error(`${user} 포인트 모자람 현재 포인트 : ${user.point}`);
      throw new Error("포인트 모자랍니다 !");
    }

    if (typeof info === "string") {
      await pg.query(`update users set point = $1 where email = $2`, [
        rest,
        info,
      ]);
    } else if (typeof info === "number") {
      await pg.query(`update users set point = $1 where id = $2`, [rest, info]);
    }
  }

  async getAllUsersCount(): Promise<number> {
    const result = await pg.query(`select max(id) from users `);

    return result.rows[0];
  }

  async userStatusUpdate(id: number): Promise<user> {
    return await pg
      .query("UPDATE users SET status = 1 WHERE id=($1) and status = 0", [id])
      .then((res) => {
        if (res.rowCount === 0) {
          throw new Error("이미 탈퇴 처리 된 회원입니다.");
        }

        return this.userInfo(id);
      });
  }

  async userGrade(grade: number, reviewId: number): Promise<Boolean> {
    const review = await reviewModel.getReview(reviewId);
    const id = review.userId;
    const row = await pg.query(
      "UPDATE users SET grade =(grade +($1))WHERE id=($2)",
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
      "SELECT grade FROM users WHERE id = (select user_id from review where id = $1)",
      [id]
    );

    return grade.rows[0].grade;
  }

  async updateNickname(nickName: string, userId: number): Promise<boolean> {
    const update = await pg.query(
      "UPDATE users SET nickname = $1 where id= $2",
      [nickName, userId]
    );

    return update.rowCount === 1;
  }
}

export const userModel = new UserModel();
