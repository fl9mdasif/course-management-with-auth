import { Router } from 'express';
import { categoryRoute } from '../modules/category/route.category';
import { courseRoute } from '../modules/course/route.course';
import { reviewRouter } from '../modules/review/route.review';
import { courseWithReviewRouter } from '../modules/course/route.courseWithReview';
import { userRoute } from '../modules/auth/route.auth';

const router = Router();

const moduleRoute = [
  {
    path: '/categories',
    route: categoryRoute,
  },
  {
    path: '/course',
    route: courseRoute,
  },
  {
    path: '/courses',
    route: courseWithReviewRouter,
  },
  {
    path: '/reviews',
    route: reviewRouter,
  },
  {
    path: '/auth',
    route: userRoute,
  },
];

moduleRoute.forEach((routeObj) => router.use(routeObj.path, routeObj.route));

export default router;
