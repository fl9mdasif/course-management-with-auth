import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userControllers } from '../user/controller.user';
import { userZodValidationSchema } from '../user/validation.user';
import { loginValidationSchema } from './validation.auth';
import { authControllers } from './controller.auth';

const router = express.Router();

// register a user
router.post(
  '/register',
  validateRequest(userZodValidationSchema.userRegistrationValidation),
  userControllers.registerUser,
);

// login a user
router.post(
  '/login',
  validateRequest(loginValidationSchema),
  authControllers.loginUser,
);

// router.post(
//     '/change-password',
//     auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
//     validateRequest(authValidation.changePasswordValidationSchema),
//     AuthControllers.changePassword,
//   );
export const userRoute = router;
