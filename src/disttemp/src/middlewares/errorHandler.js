"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const utils_1 = require("../utils");
const logger_1 = require("../logger");
const errorHandler = (err, req, res, next) => {
    logger_1.log.error(err.stack);
    (0, utils_1.errorResponse)(res, 'BADREQUEST', err.message);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map