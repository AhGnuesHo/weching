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
exports.rankModel = exports.RankModel = void 0;
const app_1 = require("../app");
const types_1 = require("../types");
class RankModel {
    // 해당 월을 구하는 쿼리를 계속 수행하기보다 thisMonth함수에서 이번 달을 구하고, 필요한 곳에서 쓰려고 하는데
    // 에러가 나서 쓰지 못하고 있습니다 어떻게 개선해야할까요?
    thisMonth() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield app_1.pg.query(types_1.query.MONTH)).rows[0];
        });
    }
    getRank(rankPg) {
        return __awaiter(this, void 0, void 0, function* () {
            const ranking = yield rankPg.query("select (ROW_NUMBER() OVER()) AS rank , best.id, best.avg FROM  ( select * FROM users where  avg is not null and status = 0 ORDER BY avg desc ) as best LIMIT 10");
            return ranking.rows;
        });
    }
    setNewRank() {
        return __awaiter(this, void 0, void 0, function* () {
            const rankPg = yield app_1.pg.connect();
            try {
                rankPg.query("begin");
                const newRank = yield this.getRank(rankPg);
                yield Promise.all(newRank.map((rank) => rankPg.query(`insert into best (rank, month, user_id) values (${rank.rank}, ${types_1.query.MONTH}, ${rank.id}) `)));
                yield this.updateCurrRank(rankPg);
            }
            catch (err) {
                yield rankPg.query("rollback");
                throw err;
            }
            finally {
                yield rankPg.query("commit");
                rankPg.release();
            }
        });
    }
    updateCurrRank(rankPg) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRank = (yield rankPg.query(`select id, grade from users`)).rows;
            const thisMonth = yield this.thisMonth();
            yield Promise.all(userRank.map((rank) => rankPg.query(`insert into rank (user_id, month, grade) values (${rank.id},${types_1.query.MONTH} , ${rank.grade}) `)));
        });
    }
    resetRank() {
        return __awaiter(this, void 0, void 0, function* () {
            const allCount = (yield app_1.pg.query("select count (*) from users")).rows[0];
            const poolClient = yield app_1.pg.connect();
            try {
                yield poolClient.query("begin");
                const updateCount = yield poolClient.query(` `);
                if (allCount !== updateCount.rowCount) {
                    throw new Error(`업데이트 실패 : 전체 유저수 ${allCount}, 업데이트 유저수 : ${updateCount.rowCount}`);
                }
            }
            catch (e) {
                yield poolClient.query("rollback");
                throw e;
            }
            finally {
                yield poolClient.query("commit");
                poolClient.release();
            }
        });
    }
    getBest() {
        return __awaiter(this, void 0, void 0, function* () {
            const thisMonth = yield this.thisMonth();
            const best = yield app_1.pg.query(`select  ranker.rank, ranker.user_id, users.nickname, users.grade , users.avg
    from 
    (select user_id, rank from best where month = ${types_1.query.MONTH})
    as ranker
    join users as users
    on ranker.user_id = users.id
    order by ranker.rank `);
            return best.rows;
        });
    }
}
exports.RankModel = RankModel;
exports.rankModel = new RankModel();
//# sourceMappingURL=rankModel.js.map