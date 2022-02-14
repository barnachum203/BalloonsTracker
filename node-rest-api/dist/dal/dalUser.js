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
exports.deleteUser = exports.createUser = exports.updateUserById = exports.getUserById = exports.getAllUsers = exports.getUserByEmail = void 0;
// const mongoose = require("mongoose");
const user_1 = require("../model/user");
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Get user by email
 */
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.UserModel.findOne({ email });
    return user;
});
exports.getUserByEmail = getUserByEmail;
/**
 * Get all users
 */
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.UserModel.find();
    return users;
});
exports.getAllUsers = getAllUsers;
/**
 * Get one user
 */
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.UserModel.findById(new mongoose_1.default.Types.ObjectId(id));
    return user;
});
exports.getUserById = getUserById;
/**
 * Update user
 */
const updateUserById = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_1.UserModel.findByIdAndUpdate(new mongoose_1.default.Types.ObjectId(id), user);
    return result;
});
exports.updateUserById = updateUserById;
/**
 * Creates new user
 */
const createUser = (userToCreate) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield (0, exports.getUserByEmail)(userToCreate.email);
    if (exist) {
        return null;
    }
    const newUser = yield user_1.UserModel.create(userToCreate);
    return newUser;
});
exports.createUser = createUser;
/**
 * Delete user
 */
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_1.UserModel.findOneAndDelete(userId);
    return result;
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=dalUser.js.map