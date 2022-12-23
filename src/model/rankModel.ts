import { IRankModel, rank } from '../interfaces';
import { pg } from '../app';
import { userModel } from './userModel';
import { log } from '../logger';

export class RanKModel implements IRankModel {
  async getRank(): Promise<rank[]> {
    const ranking = await pg.query(
      'select best.id, best.avg FROM  ( SELECT  id, avg FROM users ORDER BY avg DESC ) as best LIMIT 5'
    );
    return ranking.rows;
  }

  async setNewRank(): Promise<void> {
    const newRank = await this.getRank();
    await Promise.all(
      newRank.map(
        async (rank) =>
          await pg.query(`insert into best values (now(), ${rank.id}) `)
      )
    );
  }
  // async updateCurrRank(): Promise<Boolean> {
  //   await pg.query(``);
  // }

  async resetRank(): Promise<void> {
    const allCount = await userModel.getAllUsersCount();
    try {
      const poolClient = await pg.connect();
      await poolClient.query('begin');
      const updateCount = await poolClient.query(`update users set rank = 0 `);
      if (allCount !== updateCount.rowCount) {
        log.error(
          `업데이트 실패 : 전체 유저수 ${allCount}, 업데이트 유저수 : ${updateCount.rowCount}`
        );
        throw new Error(
          `업데이트 실패 : 전체 유저수 ${allCount}, 업데이트 유저수 : ${updateCount.rowCount}`
        );
      }
    } catch (e) {
    } finally {
    }
  }
}

export const rankModel = new RanKModel();
