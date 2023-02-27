"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const utils_1 = require("../utils");
const middlewares_1 = require("../middlewares");
exports.reportRouter = (0, express_1.Router)();
exports.reportRouter.post('/:reviewId', middlewares_1.checkReport, (0, utils_1.asyncHandler)(controller_1.reportController.createReport));
exports.reportRouter.get('/', controller_1.reportController.findReport);
//# sourceMappingURL=reportRouter.js.map