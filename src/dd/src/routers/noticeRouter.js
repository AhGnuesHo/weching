"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noticeRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const utils_1 = require("../utils");
exports.noticeRouter = (0, express_1.Router)();
exports.noticeRouter.post('/', (0, utils_1.asyncHandler)(controller_1.noticeController.create));
exports.noticeRouter.get('/:id', (0, utils_1.asyncHandler)(controller_1.noticeController.findById));
exports.noticeRouter.get('/', controller_1.noticeController.findAll);
exports.noticeRouter.patch('/:id', (0, utils_1.asyncHandler)(controller_1.noticeController.update));
exports.noticeRouter.delete('/:id', (0, utils_1.asyncHandler)(controller_1.noticeController.delete));
//커서 페이지네이션
// noticeRouter.get('/', noticeController.findAllCursor);
//# sourceMappingURL=noticeRouter.js.map