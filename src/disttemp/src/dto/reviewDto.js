"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewEntity = exports.ReviewDto = void 0;
const class_transformer_1 = require("class-transformer");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
const postDto_1 = require("./postDto");
class ReviewDto {
}
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ReviewDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], ReviewDto.prototype, "postId", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], ReviewDto.prototype, "userId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReviewDto.prototype, "content", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ReviewDto.prototype, "grade", void 0);
exports.ReviewDto = ReviewDto;
class ReviewEntity {
}
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ReviewEntity.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => postDto_1.PostEntity),
    (0, class_transformer_1.Expose)({ name: 'post_id' }),
    __metadata("design:type", postDto_1.PostEntity)
], ReviewEntity.prototype, "postId", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_transformer_1.Expose)({ name: 'user_id' }),
    __metadata("design:type", Number)
], ReviewEntity.prototype, "userId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReviewEntity.prototype, "content", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ReviewEntity.prototype, "grade", void 0);
exports.ReviewEntity = ReviewEntity;
//# sourceMappingURL=reviewDto.js.map