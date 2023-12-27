import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidation } from './validation.category';
import { categoryControllers } from './controller.category';

const router = express.Router();

router.post(
  '/',
  validateRequest(CategoryValidation.createCategoryValidationSchema),
  categoryControllers.createCategory,
);
router.get('/', categoryControllers.getAllCategory);

export const categoryRoute = router;
