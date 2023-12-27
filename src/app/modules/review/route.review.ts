import express from 'express';
import { reviewController } from './controller.review';
import { reviewValidationSchema } from './validation.review';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();
router.post(
  '/',
  validateRequest(reviewValidationSchema),
  reviewController.createReview,
);

export const reviewRouter = router;
