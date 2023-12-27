"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("./handleZodError"));
const handleValidationError_1 = __importDefault(require("./handleValidationError"));
const handleCastError_1 = __importDefault(require("./handleCastError"));
const handleDuplicateError_1 = __importDefault(require("./handleDuplicateError"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const config_1 = __importDefault(require("../config"));
// global err handler middleware
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorMessage;
    if (err instanceof zod_1.ZodError) {
        const simplifiedErr = (0, handleZodError_1.default)(err);
        statusCode = simplifiedErr === null || simplifiedErr === void 0 ? void 0 : simplifiedErr.statusCode;
        message = simplifiedErr === null || simplifiedErr === void 0 ? void 0 : simplifiedErr.message;
        errorMessage = simplifiedErr === null || simplifiedErr === void 0 ? void 0 : simplifiedErr.errorMessage;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        const simplifiedErr = (0, handleValidationError_1.default)(err);
        statusCode = simplifiedErr === null || simplifiedErr === void 0 ? void 0 : simplifiedErr.statusCode;
        message = simplifiedErr === null || simplifiedErr === void 0 ? void 0 : simplifiedErr.message;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const simplifiedErr = (0, handleCastError_1.default)(err);
        statusCode = simplifiedErr === null || simplifiedErr === void 0 ? void 0 : simplifiedErr.statusCode;
        message = simplifiedErr === null || simplifiedErr === void 0 ? void 0 : simplifiedErr.message;
        errorMessage = simplifiedErr === null || simplifiedErr === void 0 ? void 0 : simplifiedErr.errorMessage;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const simplifiedErr = (0, handleDuplicateError_1.default)(err);
        statusCode = simplifiedErr === null || simplifiedErr === void 0 ? void 0 : simplifiedErr.statusCode;
        message = simplifiedErr === null || simplifiedErr === void 0 ? void 0 : simplifiedErr.message;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        // errorMessage = err?.errorMessage;
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
    }
    // ultimate return from here
    return res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        errorDetails: err,
        stack: config_1.default.NODE_ENV === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.default = globalErrorHandler;
