import {
  notice,
  INoticeModel,
  newNotice,
  pageNationNotice,
  cursorPage,
} from '../interfaces';
import { noticeModel } from '../model/noticeModel';
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
  // //공지사항 전체 조회

  async findAll(page: number): Promise<pageNationNotice> {
    const totalCount = await noticeModel.countAll();
    const notice = await noticeModel.findAll(page);
    const totalPage = Math.ceil(totalCount / 10);
    const result = {
      totalPage: totalPage,
      currPage: page,
      notice: notice,
    };
    return result;
  }

  //
  // async findAllCursor(cursor: number): Promise<cursorPage> {
  //   const findMaxId = await noticeModel.findMaxId();
  //   const findAllCursor = await noticeModel.findAllCursor(cursor);
  //   const nextCursor =
  //     findAllCursor.length === 10
  //       ? findAllCursor[findAllCursor.length - 1].id
  //       : null;

  //   const cursorPage: cursorPage = {
  //     findMaxId: findMaxId,
  //     findAllCursor: findAllCursor,
  //     nextCursor: nextCursor,
  //   };

  //   return cursorPage;
  // }

  async findAllCount(): Promise<number> {
    return await noticeModel.countAll();
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
