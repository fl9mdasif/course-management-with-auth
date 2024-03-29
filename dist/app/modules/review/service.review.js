"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const mode_user_1 = require("../user/mode.user");
const model_review_1 = require("./model.review");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createReview = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUser = yield mode_user_1.User.isUserExists(user.username);
    const userId = isUser === null || isUser === void 0 ? void 0 : isUser._id;
    const newReview = Object.assign(Object.assign({}, payload), { createdBy: userId });
    const result = (yield model_review_1.Review.create(newReview)).populate('createdBy');
    return result;
});
exports.reviewService = {
    createReview,
};
