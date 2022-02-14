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
// import * as dal from "../dal/dalUser";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Check if user have an authorized token
 * @augments x-auth-token should be in request header.
 */
const requireUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).json({ message: "User not authorized" });
    }
    console.log("token verified.");
    jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.log("jwt not verified.");
            return res.status(400).json({ message: "User not authorized" });
        }
        // const users = await dal.getAllUsers();
        console.log("jwt verified.");
        next();
    }));
});
exports.default = requireUser;
//# sourceMappingURL=auth.js.map