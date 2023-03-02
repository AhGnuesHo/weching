"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const google_1 = require("./strategies/google");
module.exports = () => {
    passport_1.default.serializeUser((user, done) => {
        done(null, user.email);
    });
    passport_1.default.deserializeUser((email, done) => {
        done(null, email);
    });
    passport_1.default.use(google_1.login);
};
//# sourceMappingURL=index.js.map