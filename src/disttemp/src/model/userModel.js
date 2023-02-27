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
exports.userModel = exports.UserModel = void 0;
const class_transformer_1 = require("class-transformer");
const app_1 = require("../app");
const reviewModel_1 = require("./reviewModel");
const logger_1 = require("../logger");
const dto_1 = require("../dto");
class UserModel {
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, nickName } = user;
            const newUser = yield app_1.pg.query("INSERT INTO users ( email, nickname ) VALUES ($1, $2) RETURNING *", [email, nickName]);
            return newUser.rows[0];
        });
    }
    userInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const info = yield app_1.pg.query("select *, (select count(content) from posts where user_id = ($1)) as post_count,(select count(content) from review  where user_id = ($1) ) as review_count from users where id =($1)", [id]);
            return (0, class_transformer_1.plainToInstance)(dto_1.UserEntity, info.rows[0]);
        });
    }
    rankInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const info = yield app_1.pg.query(`select distinct
     * from rank where user_id = $1`, [id]);
            return info.rows;
        });
    }
    // 다형성을 써보려고 했는데 코드가 좀 별로 인 것 같습니다 !
    isUser(info) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = "";
            if (typeof info === "string") {
                query = "select *  from users where email = $1 and status != 1 ";
            }
            else if (typeof info === "number") {
                query = "select *  from users where id = $1 and status != 1";
            }
            let result = yield app_1.pg.query(query, [info]);
            return (0, class_transformer_1.plainToInstance)(dto_1.UserEntity, result.rows[0]);
        });
    }
    isNickName(nickName) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield app_1.pg.query("select * from users where nickname = $1", [
                nickName,
            ]);
            return result.rows.length >= 1;
        });
    }
    updatePoint(info, deduct) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.isUser(info);
            const rest = user.point + deduct;
            if (rest < 0) {
                logger_1.log.error(`${user} 포인트 모자람 현재 포인트 : ${user.point}`);
                throw new Error("포인트 모자랍니다 !");
            }
            if (typeof info === "string") {
                yield app_1.pg.query(`update users set point = $1 where email = $2`, [
                    rest,
                    info,
                ]);
            }
            else if (typeof info === "number") {
                yield app_1.pg.query(`update users set point = $1 where id = $2`, [rest, info]);
            }
        });
    }
    getAllUsersCount() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield app_1.pg.query(`select max(id) from users `);
            return result.rows[0];
        });
    }
    userStatusUpdate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield app_1.pg
                .query("UPDATE users SET status = 1 WHERE id=($1) and status = 0", [id])
                .then((res) => {
                if (res.rowCount === 0) {
                    throw new Error("이미 탈퇴 처리 된 회원입니다.");
                }
                return this.userInfo(id);
            });
        });
    }
    userGrade(grade, reviewId) {
        return __awaiter(this, void 0, void 0, function* () {
            const review = yield reviewModel_1.reviewModel.getReview(reviewId);
            const id = review.userId;
            const row = yield app_1.pg.query("UPDATE users SET grade =(grade +($1))WHERE id=($2)", [grade, id]);
            return row.rowCount === 1;
        });
    }
    updateAvg(avg, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const formattedAvg = avg.toFixed(2);
            const update = yield app_1.pg.query(`update users SET avg = $1 where id = (select user_id from review where id = $2)`, [formattedAvg, id]);
            return update.rowCount === 1;
        });
    }
    getGrade(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const grade = yield app_1.pg.query("SELECT grade FROM users WHERE id = (select user_id from review where id = $1)", [id]);
            return grade.rows[0].grade;
        });
    }
    updateNickname(nickName, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const update = yield app_1.pg.query("UPDATE users SET nickname = $1 where id= $2", [nickName, userId]);
            return update.rowCount === 1;
        });
    }
}
exports.UserModel = UserModel;
exports.userModel = new UserModel();
//# sourceMappingURL=userModel.js.map