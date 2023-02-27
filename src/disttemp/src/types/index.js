"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EReview = exports.query = void 0;
var query;
(function (query) {
    query["MONTH"] = "(select to_date(to_char(now(), 'yyyy-mm'),'yyyy-mm'))";
})(query = exports.query || (exports.query = {}));
var EReview;
(function (EReview) {
    EReview[EReview["LIMIT_COUNT"] = 10] = "LIMIT_COUNT";
    EReview[EReview["TARGET_USER"] = 3] = "TARGET_USER";
    EReview[EReview["LIMIT_USER_NUMBER"] = 15] = "LIMIT_USER_NUMBER";
})(EReview = exports.EReview || (exports.EReview = {}));
//# sourceMappingURL=index.js.map