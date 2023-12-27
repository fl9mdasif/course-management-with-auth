"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userZodValidationSchema = void 0;
const zod_1 = require("zod");
const userRegistrationValidation = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string().min(1).max(50),
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(5),
        role: zod_1.z.string().min(1),
    }),
});
exports.userZodValidationSchema = {
    userRegistrationValidation,
};
