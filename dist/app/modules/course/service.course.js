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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseServices = void 0;
const model_course_1 = require("./model.course");
const model_review_1 = require("../review/model.review");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const mode_user_1 = require("../user/mode.user");
// create course
const createCourse = (whichUser, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield mode_user_1.User.isUserExists(whichUser.username);
    const userId = user === null || user === void 0 ? void 0 : user._id;
    const newCourse = Object.assign(Object.assign({}, payload), { createdBy: userId });
    const result = yield model_course_1.Course.create(newCourse);
    return result;
});
// get all course
const getAllCourses = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10, sortBy = 'startDate', sortOrder = 'asc', minPrice, maxPrice, tags, startDate, endDate, language, provider, durationInWeeks, level, } = payload;
        //  filter object based on query parameters
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const filter = {};
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice)
                filter.price.$gte = parseFloat(String(minPrice));
            if (maxPrice)
                filter.price.$lte = parseFloat(String(maxPrice));
        }
        if (tags)
            filter['tags.name'] = { $regex: new RegExp(tags, 'i') };
        if (startDate)
            filter.startDate = startDate;
        if (endDate)
            filter.endDate = endDate;
        if (language)
            filter.language = { $regex: new RegExp(language, 'i') };
        if (provider)
            filter.provider = { $regex: new RegExp(provider, 'i') };
        if (durationInWeeks)
            filter.durationInWeeks = parseInt(String(durationInWeeks));
        if (level)
            filter['details.level'] = { $regex: new RegExp(level, 'i') };
        // sort order && sort by
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sort = {};
        sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
        // calculate skip value for pagination
        const skip = (parseInt(String(page)) - 1) * parseInt(String(limit));
        const result = yield model_course_1.Course.find(filter)
            .populate('createdBy')
            .sort(sort)
            .skip(skip)
            .limit(parseInt(String(limit)));
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        throw new Error(err);
    }
});
// getSingleCourseWithReview
const getSingleCourseWithReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(id);
    const singleCourse = yield model_course_1.Course.findById(id)
        .populate('createdBy', '-password')
        .lean();
    // get reviews
    const reviews = yield model_review_1.Review.find({ courseId: id })
        .populate('createdBy', '-password')
        .lean();
    // console.log(reviews);
    const courseWithReviews = Object.assign(Object.assign({}, singleCourse), { reviews: [...reviews] });
    // console.log( courseWithReviews);
    return courseWithReviews;
});
// find best course
const findBestCourse = () => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(id);
    const bestCourse = yield model_course_1.Course.aggregate([
        {
            $lookup: {
                from: 'reviews',
                localField: '_id',
                foreignField: 'courseId',
                as: 'reviews',
            },
        },
        {
            $project: {
                title: 1,
                instructor: 1,
                categoryId: 1,
                price: 1,
                tags: 1,
                startDate: 1,
                endDate: 1,
                language: 1,
                provider: 1,
                durationInWeeks: 1,
                details: 1,
                averageRating: { $avg: '$reviews.rating' },
                reviewCount: { $size: '$reviews' },
            },
        },
        {
            $sort: { averageRating: -1 },
        },
    ]);
    if (bestCourse.length > 0) {
        const result = bestCourse[0];
        return result;
    }
});
// update course
const updateCourse = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const { tags, details } = updatedData, courseRemainingData = __rest(updatedData, ["tags", "details"]);
    // console.log(courseRemainingData);
    // Basic update primitive fields
    const updatedBasicCourseInfo = yield model_course_1.Course.findOneAndUpdate({ _id: id }, { $set: courseRemainingData }, { upsert: true, new: true, runValidators: true });
    if (!updatedBasicCourseInfo) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update basic course');
    }
    // Update non-primitive fields if available
    if (details) {
        const updatedDetails = yield model_course_1.Course.findOneAndUpdate({ _id: id }, {
            $set: {
                'details.level': details.level,
                'details.description': details.description,
            },
        }, { new: true, upsert: true, runValidators: true });
        if (!updatedDetails) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update details');
        }
        return updatedDetails;
    }
    // dynamic Update preRequisiteCourse = tags
    if (tags && tags.length > 0) {
        // Filter out the deleted fields
        const deletedTags = tags
            .filter((el) => el.name && el.isDeleted)
            .map((el) => el.name);
        // Remove deleted Tags
        const deletedCourseTags = yield model_course_1.Course.findByIdAndUpdate(id, {
            $pull: {
                tags: { name: { $in: deletedTags } },
            },
        }, { new: true, runValidators: true });
        if (!deletedCourseTags) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update course');
        }
        // Filter out the new course fields
        const newPreTags = tags === null || tags === void 0 ? void 0 : tags.filter((el) => el.name && !el.isDeleted);
        // console.log(newPreTags);
        const newTags = yield model_course_1.Course.findByIdAndUpdate(id, {
            $addToSet: { tags: { $each: newPreTags } },
        }, {
            upsert: true,
            new: true,
            runValidators: true,
        });
        if (!newTags) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update  dynamic course');
        }
    }
    // result
    const result = yield model_course_1.Course.findById(id).populate('createdBy');
    return result;
});
exports.courseServices = {
    createCourse,
    getAllCourses,
    getSingleCourseWithReview,
    findBestCourse,
    updateCourse,
};
