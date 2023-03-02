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
exports.userService = exports.UserService = void 0;
const index_1 = require("./../types/index");
const model_1 = require("../model");
const interfaces_1 = require("../interfaces");
class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.userModel.createUser(user);
        });
    }
    isUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.userModel.isUser(email);
        });
    }
    findUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield model_1.userModel.userInfo(id);
            const rank = yield model_1.userModel.rankInfo(id);
            return { user, rank };
        });
    }
    userStatusUpdate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.userModel.userStatusUpdate(id);
        });
    }
    userGradeUpdate(grade, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doGrade = yield model_1.userModel.userGrade(grade, id);
            if (!doGrade) {
                throw new Error("평가 실패");
            }
            const result = yield this.getGradeAvg(id);
            return result;
        });
    }
    updateAvg(id, avg) {
        return __awaiter(this, void 0, void 0, function* () {
            const update = yield model_1.userModel.updateAvg(avg, id);
            if (!update) {
                throw new Error("평가 실패 :평균 업데이트 실패");
            }
            return update;
        });
    }
    updatePoint(writerEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.userModel.updatePoint(writerEmail, interfaces_1.point.REVIEW);
        });
    }
    getGradeAvg(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const reviewCount = yield model_1.reviewModel.getDoneReviewCountThisMonth(id);
            const grade = yield model_1.userModel.getGrade(id);
            const newAvg = reviewCount / grade;
            if (reviewCount > index_1.EReview.LIMIT_COUNT) {
                yield this.updateAvg(id, newAvg);
            }
            const result = {
                reviewCount: reviewCount,
                currGrade: grade,
                newAvg: newAvg,
            };
            return result;
        });
    }
    updateNickname(nickname, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield model_1.userModel.updateNickname(nickname, userId);
            if (!result) {
                throw new Error("fail update NickName");
            }
            return result;
        });
    }
}
exports.UserService = UserService;
const userService = new UserService(model_1.userModel);
exports.userService = userService;
//# sourceMappingURL=userService.js.map