"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route_category_1 = require("../modules/category/route.category");
const route_course_1 = require("../modules/course/route.course");
const route_review_1 = require("../modules/review/route.review");
const route_auth_1 = require("../modules/auth/route.auth");
const route2_1 = require("../modules/course/route2");
const router = (0, express_1.Router)();
const moduleRoute = [
    {
        path: '/categories',
        route: route_category_1.categoryRoute,
    },
    {
        path: '/courses',
        route: route_course_1.courseRoute,
    },
    {
        path: '/reviews',
        route: route_review_1.reviewRouter,
    },
    {
        path: '/course',
        route: route2_1.bestCourseRoute,
    },
    {
        path: '/auth',
        route: route_auth_1.userRoute,
    },
];
moduleRoute.forEach((routeObj) => router.use(routeObj.path, routeObj.route));
exports.default = router;
