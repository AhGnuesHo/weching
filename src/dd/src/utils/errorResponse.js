"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = void 0;
const errorResponse = (res, type, message) => {
    let statusCode = 500;
    switch (type) {
        case 'FORBIDDEN':
            statusCode = 403;
            break;
        case 'NOTFOUND':
            statusCode = 404;
            break;
        case 'BADREQUEST':
            statusCode = 400;
            break;
        case 'SERVERERROR':
            statusCode = 500;
            break;
        default:
            break;
    }
    res.status(statusCode).json({ message });
};
exports.errorResponse = errorResponse;
//# sourceMappingURL=errorResponse.js.map