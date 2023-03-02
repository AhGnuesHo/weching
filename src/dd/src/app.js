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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pg = exports.app = void 0;
const userDto_1 = require("./dto/userDto");
const rankModel_1 = require("./model/rankModel");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_errors_1 = __importDefault(require("http-errors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const node_cron_1 = __importDefault(require("node-cron"));
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = require("./logger");
const config_1 = require("./config");
const middlewares_1 = require("./middlewares");
const routers_1 = require("./routers");
const constants_1 = require("./constants");
const pg_1 = require("pg");
const userRouter_1 = require("./routers/userRouter");
const dto_1 = require("./dto");
exports.app = (0, express_1.default)();
exports.pg = new pg_1.Pool({
    user: config_1.user,
    host: config_1.host,
    database: config_1.database,
    password: config_1.password,
    port: config_1.postgresPort,
});
exports.pg.connect()
    .then(() => logger_1.log.info(`database Connect`))
    .catch((err) => logger_1.log.error("connection error", err.stack));
exports.app.use((0, cors_1.default)({}));
exports.app.use((0, morgan_1.default)("dev"));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: false }));
exports.app.use((0, cookie_parser_1.default)());
require("./passport")();
exports.app.get("/favicon.ico", (req, res) => res.status(204));
exports.app.get(constants_1.endPoint.index, routers_1.indexRouter);
exports.app.use(constants_1.endPoint.main, routers_1.mainRouter);
exports.app.use(constants_1.endPoint.auth, routers_1.authRouter);
exports.app.use(constants_1.endPoint.guest, (0, middlewares_1.DtoValidatorMiddleware)(userDto_1.UserDto, true), middlewares_1.checkEmail, middlewares_1.checkName, middlewares_1.updateHandler, routers_1.guestRouter);
exports.app.use(constants_1.endPoint.post, middlewares_1.loginRequired, routers_1.postRouter);
exports.app.use(constants_1.endPoint.review, middlewares_1.loginRequired, (0, middlewares_1.DtoValidatorMiddleware)(dto_1.ReviewDto, true), routers_1.reviewRouter);
exports.app.use(constants_1.endPoint.notice, routers_1.noticeRouter);
exports.app.use(constants_1.endPoint.advice, routers_1.adviceRouter);
exports.app.use(constants_1.endPoint.user, middlewares_1.loginRequired, (0, middlewares_1.DtoValidatorMiddleware)(userDto_1.UserDto, true), userRouter_1.userRouter);
exports.app.use(constants_1.endPoint.report, routers_1.reportRouter);
exports.app.use("/api/login", routers_1.loginRouter);
exports.app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
exports.app.use(middlewares_1.errorHandler);
exports.app.listen(config_1.port, () => {
    logger_1.log.info(`Server listening on port: ${config_1.port}`);
});
node_cron_1.default.schedule("* * 1 1-12 *", () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.log.info(`update ranking`);
    try {
        yield rankModel_1.rankModel.setNewRank();
        yield rankModel_1.rankModel.resetRank();
    }
    catch (e) {
        logger_1.log.error(e);
    }
}), {
    scheduled: true,
    timezone: "Asia/Seoul",
});
//# sourceMappingURL=app.js.map