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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mode_user_1 = require("../user/mode.user");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const config_1 = __importDefault(require("../../config"));
const utils_auth_1 = require("./utils.auth");
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //
    // 1. checking if the user is exist
    const user = yield mode_user_1.User.isUserExists(payload.username);
    // console.log(user);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, '', `This user is not found !'`);
    }
    //   2. checking if the password is correct
    if (!(yield mode_user_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password)))
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, '', `Password of '${user.role}' do not matched`);
    // console.log(user);
    // 3. create token and sent to the client
    const jwtPayload = {
        _id: user === null || user === void 0 ? void 0 : user._id,
        username: user.username,
        email: user.email,
        role: user.role,
    };
    // create token
    const accessToken = (0, utils_auth_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    // refresh token
    const refreshToken = (0, utils_auth_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        data: { jwtPayload },
        accessToken,
        refreshToken,
    };
});
// change password
const changePassword = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // 01. checking if the user is exist
    const user = yield mode_user_1.User.isUserExists(userData.username);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, '', 'This user is not found !');
    }
    // 02. checking if the password is correct
    if (!(yield mode_user_1.User.isPasswordMatched(payload.currentPassword, user === null || user === void 0 ? void 0 : user.password)))
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, `${user.role}'s Password do not matched`, '');
    // 03 Check if the new password is different from the current password
    if (payload.currentPassword === payload.newPassword) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, '', 'Password change failed. Ensure the new password is unique and not among the last 2 used');
        return null;
    }
    // 04 hash new password
    const newHashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    // update password
    yield mode_user_1.User.findOneAndUpdate({
        username: userData.username,
        role: userData.role,
    }, {
        password: newHashedPassword,
        passwordChangedAt: new Date(),
    }, { new: true, runValidators: true });
    return user;
});
exports.authServices = {
    loginUser,
    changePassword,
};
