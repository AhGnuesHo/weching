import { reportService } from '../services';
import { AsyncRequestHandler } from '../types';

interface reportControllerInterface {
  createReport: AsyncRequestHandler;
  findReport: AsyncRequestHandler;
}

export const reportController: reportControllerInterface = {
  async createReport(req: any, res: any): Promise<any> {
    const { type, content } = req.body;
    const typeId = parseInt(req.params.reviewId);
    const report = await reportService.createReport(type, typeId, content);
    res.json(report);
  },

  async findReport(req: any, res: any): Promise<any> {
    const { page } = req.query;
    const { type } = req.query;
    const reportPage = parseInt(page);
    const reportType = String(type);
    const report = await reportService.findAll(reportPage);

    if (type !== undefined) {
      const findReportType = await reportService.findType(reportType, page);
      return res.json(findReportType);
    }

    res.json(report);
  },
};
