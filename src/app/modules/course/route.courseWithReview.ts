import express from 'express';

import { courseControllers } from './controller.course';
import auth from '../../middlewares/auth';

const router = express.Router();

router.put('/:courseId', courseControllers.updateCourse);

router.get('/:courseId/reviews', courseControllers.getSingleCourseWithReview);
router.get('/', auth('admin'), courseControllers.getAllCourse);

export const courseWithReviewRouter = router;
