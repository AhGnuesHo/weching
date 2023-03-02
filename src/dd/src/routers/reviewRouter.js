"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const utils_1 = require("../utils");
exports.reviewRouter = (0, express_1.Router)();
exports.reviewRouter.get("/", (0, utils_1.asyncHandler)(controller_1.reviewController.getReview));
exports.reviewRouter.patch("/", (0, utils_1.asyncHandler)(controller_1.reviewController.writeReview));
exports.reviewRouter.post("/grade", (0, utils_1.asyncHandler)(controller_1.reviewController.gradeReview));
exports.reviewRouter.patch("/bookmark", (0, utils_1.asyncHandler)(controller_1.reviewController.reviewBookmark));
exports.reviewRouter.get("/bookmark", (0, utils_1.asyncHandler)(controller_1.reviewController.bookmark));
//# sourceMappingURL=reviewRouter.js.map