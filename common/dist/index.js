"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogUpdate = exports.blogInit = exports.signinReq = exports.signupReq = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupReq = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8),
    name: zod_1.default.string().optional()
});
exports.signinReq = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8),
});
exports.blogInit = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
});
exports.blogUpdate = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    id: zod_1.default.string()
});
