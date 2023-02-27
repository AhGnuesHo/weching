"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtSecret = exports.clientSecret = exports.clientID = exports.postgresPort = exports.password = exports.database = exports.host = exports.user = exports.port = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("./logger");
const envFound = dotenv_1.default.config();
if (envFound.error) {
    logger_1.log.error("Couldn't find .env file");
    throw new Error("Couldn't find .env file");
}
if (process.env.POSTGRESQL === undefined) {
    logger_1.log.error("'어플리케이션을 시작하려면 POSTGRESQL 환경변수가 필요합니다.");
    throw new Error('어플리케이션을 시작하려면 POSTGRESQL 환경변수가 필요합니다.');
}
const port = parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : '8080', 10);
exports.port = port;
const user = process.env.POSTGRESURER;
exports.user = user;
const host = process.env.POSTGRESQL;
exports.host = host;
const database = process.env.DATABASE;
exports.database = database;
const password = process.env.PASSWORD;
exports.password = password;
const postgresPort = parseInt((_b = process.env.POSTGRESQLPORT) !== null && _b !== void 0 ? _b : '5432');
exports.postgresPort = postgresPort;
const clientID = process.env.GOOGLE_CLIENT_ID;
exports.clientID = clientID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
exports.clientSecret = clientSecret;
const jwtSecret = process.env.JWT_SECRET_KEY;
exports.jwtSecret = jwtSecret;
//# sourceMappingURL=config.js.map