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
exports.checkReport = void 0;
const logger_1 = require("../logger");
const reportModel_1 = require("../model/reportModel");
function checkReport(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { reviewId } = req.params;
        const typeId = parseInt(reviewId);
        try {
            const isReport = yield reportModel_1.reportModel.findReport(typeId);
            if (isReport) {
                logger_1.log.warn(`이미 신고한 리뷰 입니다.`);
                res
                    .status(400)
                    .send({ state: false, message: `이미 신고한 리뷰 입니다.` });
                return;
            }
            next();
        }
        catch (err) {
            next(err);
        }
    });
}
exports.checkReport = checkReport;
//# sourceMappingURL=reportHandler.js.map