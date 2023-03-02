"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guestRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const middlewares_1 = require("../middlewares");
const utils_1 = require("../utils");
exports.guestRouter = (0, express_1.Router)();
exports.guestRouter.post("/", middlewares_1.checkName, middlewares_1.updateHandler, (0, utils_1.asyncHandler)(controller_1.guestController.register));
//# sourceMappingURL=guestRouter.js.map