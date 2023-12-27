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
exports.categoryServices = void 0;
const model_category_1 = require("./model.category");
const mode_user_1 = require("../user/mode.user");
const createCategory = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUser = yield mode_user_1.User.isUserExists(user.username);
    const userId = isUser === null || isUser === void 0 ? void 0 : isUser._id;
    const newCategory = Object.assign(Object.assign({}, payload), { createdBy: userId });
    const result = yield model_category_1.Category.create(newCategory);
    return result;
});
// get all category
const getAllCategory = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_category_1.Category.find().populate('createdBy', '-password -createdAt -updatedAt');
    return result;
});
exports.categoryServices = {
    createCategory,
    getAllCategory,
};
