"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.point = exports.userEnum = exports.postStatus = void 0;
var postStatus;
(function (postStatus) {
    postStatus["PENDING"] = "pending";
    postStatus["COMPLETE"] = "complete";
})(postStatus || (postStatus = {}));
exports.postStatus = postStatus;
var userEnum;
(function (userEnum) {
    userEnum["USER"] = "user";
    userEnum["GUEST"] = "guest";
})(userEnum || (userEnum = {}));
exports.userEnum = userEnum;
var point;
(function (point) {
    point[point["POST"] = -3] = "POST";
    point[point["REVIEW"] = 5] = "REVIEW";
})(point || (point = {}));
exports.point = point;
//# sourceMappingURL=index.js.map