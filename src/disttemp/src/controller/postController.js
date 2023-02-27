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
Object.defineProperty(exports, "__esModule", { value: true });
exports.postController = exports.PostController = void 0;
const postService_1 = require("../services/postService");
class PostController {
    constructor() {
        this.posting = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield postService_1.postService.posting(req.body);
            res.json(user);
        });
        this.getPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.body;
            const postId = req.body.paramToNumber(req.params.postId);
            const post = yield postService_1.postService.getPost(userId, postId);
            res.json(post);
        });
        this.getPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.body;
            const myAllPost = yield postService_1.postService.getPosts(userId);
            res.json(myAllPost);
        });
    }
}
exports.PostController = PostController;
const postController = new PostController();
exports.postController = postController;
//# sourceMappingURL=postController.js.map