import { IAdviceModel, advice } from "../interfaces";
import { pg } from "../app";
import { QueryResult } from "pg";

export class AdviceModel implements IAdviceModel {
  async getAdvice(): Promise<advice> {
    const row = await pg.query(
      "SELECT * FROM advice order by random() limit 1"
    );
    return row.rows[0];
  }
}

export const adviceModel = new AdviceModel();
