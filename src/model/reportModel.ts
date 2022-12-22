import { report, IReportModel, newReport } from '../interfaces';
import { pg } from '../app';

export class ReportModel implements IReportModel {
  async createReport(
    type: string,
    type_id: newReport,
    content: string
  ): Promise<newReport> {
    const row = await pg.query(
      `INSERT INTO report(type,type_id,content) VALUES ($1,$2,$3)RETURNING *`,
      [type, type_id, content]
    );
    return row.rows[0];
  }

  async findAll(page: number): Promise<newReport[]> {
    const row = await pg.query(
      `SELECT * FROM report order BY id desc limit 10 offset (($1)-1)*10`,
      [page]
    );
    return row.rows;
  }

  async findType(type: string, page: number): Promise<newReport[]> {
    const row = await pg.query(
      `SELECT * FROM report WHERE type = ($1) order BY id desc limit 10 offset (($2)-1)*10`,
      [type, page]
    );
    return row.rows;
  }

  async countAll(): Promise<number> {
    return (await pg.query(`SELECT count(*) FROM report`)).rows[0].count;
  }

  async countType(type: string): Promise<number> {
    return (
      await pg.query(`select count(*)from report where type =($1)`, [type])
    ).rows[0].count;
  }
}
const reportModel = new ReportModel();
export { reportModel };
