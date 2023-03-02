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
exports.PostEntity = exports.PostDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const interfaces_1 = require("../interfaces");
require("reflect-metadata");
class PostDto {
    paramToNumber(param) {
        return parseInt(param);
    }
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PostDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PostDto.prototype, "userId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PostDto.prototype, "content", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PostDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Number)
], PostDto.prototype, "paramToNumber", null);
exports.PostDto = PostDto;
class PostEntity {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PostEntity.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "user_id" }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PostEntity.prototype, "userId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PostEntity.prototype, "content", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PostEntity.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "reviews" }),
    __metadata("design:type", Array)
], PostEntity.prototype, "reviews", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "is_checked" }),
    __metadata("design:type", Number)
], PostEntity.prototype, "isChecked", void 0);
exports.PostEntity = PostEntity;
//# sourceMappingURL=postDto.js.map