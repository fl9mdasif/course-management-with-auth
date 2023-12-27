"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bestCourseRoute = void 0;
const express_1 = __importDefault(require("express"));
const controller_course_1 = require("./controller.course");
const router = express_1.default.Router();
router.get('/best', controller_course_1.courseControllers.findBestCourse);
exports.bestCourseRoute = router;
