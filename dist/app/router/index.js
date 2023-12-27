"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route_category_1 = require("../modules/category/route.category");
const route_course_1 = require("../modules/course/route.course");
const route_review_1 = require("../modules/review/route.review");
const route_courseWithReview_1 = require("../modules/course/route.courseWithReview");
const router = (0, express_1.Router)();
const moduleRoute = [
    {
        path: '/categories',
        route: route_category_1.categoryRoute,
    },
    {
        path: '/course',
        route: route_course_1.courseRoute,
    },
    {
        path: '/courses',
        route: route_courseWithReview_1.courseWithReviewRouter,
    },
    {
        path: '/reviews',
        route: route_review_1.reviewRouter,
    },
];
moduleRoute.forEach((routeObj) => router.use(routeObj.path, routeObj.route));
exports.default = router;
