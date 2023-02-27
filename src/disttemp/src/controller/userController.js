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
exports.userController = exports.UserController = void 0;
const services_1 = require("../services");
class UserController {
    constructor() {
        this.findUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.body;
            const findUser = yield services_1.userService.findUser(userId);
            res.json(findUser);
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.body;
            const update = yield services_1.userService.userStatusUpdate(userId);
            res.json(update);
        });
        this.updateNickname = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nickName, userId } = req.body;
            const update = yield services_1.userService.updateNickname(nickName, userId);
            res.json(update);
        });
        this.isUsingEmail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nameState } = req.body;
            res.json(nameState);
        });
    }
}
exports.UserController = UserController;
const userController = new UserController();
exports.userController = userController;
//# sourceMappingURL=userController.js.map