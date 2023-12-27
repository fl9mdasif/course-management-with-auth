"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(statusCode, errorMessage, message, stack = '') {
        super(message);
        this.statusCode = statusCode;
        this.errorMessage = errorMessage;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = AppError;
