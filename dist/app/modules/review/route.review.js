"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRouter = void 0;
const express_1 = __importDefault(require("express"));
const controller_review_1 = require("./controller.review");
const validation_review_1 = require("./validation.review");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(validation_review_1.reviewValidationSchema), controller_review_1.reviewController.createReview);
exports.reviewRouter = router;
