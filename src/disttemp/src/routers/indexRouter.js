"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexRouter = void 0;
const indexRouter = (req, res, next) => {
    // res.redirect("../../client/build/index.html");
    res.redirect("/api/main");
};
exports.indexRouter = indexRouter;
//# sourceMappingURL=indexRouter.js.map