"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const utils_1 = require("../utils");
exports.loginRouter = (0, express_1.Router)();
exports.loginRouter.post("/", (0, utils_1.asyncHandler)(controller_1.guestController.login));
//# sourceMappingURL=loginRouter.js.map