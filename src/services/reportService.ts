import { reportModel } from '../model/reportModel';
import {
  IReportModel,
  newReport,
  report,
  pageNationReport,
} from '../interfaces';

export class ReportService {
  constructor(private reportModel: IReportModel) {}

  //todo
  //report model 부터확인
  async createReport(
    type: string,
    typeId: newReport,
    content: string
  ): Promise<newReport> {
    const isReport = await reportModel.findReport(typeId);
    if (isReport) {
      throw new Error('이미 신고된 리뷰 입니다.');
    }

    return await reportModel.createReport(type, typeId, content);
  }

  async findAll(page: number): Promise<pageNationReport> {
    const totalCount = await reportModel.countAll();
    const report = await reportModel.findAll(page);
    const totalPage = Math.ceil(totalCount / 10);
    const result = {
      totalPage: totalPage,
      currPage: page,
      report: report,
    };
    return result;
  }

  async findType(type: string, page: number): Promise<pageNationReport> {
    const typeCount = await reportModel.countType(type);
    const reportType = await reportModel.findType(type, page);
    const totalPage = Math.ceil(typeCount / 10);
    const result = {
      totalPage: totalPage,
      currPage: page,
      reportType: reportType,
    };
    return result;
  }
}

const reportService = new ReportService(reportModel);

export { reportService };
