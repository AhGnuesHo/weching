import { IRankModel, rank } from "../interfaces";
import { pg } from "../app";
import { log } from "../logger";
import { query } from "../types";
import { PoolClient } from "pg";
export class RankModel implements IRankModel {
  // 해당 월을 구하는 쿼리를 계속 수행하기보다 thisMonth함수에서 이번 달을 구하고, 필요한 곳에서 쓰려고 하는데
  // 에러가 나서 쓰지 못하고 있습니다 어떻게 개선해야할까요?
  async thisMonth(): Promise<Date> {
    return await (
      await pg.query(query.MONTH)
    ).rows[0];
  }

  async getRank(rankPg: PoolClient): Promise<rank[]> {
    const ranking = await rankPg.query(
      "select (ROW_NUMBER() OVER()) AS rank , best.id, best.avg FROM  ( select * FROM users where  avg is not null and status = 0 ORDER BY avg desc ) as best LIMIT 10"
    );
    return ranking.rows;
  }

  async setNewRank(): Promise<void> {
    const rankPg = await pg.connect();
    try {
      rankPg.query("begin");
      const newRank = await this.getRank(rankPg);

      await Promise.all(
        newRank.map((rank) =>
          rankPg.query(
            `insert into best (rank, month, user_id) values (${rank.rank}, ${query.MONTH}, ${rank.id}) `
          )
        )
      );
      await this.updateCurrRank(rankPg);
    } catch (err) {
      await rankPg.query("rollback");
      throw err;
    } finally {
      await rankPg.query("commit");
      rankPg.release();
    }
  }
  async updateCurrRank(rankPg: PoolClient): Promise<void> {
    const userRank = (await rankPg.query(`select id, grade from users`)).rows;

    const thisMonth = await this.thisMonth();

    await Promise.all(
      userRank.map((rank) =>
        rankPg.query(
          `insert into rank (user_id, month, grade) values (${rank.id},${query.MONTH} , ${rank.grade}) `
        )
      )
    );
  }

  async resetRank(): Promise<void> {
    const allCount = (await pg.query("select count (*) from users")).rows[0];
    const poolClient = await pg.connect();
    try {
      await poolClient.query("begin");

      const updateCount = await poolClient.query(`update users set grade = 0 `);

      if (allCount.count != updateCount.rowCount) {
        throw new Error(
          `업데이트 실패 : 전체 유저수 ${allCount.count}, 업데이트 유저수 : ${updateCount.rowCount}`
        );
      }
    } catch (e) {
      await poolClient.query("rollback");
      throw e;
    } finally {
      await poolClient.query("commit");
      poolClient.release();
    }
  }

  async getBest(): Promise<rank[]> {
    const thisMonth = await this.thisMonth();
    const best = await pg.query(
      `select  ranker.rank, ranker.user_id, users.nickname, users.grade , users.avg
    from 
    (select user_id, rank from best where month = ${query.MONTH})
    as ranker
    join users as users
    on ranker.user_id = users.id
    order by ranker.rank `
    );
    return best.rows;
  }
}

export const rankModel = new RankModel();
