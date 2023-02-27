"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const utils_1 = require("../utils");
const userController_1 = require("../controller/userController");
const middlewares_1 = require("../middlewares");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get('/', middlewares_1.expireUser, (0, utils_1.asyncHandler)(userController_1.userController.findUser));
exports.userRouter.delete('/', (0, utils_1.asyncHandler)(userController_1.userController.deleteUser));
exports.userRouter.patch('/', middlewares_1.expireUser, middlewares_1.checkName, middlewares_1.updateHandler, (0, utils_1.asyncHandler)(userController_1.userController.updateNickname));
//# sourceMappingURL=userRouter.js.map