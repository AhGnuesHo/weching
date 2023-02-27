"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DtoValidatorMiddleware = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const DtoValidatorMiddleware = (type, skipMissingProperties = false) => {
    return (req, res, next) => {
        const dto = (0, class_transformer_1.plainToInstance)(type, req.body);
        (0, class_validator_1.validateOrReject)(dto, { skipMissingProperties })
            .then(() => {
            req.body = dto;
            next();
        })
            .catch((errors) => {
            const errorsMessageArray = [];
            errors.forEach((errors) => {
                errorsMessageArray.push(...Object.values(errors.constraints));
            });
            return res.status(400).json({
                message: errorsMessageArray,
            });
        });
    };
};
exports.DtoValidatorMiddleware = DtoValidatorMiddleware;
//# sourceMappingURL=validation.js.map