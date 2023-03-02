"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUserToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const setUserToken = (res, user) => {
    const accessToken = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, status: user.status }, config_1.jwtSecret, {
        expiresIn: "23h",
    });
    const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, status: user.status }, config_1.jwtSecret, {
        expiresIn: "14d",
    });
    return { accessToken, refreshToken, role: user.status };
};
exports.setUserToken = setUserToken;
//# sourceMappingURL=jwt.js.map