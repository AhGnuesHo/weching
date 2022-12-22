import { stringify } from 'querystring';
import { report, newReport } from '../interfaces';
import { reportService } from '../services';
import { AsyncRequestHandler } from '../types';
import { plainToClass } from 'class-transformer';
interface IreportController {
  createReport: AsyncRequestHandler;
  findReport: AsyncRequestHandler;
}

interface Query {
  page: number;
  type: number;
}

// type custom = (req: Request<{}, {}, {}, Query>, res: Response) => Promise<any>;

export class Report implements newReport {
  reviewId: string;
  type: string;
  typeId: number;
  content: string;
  constructor(reviewId: string, type: string, typeId: number, content: string) {
    this.reviewId = reviewId;
    this.type = type;
    this.typeId = typeId;
    this.content = content;
  }
  get strToNumber(): number {
    const reviewId = parseInt(this.reviewId);
    return reviewId;
  }
}

export class reportController implements IreportController {
  createReport: AsyncRequestHandler = async (req, res) => {
    const { type, content } = req.body;

    const reviewId: newReport = { reviewId: req.params.reviewId };

    const { typeId } = reviewId;
    const reviewTypeId = plainToClass(Report, typeId);
    const report = await reportService.createReport(
      type,
      reviewTypeId,
      content
    );
    res.json(report);
  };

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
  }
}
