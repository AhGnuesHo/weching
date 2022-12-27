import { IAdviceModel, advice } from "../interfaces";
import { pg } from "../app";
import { QueryResult } from "pg";

export class AdviceModel implements IAdviceModel {
  async getAdvice(): Promise<advice> {
    const random: number = Math.floor(Math.random() * 104) + 1;
    const row = await pg.query("SELECT * FROM advice WHERE id=($1)", [random]);
    return row.rows[0];
  }
}

export const adviceModel = new AdviceModel();
