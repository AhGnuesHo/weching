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
exports.reportModel = exports.ReportModel = void 0;
const app_1 = require("../app");
class ReportModel {
    createReport(type, type_id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const report = yield app_1.pg.query(`INSERT INTO report(type,type_id,content) VALUES ($1,$2,$3)RETURNING *`, [type, type_id, content]);
            yield app_1.pg.query(`UPDATE review SET status = 1 where id=($1)`, [type_id]);
            return report.rows[0];
        });
    }
    findReport(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield app_1.pg.query(`SELECT * FROM report where type_id=($1)`, [id]);
            return row.rows[0];
        });
    }
    findAll(page) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield app_1.pg.query(`SELECT * FROM report order BY id desc limit 10 offset (($1)-1)*10`, [page]);
            return row.rows;
        });
    }
    findType(type, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield app_1.pg.query(`SELECT * FROM report WHERE type = ($1) order BY id desc limit 10 offset (($2)-1)*10`, [type, page]);
            return row.rows;
        });
    }
    countAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield app_1.pg.query(`SELECT count(*) FROM report`)).rows[0].count;
        });
    }
    countType(type) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield app_1.pg.query(`select count(*)from report where type =($1)`, [type])).rows[0].count;
        });
    }
}
exports.ReportModel = ReportModel;
const reportModel = new ReportModel();
exports.reportModel = reportModel;
//# sourceMappingURL=reportModel.js.map