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
exports.adviceModel = exports.AdviceModel = void 0;
const app_1 = require("../app");
class AdviceModel {
    getAdvice() {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield app_1.pg.query("SELECT * FROM advice order by random() limit 1");
            return row.rows[0];
        });
    }
}
exports.AdviceModel = AdviceModel;
exports.adviceModel = new AdviceModel();
//# sourceMappingURL=adviceModel.js.map