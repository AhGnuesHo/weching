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
exports.noticeController = exports.NoticeController = exports.Notice = void 0;
const noticeService_1 = require("../services/noticeService");
const class_transformer_1 = require("class-transformer");
class Notice {
    constructor(id, title, content) {
        this.id = id;
        this.title = title;
        this.content = content;
    }
    get strToNumber() {
        const id = parseInt(this.id);
        return id;
    }
}
exports.Notice = Notice;
class NoticeController {
    constructor() {
        //공지사항 생성
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { title, content } = req.body;
            const notice = {
                title: title,
                content: content,
            };
            const noticeCreate = yield noticeService_1.noticeService.createNotice(notice);
            res.status(201).json(noticeCreate);
        });
        //공지사항 조회
        this.findById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const noticeId = {
                id: req.params.id,
            };
            const { id } = noticeId;
            const noticeDetailId = (0, class_transformer_1.plainToClass)(Notice, id);
            const findById = yield noticeService_1.noticeService.findOneNotice(noticeDetailId);
            res.json(findById);
        });
        // 공지사항 전체 조회
        this.findAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { page } = req.query;
            const findAll = yield noticeService_1.noticeService.findAll(page);
            res.json(findAll);
        });
        //공지사항 전체 조회 (커서 페이징)
        // findAllCursor: custom = async (req, res, next) => {
        //   const { cursor } = req.query;
        //   const result = await noticeService.findAllCursor(cursor);
        //   res.json(result);
        // };
        //공지사항 수정
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const noticeId = {
                id: req.params.id,
            };
            const { id } = noticeId;
            const updateNotice = {
                title: req.body.title,
                content: req.body.content,
            };
            const noticeDetailId = (0, class_transformer_1.plainToClass)(Notice, id);
            const update = yield noticeService_1.noticeService.update(noticeDetailId, updateNotice);
            res.json(update);
        });
        // //공지사항 삭제
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const noticeId = {
                id: req.params.id,
            };
            const { id } = noticeId;
            const noticeDetailId = (0, class_transformer_1.plainToClass)(Notice, id);
            const deleteNotice = yield noticeService_1.noticeService.delete(noticeDetailId);
            res.json(deleteNotice);
        });
    }
}
exports.NoticeController = NoticeController;
const noticeController = new NoticeController();
exports.noticeController = noticeController;
//# sourceMappingURL=noticeController.js.map