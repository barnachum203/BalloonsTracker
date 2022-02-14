"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSchema = exports.createSchema = void 0;
// const Joi = require("joi");
const joi_1 = __importDefault(require("joi"));
exports.createSchema = joi_1.default.object().keys({
    name: joi_1.default.string().max(25).required(),
    type: joi_1.default.string().required(),
    age: joi_1.default.number().required(),
    id: joi_1.default.number(),
    created_at: joi_1.default.date(),
});
exports.updateSchema = joi_1.default.object().keys({
    name: joi_1.default.string().max(25).required(),
    age: joi_1.default.number().required(),
    type: joi_1.default.string().required(),
    id: joi_1.default.number(),
    _id: joi_1.default.string(),
    __v: joi_1.default.number(),
    created_at: joi_1.default.date(),
});
//# sourceMappingURL=petValidators.js.map