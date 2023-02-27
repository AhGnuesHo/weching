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
exports.mainModel = exports.Main = void 0;
const dto_1 = require("../dto");
const class_transformer_1 = require("class-transformer");
const rankModel_1 = require("./rankModel");
const model_1 = require(".");
const components_1 = require("../services/components");
const services_1 = require("../services");
class Main {
    mainInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const advice = yield this.getAdvice();
            // 2.
            // 다른 함수들은 직접 this로 불러와서 사용했는데
            // post는 postService의 getPosts에서 게시물과 게시물에 달린 리뷰를 합치는 로직을 거쳐서 가져옵니다
            // postService를 import해서 사용하면 이건 DI에 맞지 않는 것 같은데 어떤 식으로 사용하면 좋을까요?
            const ranking = yield this.getBest();
            const result = {
                advice: advice,
                ranking: ranking,
            };
            return (0, class_transformer_1.plainToInstance)(dto_1.MainEntity, result);
        });
    }
    userMainInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userInfo(id);
            const todoReview = yield this.todoReview(id);
            const posts = yield services_1.postService.getPosts(id);
            return { user, todoReview, posts };
        });
    }
}
exports.Main = Main;
(0, components_1.applyMixins)(Main, [model_1.ReviewModel, model_1.UserModel, model_1.AdviceModel, model_1.PostModel, rankModel_1.RankModel]);
exports.mainModel = new Main();
//# sourceMappingURL=mainModel.js.map