import { report, newReport } from '../interfaces';
import { reportService } from '../services';
import { AsyncRequestHandler } from '../types';
import { plainToClass } from 'class-transformer';
import { Request, Response, NextFunction, query } from 'express';
import { nextTick } from 'process';

interface Query {
  page: number;
  type: string;
}
type custom = (
  req: Request<{}, {}, {}, Query>,
  res: Response,
  next: NextFunction
) => Promise<any>;
interface IReportController {
  createReport: AsyncRequestHandler;
  findReport: custom;
}

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

export class ReportController implements IReportController {
  createReport: AsyncRequestHandler = async (req, res) => {
    const { type, content } = req.body;
    const typeId: newReport = { reviewId: req.params.reviewId };
    const { reviewId } = typeId;
    const reviewTypeId = plainToClass(Report, reviewId);
    const report = await reportService.createReport(
      type,
      reviewTypeId,
      content
    );
    res.json(report);
  };

  findReport: custom = async (req, res, next) => {
    try {
      const { query } = req;
      const page = query.page;
      const type = query.type;

      const report = await reportService.findAll(page);

      if (type !== undefined) {
        const findReportType = await reportService.findType(type, page);
        return res.json(findReportType);
      }

      res.json(report);
    } catch (error) {
      next(error);
    }
  };
}

const reportController = new ReportController();
export { reportController };
