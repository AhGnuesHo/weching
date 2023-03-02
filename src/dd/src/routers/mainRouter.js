"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = require("express");
const utils_1 = require("../utils");
const controller_1 = require("../controller");
const middlewares_1 = require("../middlewares");
exports.mainRouter = (0, express_1.Router)();
exports.mainRouter.get("/", (0, utils_1.asyncHandler)(controller_1.mainController.mainInfo));
exports.mainRouter.get("/user", middlewares_1.mainUser, (0, utils_1.asyncHandler)(controller_1.mainController.userInfo));
exports.mainRouter.post("/checkName", middlewares_1.checkName, (0, utils_1.asyncHandler)(controller_1.userController.isUsingEmail));
//# sourceMappingURL=mainRouter.js.map