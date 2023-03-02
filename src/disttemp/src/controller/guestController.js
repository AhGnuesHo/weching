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
exports.guestController = exports.GuestController = void 0;
const services_1 = require("../services");
const jwt_1 = require("../utils/jwt");
class GuestController {
    constructor() {
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield services_1.userService.createUser(req.body);
            res.json(user);
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const exUser = yield services_1.userService.isUser(req.body.email);
            if (exUser) {
                res.json((0, jwt_1.setUserToken)(res, exUser));
            }
            else {
                res.json({ email: req.body.email });
            }
        });
    }
}
exports.GuestController = GuestController;
const guestController = new GuestController();
exports.guestController = guestController;
//# sourceMappingURL=guestController.js.map