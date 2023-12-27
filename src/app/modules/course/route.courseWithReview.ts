import express from 'express';

import { courseControllers } from './controller.course';

const router = express.Router();

router.put('/:courseId', courseControllers.updateCourse);

router.get('/:courseId/reviews', courseControllers.getSingleCourseWithReview);
router.get('/', courseControllers.getAllCourse);

export const courseWithReviewRouter = router;
