import { reportModel } from '../model/reportModel';
import { IReportModel, newReport, report } from '../interfaces';

export class ReportService {
  constructor(private reportModel: IReportModel) {}

  //todo
  //report model 부터확인
  async createReport(
    type: string,
    typeId: newReport,
    content: string
  ): Promise<report> {
    return await reportModel.createReport(type, typeId, content);
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
