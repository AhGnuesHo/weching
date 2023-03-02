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
exports.noticeService = exports.NoticeService = void 0;
const noticeModel_1 = require("../model/noticeModel");
class NoticeService {
    constructor(noticeModel) {
        this.noticeModel = noticeModel;
    }
    //공지사항 생성
    createNotice(notice) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield noticeModel_1.noticeModel.createNotice(notice);
        });
    }
    //공지사항 조회
    findOneNotice(noticeDetailId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield noticeModel_1.noticeModel.findNotice(noticeDetailId);
        });
    }
    // //공지사항 전체 조회
    findAll(page) {
        return __awaiter(this, void 0, void 0, function* () {
            const totalCount = yield noticeModel_1.noticeModel.countAll();
            const notice = yield noticeModel_1.noticeModel.findAll(page);
            const totalPage = Math.ceil(totalCount / 10);
            const result = {
                totalPage: totalPage,
                currPage: page,
                notice: notice,
            };
            return result;
        });
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
    findAllCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield noticeModel_1.noticeModel.countAll();
        });
    }
    //공지사항 수정
    update(noticeDetailId, notice) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield noticeModel_1.noticeModel.update(noticeDetailId, notice);
        });
    }
    //공지사항 삭제
    delete(noticeDetailId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield noticeModel_1.noticeModel.delete(noticeDetailId);
        });
    }
}
exports.NoticeService = NoticeService;
const noticeService = new NoticeService(noticeModel_1.noticeModel);
exports.noticeService = noticeService;
//# sourceMappingURL=noticeService.js.map