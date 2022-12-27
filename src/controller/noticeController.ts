import { noticeService } from '../services/noticeService';
import { AsyncRequestHandler } from '../types';
import { notice, newNotice } from '../interfaces';
import { plainToClass } from 'class-transformer';
import { Request, Response, NextFunction } from 'express';

interface Query {
  page: number;
  cursor: number;
}
type custom = (
  req: Request<{}, {}, {}, Query>,
  res: Response,
  next: NextFunction
) => Promise<any>;
interface INoticeController {
  create: AsyncRequestHandler;
  findById: AsyncRequestHandler;
  // findAll: custom;
  update: AsyncRequestHandler;
  delete: AsyncRequestHandler;
}

export class Notice implements newNotice {
  id: string;
  title: string;
  content: string;
  constructor(id: string, title: string, content: string) {
    this.id = id;
    this.title = title;
    this.content = content;
  }
  get strToNumber(): number {
    const id = parseInt(this.id);
    return id;
  }
}

export class NoticeController implements INoticeController {
  //공지사항 생성
  create: AsyncRequestHandler = async (req, res) => {
    const { title, content } = req.body;
    const notice: notice = {
      title: title,
      content: content,
    };
    const noticeCreate = await noticeService.createNotice(notice);
    res.status(201).json(noticeCreate);
  };

  //공지사항 조회
  findById: AsyncRequestHandler = async (req, res) => {
    const noticeId: newNotice = {
      id: req.params.id,
    };
    const { id } = noticeId;
    const noticeDetailId = plainToClass(Notice, id);
    const findById = await noticeService.findOneNotice(noticeDetailId);

    res.json(findById);
  };

  // 공지사항 전체 조회
  findAll: custom = async (req, res) => {
    const { page } = req.query;

    const findAll = await noticeService.findAll(page);
    res.json(findAll);
  };

  //공지사항 전체 조회 (커서 페이징)

  // findAllCursor: custom = async (req, res, next) => {
  //   const { cursor } = req.query;
  //   const result = await noticeService.findAllCursor(cursor);

  //   res.json(result);
  // };

  //공지사항 수정
  update: AsyncRequestHandler = async (req, res) => {
    const noticeId: newNotice = {
      id: req.params.id,
    };
    const { id } = noticeId;

    const updateNotice: notice = {
      title: req.body.title,
      content: req.body.content,
    };
    const noticeDetailId = plainToClass(Notice, id);

    const update = await noticeService.update(noticeDetailId, updateNotice);
    res.json(update);
  };

  // //공지사항 삭제

  delete: AsyncRequestHandler = async (req, res) => {
    const noticeId: newNotice = {
      id: req.params.id,
    };
    const { id } = noticeId;
    const noticeDetailId = plainToClass(Notice, id);
    const deleteNotice = await noticeService.delete(noticeDetailId);
    res.json(deleteNotice);
  };
}

const noticeController = new NoticeController();
export { noticeController };
