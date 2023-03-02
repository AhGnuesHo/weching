"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adviceRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const utils_1 = require("../utils");
exports.adviceRouter = (0, express_1.Router)();
exports.adviceRouter.get('/', (0, utils_1.asyncHandler)(controller_1.adviceController.getAdvice));
//# sourceMappingURL=adviceRouter.js.map