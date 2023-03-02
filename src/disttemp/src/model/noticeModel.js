"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noticeModel = exports.NoticeModel = void 0;
const app_1 = require("../app");
class NoticeModel {
    //공지사항 생성
    createNotice(notice) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, content } = notice;
            const row = yield app_1.pg.query('INSERT INTO notice (title,content) VALUES($1,$2) RETURNING *', [title, content]);
            return row.rows[0];
        });
    }
    //공지사항 조회
    findNotice(noticeInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield app_1.pg.query('SELECT * FROM notice WHERE id =($1)', [
                noticeInfo,
            ]);
            if (row.rows[0] == null) {
                throw new Error('찾는 게시물이 업습니다.');
            }
            return row.rows[0];
        });
    }
    countAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield app_1.pg.query('select count(*) from notice')).rows[0].count;
        });
    }
    //공지사항 전체 조회
    findAll(page) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield app_1.pg.query('select  * from notice order BY id desc limit 10 offset (($1)-1)*10 ', [page]);
            return row.rows;
        });
    }
    //공지사항 전체 조회 (커서 페이징)
    findAllCursor(cursor) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield app_1.pg.query(`select * from notice where id<=($1) order by id desc limit 10`, [cursor]);
            return row.rows;
        });
    }
    //공지사항 조회 MAX_ID 값 조회
    findMaxId() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield app_1.pg.query(`select max(id) from notice`)).rows[0].max;
        });
    }
    // //공지사항 업데이트
    update(noticeInfo, notice) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, content } = notice;
            return yield app_1.pg
                .query('UPDATE notice SET title=($1),content=($2) WHERE id=($3)', [
                title,
                content,
                noticeInfo,
            ])
                .then(() => this.findNotice(noticeInfo));
        });
    }
    //공지사항 삭제
    delete(noticeDetailId) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield app_1.pg.query('DELETE FROM notice WHERE id = ($1)', [
                noticeDetailId,
            ]);
            if (row.rows[0] == null) {
                throw new Error('게시물이 없습니다.');
            }
            return row.rows[0];
        });
    }
}
exports.NoticeModel = NoticeModel;
exports.noticeModel = new NoticeModel();
//# sourceMappingURL=noticeModel.js.map