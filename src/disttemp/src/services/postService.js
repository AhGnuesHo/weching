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
exports.postService = exports.PostService = void 0;
const index_1 = require("../types/index");
const index_2 = require("../model/index");
class PostService {
    constructor(postModel) {
        this.postModel = postModel;
    }
    posting(post) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield index_2.postModel.postingAndMatchingReview(post);
        });
    }
    createReview(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield index_2.postModel.getAllUsersCount();
            let target = [];
            for (let i = 0; i < index_1.EReview.TARGET_USER; i++) {
                const random = Math.floor(Math.random() * (count - index_1.EReview.LIMIT_USER_NUMBER)) +
                    index_1.EReview.LIMIT_USER_NUMBER;
                if (target.indexOf(random) === -1 && target.indexOf(userId) === -1) {
                    target.push(random);
                }
                else {
                    i--;
                }
            }
            return target;
        });
    }
    getPosts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield index_2.postModel.getPosts(userId);
            const result = yield Promise.all(posts.map((post) => __awaiter(this, void 0, void 0, function* () {
                const { id } = post;
                const review = yield index_2.reviewModel.getReviewByPost(id);
                const result = {
                    post: post,
                    reviews: review,
                };
                return result;
            })));
            return result;
        });
    }
    getPost(userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield index_2.postModel.hasNewReview(postId, 0);
            const post = yield index_2.postModel.getPost(userId, postId);
            const reviews = yield index_2.reviewModel.getReviewByPost(postId);
            return { post, reviews };
        });
    }
}
exports.PostService = PostService;
const postService = new PostService(index_2.postModel);
exports.postService = postService;
//# sourceMappingURL=postService.js.map