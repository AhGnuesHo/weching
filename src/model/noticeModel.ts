import { notice, INoticeModel, newNotice } from '../interfaces';
import { pg } from '../app';

export class NoticeModel implements INoticeModel {
  //공지사항 생성
  async createNotice(notice: notice): Promise<notice[]> {
    const { title, content } = notice;
    const row = await pg.query(
      'INSERT INTO notice (title,content) VALUES($1,$2) RETURNING *',
      [title, content]
    );

    return row.rows[0];
  }
  //공지사항 조회
  async findNotice(noticeInfo: newNotice): Promise<newNotice[]> {
    const row = await pg.query('SELECT * FROM notice WHERE id =($1)', [
      noticeInfo,
    ]);
    if (row.rows[0] == null) {
      throw new Error('찾는 게시물이 업습니다.');
    }

    return row.rows[0];
  }

  async countAll(): Promise<number> {
    return (await pg.query('select count(*) from notice')).rows[0].count;
  }

  //공지사항 전체 조회
  async findAll(page: number): Promise<newNotice[]> {
    const row = await pg.query(
      // todo
      'select  * from notice order BY id desc limit 10 offset (($1)-1)*10 ',
      [page]
    );
    return row.rows;
  }

  // //공지사항 업데이트
  async update(noticeInfo: newNotice, notice: notice): Promise<notice[]> {
    const { title, content } = notice;
    return await pg
      .query('UPDATE notice SET title=($1),content=($2) WHERE id=($3)', [
        title,
        content,
        noticeInfo,
      ])
      .then(() => this.findNotice(noticeInfo));
  }

  //공지사항 삭제

  async delete(noticeDetailId: newNotice): Promise<newNotice[]> {
    const row = await pg.query('DELETE FROM notice WHERE id = ($1)', [
      noticeDetailId,
    ]);
    if (row.rows[0] == null) {
      throw new Error('게시물이 없습니다.');
    }
    return row.rows[0];
  }
}

export const noticeModel = new NoticeModel();
