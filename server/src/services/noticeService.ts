import { QueryResult } from 'pg';
import { noticeModel, NoticeModel } from '../model/noticeModel';
import { noticeType } from './interfaces/noticeInterface';

export class NoticeService {
  constructor(private noticeModel: NoticeModel) {
    this.noticeModel = noticeModel;
  }
  //공지사항 생성
  async createNotice(notice: noticeType): Promise<noticeType[]> {
    return await noticeModel.createNotice(notice);
  }
  //공지사항 조회
  async findOneNotice(id: number): Promise<noticeType[]> {
    return await noticeModel.findNotice(id);
  }
  //공지사항 전체 조회
  async findAll(): Promise<noticeType[]> {
    return await noticeModel.findAll();
  }

  //공지사항 수정
  async update(id: number, notice: noticeType): Promise<noticeType[]> {
    return await noticeModel.update(id, notice);
  }

  //공지사항 삭제
  async delete(id: number): Promise<noticeType[]> {
    return await noticeModel.delete(id);
  }
}

const noticeService = new NoticeService(noticeModel);

export { noticeService };
