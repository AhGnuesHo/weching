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
exports.mainController = exports.MainController = void 0;
const services_1 = require("../services");
class MainController {
    constructor() {
        this.mainInfo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const mainInfo = yield services_1.mainService.mainInfo();
            res.json(mainInfo);
        });
        this.userInfo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.body;
            const userInfo = yield services_1.mainService.userMainInfo(userId);
            res.json(userInfo);
        });
    }
}
exports.MainController = MainController;
const mainController = new MainController();
exports.mainController = mainController;
//# sourceMappingURL=mainController.js.map