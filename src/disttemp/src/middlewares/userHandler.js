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
exports.updateHandler = exports.checkName = exports.expireUser = exports.checkEmail = void 0;
const logger_1 = require("../logger");
const userModel_1 = require("../model/userModel");
function checkEmail(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.body;
        try {
            const isUser = yield userModel_1.userModel.isUser(email);
            if (isUser) {
                logger_1.log.warn(`${email}은 사용 중인 이메일 입니다.`);
                res
                    .status(400)
                    .send({ state: false, message: `${email}은 사용 중인 이메일 입니다.` });
                return;
            }
            next();
        }
        catch (err) {
            next(err);
        }
    });
}
exports.checkEmail = checkEmail;
const expireUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        if (status !== 0) {
            res.status(400).send({ message: `탈퇴한 회원입니다.` });
            return;
        }
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.expireUser = expireUser;
const checkName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nickName } = req.body;
        const isNickName = yield userModel_1.userModel.isNickName(nickName);
        if (isNickName) {
            logger_1.log.warn(`${nickName} 은(는) 존재하는 닉네임입니다. `);
            res.status(400).json({
                state: false,
                message: `${nickName}은 존재하는 닉네임 입니다.`,
            });
            return;
        }
        if (nickName.length > 12) {
            logger_1.log.warn('닉네임 너무 길다 :' + nickName.Length);
            res
                .status(400)
                .json({ state: false, message: `닉네임은 12자까지 가능합니다` });
            return;
        }
        req.body.nameState = true;
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.checkName = checkName;
const updateHandler = (req, res, next) => {
    try {
        const { nameState } = req.body;
        if (!nameState) {
            res.status(400).send({ message: '중복 검사 해주세요' });
            return;
        }
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.updateHandler = updateHandler;
//# sourceMappingURL=userHandler.js.map