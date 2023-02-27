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
exports.postModel = exports.PostModel = void 0;
const app_1 = require("../app");
const postService_1 = require("../services/postService");
const logger_1 = require("../logger");
const class_transformer_1 = require("class-transformer");
const dto_1 = require("../dto");
class PostModel {
    postingAndMatchingReview(post, count = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            const postingPg = yield app_1.pg.connect();
            try {
                postingPg.query("begin");
                const posting = yield this.posting(post, postingPg);
                logger_1.log.info("posting success : " + JSON.stringify(post));
                const target = yield postService_1.postService.createReview(post.userId);
                yield this.createReview(target, posting, postingPg);
                const result = {
                    post: posting,
                    target: target,
                };
                return result;
            }
            catch (err) {
                yield postingPg.query("rollback");
                if (count < 2) {
                    return this.postingAndMatchingReview(post, (count += 1));
                }
                throw new Error("게시글 작성에 실패했습니다.");
            }
            finally {
                yield postingPg.query("commit");
                postingPg.release();
            }
        });
    }
    posting(post, pool) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, content } = post;
            const newPost = yield pool.query("INSERT INTO posts ( user_id, content ) VALUES ($1, $2) RETURNING *", [userId, content]);
            return (0, class_transformer_1.plainToInstance)(dto_1.PostEntity, newPost.rows[0]);
        });
    }
    getAllUsersCount() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield app_1.pg.query(`select max(id) from users `);
            return result.rows[0].max;
        });
    }
    isAvailable(targetUser, reviewPool) {
        return __awaiter(this, void 0, void 0, function* () {
            const isAvailable = yield reviewPool.query(`select * from users where id = any($1) and status = 0 `, [targetUser]);
            return isAvailable.rowCount === targetUser.length;
        });
    }
    createReview(targetUser, post, reviewPool) {
        return __awaiter(this, void 0, void 0, function* () {
            targetUser = [45, 85, 23];
            if (!(yield this.isAvailable(targetUser, reviewPool))) {
                throw new Error(`targetUser is not available`);
            }
            yield Promise.allSettled(targetUser.map((user) => __awaiter(this, void 0, void 0, function* () {
                yield reviewPool.query(`insert into review (user_id, post_id ) VALUES ($1, $2)`, [user, post.id]);
            })));
        });
    }
    getPosts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const getPost = yield app_1.pg.query(`select * from posts where user_id = $1 order by id desc`, [userId]);
            return (0, class_transformer_1.plainToInstance)(dto_1.PostEntity, getPost.rows);
        });
    }
    getPost(userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const getPost = yield app_1.pg.query(`select * from posts where id = $1 order by id desc`, [postId]);
            return (0, class_transformer_1.plainToInstance)(dto_1.PostEntity, getPost.rows[0]);
        });
    }
    hasNewReview(postId, check) {
        return __awaiter(this, void 0, void 0, function* () {
            yield app_1.pg.query(`update posts set is_checked = ${check} where id = $1 `, [
                postId,
            ]);
        });
    }
}
exports.PostModel = PostModel;
exports.postModel = new PostModel();
//# sourceMappingURL=postModel.js.map