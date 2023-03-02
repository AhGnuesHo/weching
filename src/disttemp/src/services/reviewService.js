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
exports.reviewService = exports.ReviewService = void 0;
const postModel_1 = require("./../model/postModel");
const dto_1 = require("./../dto");
const class_transformer_1 = require("class-transformer");
const reviewModel_1 = require("../model/reviewModel");
const interfaces_1 = require("../interfaces");
const model_1 = require("../model");
const userService_1 = require("./userService");
class ReviewService {
    constructor(reviewModel) {
        this.reviewModel = reviewModel;
    }
    getReview(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const todoReview = yield reviewModel_1.reviewModel.todoReview(userId);
            if (!todoReview) {
                throw new Error(`유저를 찾을 수 없음 : 유저 아이디  ${userId}`);
            }
            return todoReview;
        });
    }
    writeReview(review) {
        return __awaiter(this, void 0, void 0, function* () {
            const myTodo = yield this.getReview(review.userId);
            const isMyTodo = myTodo.find((todo) => todo.id === review.postId);
            if (!isMyTodo) {
                throw new Error('배정되지 않은 게시글에는 칭찬을 할 수 없습니다.');
            }
            const result = yield reviewModel_1.reviewModel.writeReview(review);
            if (!result) {
                throw new Error(`이미 칭찬 한 게시글 입니다 ${JSON.stringify(review)}`);
            }
            const { userId } = review;
            yield model_1.userModel.updatePoint(userId, interfaces_1.point.REVIEW);
            yield postModel_1.postModel.hasNewReview(review.postId, 1);
            return review;
        });
    }
    gradeReview(grade, reviewId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const myPost = yield reviewModel_1.reviewModel.getPostInfoByReviewId(reviewId);
            const myPostEntity = (0, class_transformer_1.plainToInstance)(dto_1.PostEntity, myPost);
            if (userId !== myPostEntity.userId) {
                throw new Error('본인의 게시글에만 평가를 남길 수 있습니다.');
            }
            const isDone = yield reviewModel_1.reviewModel.isDone(reviewId);
            if (!isDone) {
                throw new Error('평가 실패 : 이미 평가를 끝낸 리뷰입니다');
            }
            return yield userService_1.userService.userGradeUpdate(grade, reviewId);
        });
    }
    reviewBookmark(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookmark = yield reviewModel_1.reviewModel.reviewBookmark(id);
            return bookmark;
        });
    }
    bookmark(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield reviewModel_1.reviewModel.bookmark(id);
        });
    }
}
exports.ReviewService = ReviewService;
const reviewService = new ReviewService(reviewModel_1.reviewModel);
exports.reviewService = reviewService;
//# sourceMappingURL=reviewService.js.map