"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseWithReviewRouter = void 0;
const express_1 = __importDefault(require("express"));
const controller_course_1 = require("./controller.course");
const router = express_1.default.Router();
router.put('/:courseId', controller_course_1.courseControllers.updateCourse);
router.get('/:courseId/reviews', controller_course_1.courseControllers.getSingleCourseWithReview);
router.get('/', controller_course_1.courseControllers.getAllCourse);
exports.courseWithReviewRouter = router;
