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
exports.courseControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const service_course_1 = require("./service.course");
const sendResponse_1 = require("../../utils/sendResponse");
const model_course_1 = require("./model.course");
// create course
const createCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.user);
    const result = yield service_course_1.courseServices.createCourse(req.user, req.body);
    sendResponse_1.response.createSendResponse(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Course created successfully',
        data: result,
    });
}));
// get all course
const getAllCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_course_1.courseServices.getAllCourses(req.query);
    // Get the total number of documents
    let total = 0;
    const page = req.query.page;
    const limit = req.query.limit;
    // show total if limit query not used
    if (!req.query) {
        const res = yield model_course_1.Course.find();
        total = res.length;
    }
    else {
        total = result.length;
    }
    sendResponse_1.response.getSendResponse(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        meta: {
            page: Number(page ? page : 1),
            limit: Number(limit ? limit : 10),
            total: Number(total),
            // total: 0,
        },
        message: 'Course retrieved successfully',
        data: result,
    });
}));
// Get single course with reviews
const getSingleCourseWithReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    // console.log({ courseId });
    const course = yield service_course_1.courseServices.getSingleCourseWithReview(courseId);
    sendResponse_1.response.createSendResponse(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Course and Reviews retrieved successfully',
        data: { course },
    });
}));
// findBestCourse
const findBestCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield service_course_1.courseServices.findBestCourse();
    sendResponse_1.response.createSendResponse(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Best course retrieved successfully',
        data: { course },
    });
}));
// update course
const updateCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const updatedData = req.body;
    const result = yield service_course_1.courseServices.updateCourse(courseId, updatedData);
    sendResponse_1.response.createSendResponse(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Course updated successfully',
        data: result,
    });
}));
exports.courseControllers = {
    createCourse,
    getAllCourse,
    getSingleCourseWithReview,
    findBestCourse,
    updateCourse,
};
