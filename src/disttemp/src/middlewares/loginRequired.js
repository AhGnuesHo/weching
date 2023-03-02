"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainUser = exports.loginRequired = void 0;
const utils_1 = require("../utils");
const logger_1 = require("../logger");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function loginRequired(req, res, next) {
    var _a;
    const userToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!userToken || userToken === "null" || userToken === "undefined") {
        logger_1.log.error("Authorization 토큰 없음");
        (0, utils_1.errorResponse)(res, "FORBIDDEN", "로그인한 유저만 사용할 수 있는 서비스입니다.");
        return;
    }
    try {
        const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
        const jwtDecoded = jsonwebtoken_1.default.verify(userToken, secretKey);
        const userId = jwtDecoded.userId;
        const email = jwtDecoded.email;
        const status = jwtDecoded.status;
        req.body.userId = userId;
        req.body.email = email;
        req.body.status = status;
        next();
    }
    catch (error) {
        (0, utils_1.errorResponse)(res, "FORBIDDEN", "정상적인 토큰이 아닙니다.");
        return;
    }
}
exports.loginRequired = loginRequired;
function mainUser(req, res, next) {
    var _a;
    const userToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!userToken || userToken === "null" || userToken === "undefined") {
        res.json([]);
        return;
    }
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    const jwtDecoded = jsonwebtoken_1.default.verify(userToken, secretKey);
    const userId = jwtDecoded === null || jwtDecoded === void 0 ? void 0 : jwtDecoded.userId;
    const email = jwtDecoded === null || jwtDecoded === void 0 ? void 0 : jwtDecoded.email;
    const status = jwtDecoded === null || jwtDecoded === void 0 ? void 0 : jwtDecoded.status;
    req.body.userId = userId;
    req.body.email = email;
    req.body.status = status;
    next();
}
exports.mainUser = mainUser;
//# sourceMappingURL=loginRequired.js.map