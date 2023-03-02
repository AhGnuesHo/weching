"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtSecret = exports.clientSecret = exports.clientID = exports.postgresPort = exports.password = exports.database = exports.host = exports.user = exports.port = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const envFound = dotenv_1.default.config();
if (envFound.error) {
    throw new Error("Couldn't find .env file");
}
if (process.env.POSTGRESQL === undefined) {
    throw new Error("어플리케이션을 시작하려면 POSTGRESQL 환경변수가 필요합니다.");
}
exports.port = parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : "8080", 10);
exports.user = process.env.POSTGRESURER;
exports.host = process.env.POSTGRESQL;
exports.database = process.env.DATABASE;
exports.password = process.env.PASSWORD;
exports.postgresPort = parseInt((_b = process.env.POSTGRESQLPORT) !== null && _b !== void 0 ? _b : "5432");
exports.clientID = process.env.GOOGLE_CLIENT_ID;
exports.clientSecret = process.env.GOOGLE_CLIENT_SECRET;
exports.jwtSecret = process.env.JWT_SECRET_KEY;
//# sourceMappingURL=config.js.map