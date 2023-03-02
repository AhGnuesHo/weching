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
exports.adviceService = exports.AdviceService = void 0;
const adviceModel_1 = require("../model/adviceModel");
class AdviceService {
    constructor(adviceModel) {
        this.adviceModel = adviceModel;
    }
    getAdvice() {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield adviceModel_1.adviceModel.getAdvice();
            return row;
        });
    }
}
exports.AdviceService = AdviceService;
const adviceService = new AdviceService(adviceModel_1.adviceModel);
exports.adviceService = adviceService;
//# sourceMappingURL=adviceService.js.map