import { noticeService } from '../services/noticeService';
import { AsyncRequestHandler } from '../types';
import { noticeType } from '../services/interfaces/noticeInterface';

interface noticeControllerInterface {
  create: AsyncRequestHandler;
  findById: AsyncRequestHandler;
  findAll: AsyncRequestHandler;
  update: AsyncRequestHandler;
  delete: AsyncRequestHandler;
}

export const noticeController: noticeControllerInterface = {
  //공지사항 생성
  async create(req: any, res: any, next: any): Promise<any> {
    try {
      const newNotice: noticeType = {
        title: req.body.title,
        content: req.body.content,
      };

      const noticeCreate = await noticeService.createNotice(newNotice);
      res.status(201).json(noticeCreate);
    } catch (error) {
      next(error);
    }
  },
  //공지사항 조회
  async findById(req: any, res: any, next: any): Promise<any> {
    try {
      const { id } = req.params;
      const findById = await noticeService.findOneNotice(id);
      console.log(findById);

      res.json(findById);
    } catch (error) {
      next(error);
    }
  },
  //공지사항 전체 조회
  async findAll(req: any, res: any, next: any): Promise<any> {
    try {
      const findAll = await noticeService.findAll();
      res.json(findAll);
    } catch (error) {
      next(error);
    }
  },

  //공지사항 수정
  async update(req: any, res: any, next: any): Promise<any> {
    try {
      const { id } = req.params;
      const updateNotice: noticeType = {
        title: req.body.title,
        content: req.body.content,
      };
      const update = await noticeService.update(id, updateNotice);
      res.json(update);
    } catch (error) {
      next(error);
    }
  },

  //공지사항 삭제

  async delete(req: any, res: any, next: any): Promise<any> {
    try {
      const { id } = req.params;
      const deleteNotice = await noticeService.delete(id);
      res.json(deleteNotice);
    } catch (error) {
      next(error);
    }
  },
};
