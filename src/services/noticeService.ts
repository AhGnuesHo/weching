import { notice, INoticeModel } from '../interfaces';
import { noticeModel } from '../model/noticeModel';
import { newNotice } from '../interfaces';

export class NoticeService {
  constructor(private noticeModel: INoticeModel) {}
  //공지사항 생성
  async createNotice(notice: notice): Promise<notice[]> {
    return await noticeModel.createNotice(notice);
  }
  //공지사항 조회
  async findOneNotice(noticeDetailId: newNotice): Promise<newNotice[]> {
    return await noticeModel.findNotice(noticeDetailId);
  }
  //공지사항 전체 조회
  async findAll(page: number): Promise<newNotice[]> {
    return await noticeModel.findAll(page);
  }

  //공지사항 수정
  async update(noticeDetailId: newNotice, notice: notice): Promise<notice[]> {
    return await noticeModel.update(noticeDetailId, notice);
  }

  //공지사항 삭제
  async delete(noticeDetailId: newNotice): Promise<notice[]> {
    return await noticeModel.delete(noticeDetailId);
  }
}

const noticeService = new NoticeService(noticeModel);

export { noticeService };
