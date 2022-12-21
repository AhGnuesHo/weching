import { IRankModel } from '../interfaces';
import { pg } from '../app';

export class RanKModel implements IRankModel {
  async getRank(): Promise<void> {
    await pg.query('update rank set elevation = 0 ');
  }
}

export const rankModel = new RanKModel();
