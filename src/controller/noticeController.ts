import { noticeService } from '../services/noticeService';
import { AsyncRequestHandler } from '../types';
import { notice } from '../interfaces';
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
    const newNotice: notice = {
      title: req.body.title,
      content: req.body.content,
    };
    const noticeCreate = await noticeService.createNotice(newNotice);
    res.status(201).json(noticeCreate);
  },
  //공지사항 조회
  async findById(req: any, res: any, next: any): Promise<any> {
    const { id } = req.params;
    const findById = await noticeService.findOneNotice(id);

    res.json(findById);
  },
  //공지사항 전체 조회
  async findAll(req: any, res: any, next: any): Promise<any> {
    const { page } = req.query;
    const findAll = await noticeService.findAll(page);
    res.json(findAll);
  },

  //공지사항 수정
  async update(req: any, res: any, next: any): Promise<any> {
    const { id } = req.params;
    const updateNotice: notice = {
      title: req.body.title,
      content: req.body.content,
    };
    const update = await noticeService.update(id, updateNotice);
    res.json(update);
  },

  //공지사항 삭제

  async delete(req: any, res: any, next: any): Promise<any> {
    const { id } = req.params;
    const deleteNotice = await noticeService.delete(id);
    res.json(deleteNotice);
  },
};
