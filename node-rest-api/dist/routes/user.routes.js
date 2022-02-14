"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// var express = require('express');
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController = __importStar(require("../controllers/userController"));
const joiMiddleware_1 = __importDefault(require("../middleware/joiMiddleware"));
const userValidators_1 = require("../middleware/userValidators");
const auth_1 = __importDefault(require("../middleware/auth"));
router.get('/', auth_1.default, userController.getAll);
router.post('/register', [(0, joiMiddleware_1.default)(userValidators_1.registerSchema)], userController.register);
router.put('/update/:id', auth_1.default, userController.update);
router.post('/login', [(0, joiMiddleware_1.default)(userValidators_1.loginSchema)], userController.login);
router.delete('/delete/:id', auth_1.default, userController.deleteUser);
router.get('/user/:id', auth_1.default, userController.getUserById);
exports.default = router;
//# sourceMappingURL=user.routes.js.map