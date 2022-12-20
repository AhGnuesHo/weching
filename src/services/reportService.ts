import { reportModel } from '../model/reportModel';
import { IReportModel, report } from './interfaces/interface';

export class ReportService {
  constructor(private reportModel: IReportModel) {}

  async createReport(type: string, type_id: number, content: string) {
    return await reportModel.createReport(type, type_id, content);
  }

  async findAll(page: number) {
    return await reportModel.findAll(page);
  }

  async findType(type: string, page: number) {
    return await reportModel.findType(type, page);
  }
}

const reportService = new ReportService(reportModel);

export { reportService };
