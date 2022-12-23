import { query } from 'express';
import { IRankModel, rank } from '../interfaces';
import { pg } from '../app';
import { userModel } from './userModel';
import { log } from '../logger';

export class RanKModel implements IRankModel {
  async getRank(): Promise<rank[]> {
    const ranking = await pg.query(
      'select  (ROW_NUMBER() OVER()) AS rank , best.id, best.avg FROM  ( SELECT  id, avg FROM users ORDER BY avg DESC ) as best LIMIT 10'
    );
    return ranking.rows;
  }

  async setNewRank(): Promise<void> {
    const newRank = await this.getRank();
    await Promise.all(
      newRank.map(
        async (rank) =>
          await pg.query(
            `insert into best (rank, month, user_id) values (${rank.rank}, select to_date(to_char(now(), 'yyyy-mm'),'yyyy-mm'), ${rank.id}) `
          )
      )
    );
    await this.updateCurrRank();
  }

  async updateCurrRank(): Promise<void> {
    const userRank = (await pg.query(`select id , grade  from users `)).rows;

    await Promise.all(
      userRank.map(
        async (rank) =>
          await pg.query(
            `insert into rank (user_id, month, grade) values (${rank.id}, select to_date(to_char(now(), 'yyyy-mm'),'yyyy-mm'), ${rank.grade}) `
          )
      )
    );
  }

  async resetRank(): Promise<void> {
    const allCount = (await pg.query('select count (*) from users')).rows[0];
    const poolClient = await pg.connect();
    try {
      await poolClient.query('begin');
      const updateCount = await poolClient.query(`update users set grade = 0 `);
      if (allCount !== updateCount.rowCount) {
        log.error(
          `업데이트 실패 : 전체 유저수 ${allCount}, 업데이트 유저수 : ${updateCount.rowCount}`
        );
        throw new Error(
          `업데이트 실패 : 전체 유저수 ${allCount}, 업데이트 유저수 : ${updateCount.rowCount}`
        );
      }
    } catch (e) {
      await poolClient.query('rollback');
      throw e;
    } finally {
      await poolClient.query('commit');
      poolClient.release();
    }
  }

  async getBest(): Promise<any> {
    const best = await pg.query(
      `select * from best where month = (select to_date(to_char(now(), 'yyyy-mm'),'yyyy-mm')) `
    );
    return best;
  }
}

export const rankModel = new RanKModel();
