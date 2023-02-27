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
exports.mainService = exports.MainService = void 0;
const mainModel_1 = require("../model/mainModel");
class MainService {
    constructor(mainModel) {
        this.mainModel = mainModel;
    }
    mainInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const main = yield mainModel_1.mainModel.mainInfo();
            return main.format();
        });
    }
    userMainInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mainModel_1.mainModel.userMainInfo(id);
        });
    }
}
exports.MainService = MainService;
const mainService = new MainService(mainModel_1.mainModel);
exports.mainService = mainService;
//# sourceMappingURL=mainService.js.map