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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const mongoose_1 = require("mongoose");
const constant_course_1 = require("./constant.course");
const utils_course_1 = require("./utils.course");
const courseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    instructor: { type: String, required: true },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    price: { type: Number, required: true },
    tags: [
        {
            name: { type: String, required: true },
            isDeleted: { type: Boolean, required: true },
        },
    ],
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    language: { type: String, required: true },
    provider: { type: String, required: true },
    durationInWeeks: { type: Number },
    details: {
        level: {
            type: String,
            enum: {
                values: constant_course_1.CourseLevel,
                message: '{VALUE} is not a valid gender',
            },
            required: true,
        },
        description: { type: String },
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
});
// Pre-hook to calculate durationInWeeks before saving
courseSchema.pre('save', function (next) {
    if (this.startDate && this.endDate) {
        const startDate = new Date(this.startDate);
        const endDate = new Date(this.endDate);
        // Calculate durationInWeeks using ceil function
        const durationInWeeks = (0, utils_course_1.calculateDurationInWeeks)(startDate, endDate);
        this.durationInWeeks = durationInWeeks;
        // console.log(this);
    }
    next();
});
// Pre-save middleware
courseSchema.pre('findOneAndUpdate', function (next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const singleCourse = yield this.model.findOne(this.getQuery());
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const update = this.getUpdate();
        // Update the durationWeek field based on the document being updated
        if ('$set' in update) {
            const startDate = new Date(((_a = update === null || update === void 0 ? void 0 : update.$set) === null || _a === void 0 ? void 0 : _a.startDate) || singleCourse.startDate);
            const endDate = new Date(((_b = update === null || update === void 0 ? void 0 : update.$set) === null || _b === void 0 ? void 0 : _b.endDate) || singleCourse.endDate);
            if (singleCourse && (startDate || endDate)) {
                const durationInWeeks = (0, utils_course_1.calculateDurationInWeeks)(startDate, endDate);
                // console.log(durationInWeeks);
                singleCourse.durationInWeeks = durationInWeeks;
            }
        }
        // Save the document to persist the changes
        yield singleCourse.save();
        next();
    });
});
exports.Course = (0, mongoose_1.model)('Course', courseSchema);
