import { report, IReportModel } from '../services/interfaces/interface';
import { pg } from '../app';

export class ReportModel implements IReportModel {
  async createReport(
    type: string,
    type_id: number,
    content: string
  ): Promise<report> {
    const row = await pg.query(
      `INSERT INTO report(type,type_id,content) VALUES ($1,$2,$3)RETURNING *`,
      [type, type_id, content]
    );
    return row.rows[0];
  }

  async findAll(page: number): Promise<report[]> {
    const row = await pg.query(
      `SELECT * FROM report limit 10 offset (($1)-1)*10`,
      [page]
    );
    return row.rows;
  }

  async findType(type: string, page: number): Promise<report[]> {
    const row = await pg.query(
      `SELECT * FROM report WHERE type = ($1) limit 10 offset (($2)-1)*10`,
      [type, page]
    );
    return row.rows;
  }
}

const reportModel = new ReportModel();
export { reportModel };
