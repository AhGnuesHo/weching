import { QueryResult } from 'pg';
import { notice } from './interfaces/interface';
import { NoticeModel, noticeModel } from '../model/noticeModel';

export class NoticeService {
  constructor(private noticeModel: NoticeModel) {
    this.noticeModel = noticeModel;
  }
  //공지사항 생성
  async createNotice(notice: notice): Promise<notice[]> {
    return await noticeModel.createNotice(notice);
  }
  //공지사항 조회
  async findOneNotice(id: number): Promise<notice[]> {
    return await noticeModel.findNotice(id);
  }
  //공지사항 전체 조회
  async findAll(start: number): Promise<notice[]> {
    return await noticeModel.findAll(start);
  }

  //공지사항 수정
  async update(id: number, notice: notice): Promise<notice[]> {
    return await noticeModel.update(id, notice);
  }

  //공지사항 삭제
  async delete(id: number): Promise<notice[]> {
    return await noticeModel.delete(id);
  }
}

const noticeService = new NoticeService(noticeModel);

export { noticeService };
