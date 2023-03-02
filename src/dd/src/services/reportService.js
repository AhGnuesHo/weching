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
exports.reportService = exports.ReportService = void 0;
const reportModel_1 = require("../model/reportModel");
class ReportService {
    constructor(reportModel) {
        this.reportModel = reportModel;
    }
    //todo
    //report model 부터확인
    createReport(type, typeId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield reportModel_1.reportModel.createReport(type, typeId, content);
        });
    }
    findAll(page) {
        return __awaiter(this, void 0, void 0, function* () {
            const totalCount = yield reportModel_1.reportModel.countAll();
            const report = yield reportModel_1.reportModel.findAll(page);
            const totalPage = Math.ceil(totalCount / 10);
            const result = {
                totalPage: totalPage,
                currPage: page,
                report: report,
            };
            return result;
        });
    }
    findType(type, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const typeCount = yield reportModel_1.reportModel.countType(type);
            const reportType = yield reportModel_1.reportModel.findType(type, page);
            const totalPage = Math.ceil(typeCount / 10);
            const result = {
                totalPage: totalPage,
                currPage: page,
                reportType: reportType,
            };
            return result;
        });
    }
}
exports.ReportService = ReportService;
const reportService = new ReportService(reportModel_1.reportModel);
exports.reportService = reportService;
//# sourceMappingURL=reportService.js.map