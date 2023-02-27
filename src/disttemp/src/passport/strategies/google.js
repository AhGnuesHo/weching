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
exports.login = void 0;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const config_1 = require("../../config");
const userService_1 = require("../../services/userService");
const interfaces_1 = require("../../interfaces");
const logger_1 = require("../../logger");
const config = {
    clientID: config_1.clientID,
    clientSecret: config_1.clientSecret,
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"],
};
const login = new GoogleStrategy(config, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exUser = yield userService_1.userService.isUser(profile._json.email);
        if (exUser) {
            done(null, exUser);
        }
        else {
            const res = {
                email: profile._json.email,
            };
            done(null, interfaces_1.userEnum.GUEST, res);
        }
    }
    catch (error) {
        logger_1.log.err(error);
        done(error);
    }
}));
exports.login = login;
//# sourceMappingURL=google.js.map