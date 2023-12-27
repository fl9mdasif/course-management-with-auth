"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const validation_course_1 = require("./validation.course");
const controller_course_1 = require("./controller.course");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(validation_course_1.CourseValidation.CreateCourseValidationSchema), controller_course_1.courseControllers.createCourse);
router.get('/best', controller_course_1.courseControllers.findBestCourse);
exports.courseRoute = router;
