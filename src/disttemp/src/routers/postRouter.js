"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const middlewares_1 = require("../middlewares");
const utils_1 = require("../utils");
const dto_1 = require("../dto");
exports.postRouter = (0, express_1.Router)();
exports.postRouter.post('/', middlewares_1.checkPoint, (0, middlewares_1.DtoValidatorMiddleware)(dto_1.PostDto, true), (0, utils_1.asyncHandler)(controller_1.postController.posting));
exports.postRouter.get('/list', (0, utils_1.asyncHandler)(controller_1.postController.getPosts));
exports.postRouter.get('/:postId', (0, middlewares_1.DtoValidatorMiddleware)(dto_1.PostDto, true), (0, utils_1.asyncHandler)(controller_1.postController.getPost));
//# sourceMappingURL=postRouter.js.map