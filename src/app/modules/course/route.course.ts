import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidation } from './validation.course';
import { courseControllers } from './controller.course';

const router = express.Router();

router.post(
  '/',
  validateRequest(CourseValidation.CreateCourseValidationSchema),
  courseControllers.createCourse,
);
router.get('/best', courseControllers.findBestCourse);

export const courseRoute = router;
