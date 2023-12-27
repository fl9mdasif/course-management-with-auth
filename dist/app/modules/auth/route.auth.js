"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const controller_user_1 = require("../user/controller.user");
const validation_user_1 = require("../user/validation.user");
const validation_auth_1 = require("./validation.auth");
const controller_auth_1 = require("./controller.auth");
const constant_user_1 = require("../user/constant.user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
// register a user
router.post('/register', (0, validateRequest_1.default)(validation_user_1.userZodValidationSchema.userRegistrationValidation), controller_user_1.userControllers.registerUser);
// login a user
router.post('/login', (0, validateRequest_1.default)(validation_auth_1.authValidations.loginValidationSchema), controller_auth_1.authControllers.loginUser);
router.post('/change-password', (0, auth_1.default)(constant_user_1.USER_ROLE.admin, constant_user_1.USER_ROLE.user), (0, validateRequest_1.default)(validation_auth_1.authValidations.changePasswordValidationSchema), controller_auth_1.authControllers.changePassword);
exports.userRoute = router;
