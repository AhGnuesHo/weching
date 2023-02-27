"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const jwt_1 = require("../utils/jwt");
const interfaces_1 = require("../interfaces");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.get('/google/login', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
exports.authRouter.get('/google/callback', passport_1.default.authenticate('google', {
    session: false,
}), (req, res, next) => {
    if (req.user === interfaces_1.userEnum.GUEST) {
        res.json(req.authInfo);
        return;
    }
    res.json((0, jwt_1.setUserToken)(res, req.user));
});
//# sourceMappingURL=authRouter.js.map