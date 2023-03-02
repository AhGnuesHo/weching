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
exports.checkPoint = void 0;
const interfaces_1 = require("../interfaces");
const userModel_1 = require("../model/userModel");
function checkPoint(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.body;
        try {
            const deduct = interfaces_1.point.POST;
            yield userModel_1.userModel.updatePoint(userId, deduct);
            next();
        }
        catch (err) {
            next(err);
        }
    });
}
exports.checkPoint = checkPoint;
//# sourceMappingURL=pointHandler.js.map