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
/* eslint-disable @typescript-eslint/no-explicit-any */
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./app/router"));
const app = (0, express_1.default)();
// parser middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application routes
// /api/v1/students/create-student
app.use('/api', router_1.default);
app.get('/', (req, res) => {
    res.send('Hello from course management');
});
const test = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const a = 10;
    res.send(a);
});
app.get('/a', test);
// not found middleware with http-status
app.use(notFound_1.default);
// global err handler middleware. must declare it in the last off the file
app.use(globalErrorHandler_1.default);
exports.default = app;
