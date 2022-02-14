"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerSchema = joi_1.default.object().keys({
    password: joi_1.default.string().min(3).max(30).required(),
    email: joi_1.default.string().email().required(),
    first_name: joi_1.default.string().required(),
    last_name: joi_1.default.string(),
    created: joi_1.default.date(),
});
exports.loginSchema = joi_1.default.object().keys({
    password: joi_1.default.string().min(3).max(30).required(),
    email: joi_1.default.string().email().required(),
});
//# sourceMappingURL=userValidators.js.map