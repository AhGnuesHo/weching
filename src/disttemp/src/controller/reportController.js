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
exports.reportController = exports.ReportController = exports.Report = void 0;
const services_1 = require("../services");
const class_transformer_1 = require("class-transformer");
class Report {
    constructor(reviewId, type, typeId, content) {
        this.reviewId = reviewId;
        this.type = type;
        this.typeId = typeId;
        this.content = content;
    }
    get strToNumber() {
        const reviewId = parseInt(this.reviewId);
        return reviewId;
    }
}
exports.Report = Report;
class ReportController {
    constructor() {
        this.createReport = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { type, content } = req.body;
            const typeId = { reviewId: req.params.reviewId };
            const { reviewId } = typeId;
            const reviewTypeId = (0, class_transformer_1.plainToClass)(Report, reviewId);
            const report = yield services_1.reportService.createReport(type, reviewTypeId, content);
            res.json(report);
        });
        this.findReport = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { page } = req.query;
                const { type } = req.query;
                const report = yield services_1.reportService.findAll(page);
                if (type) {
                    const findReportType = yield services_1.reportService.findType(type, page);
                    return res.json(findReportType);
                }
                res.json(report);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ReportController = ReportController;
const reportController = new ReportController();
exports.reportController = reportController;
//# sourceMappingURL=reportController.js.map