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
exports.reviewController = exports.ReviewController = void 0;
const services_1 = require("../services");
class ReviewController {
    constructor() {
        this.getReview = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.body;
            const user = yield services_1.reviewService.getReview(userId);
            res.json(user);
        });
        this.writeReview = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const review = req.body;
            const result = yield services_1.reviewService.writeReview(review);
            res.json(result);
        });
        this.gradeReview = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { grade, id, userId } = req.body;
            const result = yield services_1.reviewService.gradeReview(grade, id, userId);
            res.json(result);
        });
        this.reviewBookmark = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const reviewBookmark = yield services_1.reviewService.reviewBookmark(req.body.id);
            res.json(reviewBookmark);
        });
        this.bookmark = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.body;
            const result = yield services_1.reviewService.bookmark(userId);
            res.json(result);
        });
    }
}
exports.ReviewController = ReviewController;
const reviewController = new ReviewController();
exports.reviewController = reviewController;
//# sourceMappingURL=reviewController.js.map