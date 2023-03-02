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
exports.reviewModel = exports.ReviewModel = void 0;
const reviewDto_1 = require("./../dto/reviewDto");
const class_transformer_1 = require("class-transformer");
const app_1 = require("../app");
const types_1 = require("../types");
const dto_1 = require("../dto");
class ReviewModel {
    todoReview(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const todoReview = yield app_1.pg.query(`select * from posts where id in (select post_id from review where user_id = $1 and content is null ) order by id desc`, [userId]);
            return (0, class_transformer_1.plainToInstance)(dto_1.PostEntity, todoReview.rows);
        });
    }
    writeReview(review) {
        return __awaiter(this, void 0, void 0, function* () {
            const { postId, userId, content } = review;
            const myReview = yield app_1.pg.query(`update review set content = $1, month = ${types_1.query.MONTH} where post_id = $2 and user_id = $3 and content is null `, [content, postId, userId]);
            return myReview.rowCount === 1;
        });
    }
    getReviewByPost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reviews = yield app_1.pg.query(`select *  from review where post_id = $1 and content is not null order by id desc`, [postId]);
            return (0, class_transformer_1.plainToInstance)(reviewDto_1.ReviewEntity, reviews.rows);
        });
    }
    getReview(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const review = yield app_1.pg.query(`select * from review where id=($1)`, [id]);
            return (0, class_transformer_1.plainToInstance)(reviewDto_1.ReviewEntity, review.rows[0]);
        });
    }
    getDoneReviewCountThisMonth(reviewId) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield app_1.pg.query(`select count(content) from review where user_id = (select user_id from review where id = $1) 
      and content is not null and is_done = 1 and month = ${types_1.query.MONTH}`, [reviewId]);
            return count.rows[0].count;
        });
    }
    getPostInfoByReviewId(reviewId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield app_1.pg.query("select * from posts where id = (select post_id from review where id = $1)", [reviewId]);
            return post.rows[0];
        });
    }
    isDone(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const isDone = yield app_1.pg.query(`update review set is_done = 1 where id = $1 and is_done = 0`, [id]);
            return isDone.rowCount === 1;
        });
    }
    getReviewWriter(reviewId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield app_1.pg.query(`select * from users where id = (select user_id from review where id = $1)`, [reviewId]);
            return user.rows[0];
        });
    }
    reviewBookmark(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const reviewStatus = yield app_1.pg.query(`SELECT bookmark FROM review WHERE id= ($1)`, [id]);
            let status = reviewStatus.rows[0].bookmark ? false : true;
            const reviewBookmark = yield app_1.pg.query(`UPDATE review SET bookmark = ($1) where id = ($2)`, [status, id]);
            return reviewBookmark.rowCount === 1;
        });
    }
    bookmark(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const myBookmark = yield app_1.pg.query(`select * from review  where bookmark = true and post_id in ( select id  from posts  where user_id =($1))`, [userId]);
            return myBookmark.rows;
        });
    }
}
exports.ReviewModel = ReviewModel;
exports.reviewModel = new ReviewModel();
//# sourceMappingURL=reviewModel.js.map