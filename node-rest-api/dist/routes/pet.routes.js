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
// let express = require('express');
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const petController = __importStar(require("../controllers/petController"));
const joiMiddleware_1 = __importDefault(require("../middleware/joiMiddleware"));
const auth_1 = __importDefault(require("../middleware/auth"));
const petValidators_1 = require("../middleware/petValidators");
router.get('/', auth_1.default, petController.getAll);
router.get('/under3', auth_1.default, petController.getAllUnder3);
router.post('/create', [(0, joiMiddleware_1.default)(petValidators_1.createSchema), auth_1.default], petController.create);
router.put('/update/:id', [(0, joiMiddleware_1.default)(petValidators_1.updateSchema), auth_1.default], petController.update);
router.delete('/delete/:id', auth_1.default, petController.deletePet);
router.get('/pet/:id', auth_1.default, petController.getPetById);
exports.default = router;
//# sourceMappingURL=pet.routes.js.map