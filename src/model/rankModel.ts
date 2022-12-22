import { IRankModel, rank } from '../interfaces';
import { pg } from '../app';

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
}

export const rankModel = new RanKModel();
