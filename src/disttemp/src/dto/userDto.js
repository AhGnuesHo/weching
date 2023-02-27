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
exports.UserEntity = exports.UserDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
require("reflect-metadata");
class UserDto {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.MaxLength)(12),
    __metadata("design:type", String)
], UserDto.prototype, "nickName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UserDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UserDto.prototype, "point", void 0);
exports.UserDto = UserDto;
class UserEntity {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "nickname" }),
    (0, class_validator_1.MaxLength)(12),
    __metadata("design:type", String)
], UserEntity.prototype, "nickName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UserEntity.prototype, "point", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "post_count" }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UserEntity.prototype, "postCount", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "review_count" }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UserEntity.prototype, "reviewCount", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UserEntity.prototype, "rankgrade", void 0);
exports.UserEntity = UserEntity;
//# sourceMappingURL=userDto.js.map