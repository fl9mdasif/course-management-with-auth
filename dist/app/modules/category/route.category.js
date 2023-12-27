"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const validation_category_1 = require("./validation.category");
const controller_category_1 = require("./controller.category");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(validation_category_1.CategoryValidation.createCategoryValidationSchema), controller_category_1.categoryControllers.createCategory);
router.get('/', controller_category_1.categoryControllers.getAllCategory);
exports.categoryRoute = router;
