import { Router } from 'express';
import { categoryRoute } from '../modules/category/route.category';
import { courseRoute } from '../modules/course/route.course';
import { reviewRouter } from '../modules/review/route.review';
import { userRoute } from '../modules/auth/route.auth';

const router = Router();

const moduleRoute = [
  {
    path: '/categories',
    route: categoryRoute,
  },

  {
    path: '/courses',
    route: courseRoute,
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
