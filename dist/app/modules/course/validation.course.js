"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const constant_course_1 = require("./constant.course");
// Zod schema for the Tag object
const TagSchema = zod_1.default.object({
    name: zod_1.default.string(),
    isDeleted: zod_1.default.boolean(),
});
// Zod schema for the CourseDetails object
const CourseDetailsSchema = zod_1.default.object({
    level: zod_1.default.enum([...constant_course_1.CourseLevel]),
    description: zod_1.default.string(),
});
// Zod schema for the Course object
const CreateCourseValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string(),
        instructor: zod_1.default.string(),
        categoryId: zod_1.default.string(),
        price: zod_1.default.number(),
        tags: zod_1.default.array(TagSchema),
        startDate: zod_1.default.string(),
        endDate: zod_1.default.string(),
        language: zod_1.default.string(),
        provider: zod_1.default.string(),
        durationInWeeks: zod_1.default.number().optional(),
        details: CourseDetailsSchema,
    }),
});
// update
// Zod schema for the Course object
const UpdateCourseValidationSchema = zod_1.default.object({
    title: zod_1.default.string().optional(),
    instructor: zod_1.default.string().optional(),
    categoryId: zod_1.default.string().optional(),
    price: zod_1.default.number().optional(),
    tags: zod_1.default.array(TagSchema).optional(),
    startDate: zod_1.default.string().optional(),
    endDate: zod_1.default.string().optional(),
    language: zod_1.default.string().optional(),
    provider: zod_1.default.string().optional(),
    durationInWeeks: zod_1.default.number().optional(),
    details: CourseDetailsSchema.optional(),
});
exports.CourseValidation = {
    CreateCourseValidationSchema,
    UpdateCourseValidationSchema,
};
