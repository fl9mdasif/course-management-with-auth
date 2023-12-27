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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const service_category_1 = require("./service.category");
const sendResponse_1 = require("../../utils/sendResponse");
const createCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_category_1.categoryServices.createCategory(req.body);
    sendResponse_1.response.createSendResponse(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Category created successfully',
        data: result,
    });
}));
const getAllCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_category_1.categoryServices.getAllCategory();
    sendResponse_1.response.createSendResponse(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Categories retrieved successfully',
        data: result,
    });
}));
exports.categoryControllers = {
    createCategory,
    getAllCategory,
};