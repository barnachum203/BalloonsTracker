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
exports.getUserById = exports.deleteUser = exports.login = exports.updateUser = exports.register = exports.getAllUsers = void 0;
// const dal = require("../dal/dalUser");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const dal = __importStar(require("../dal/dalUser"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Get all users:
 *
 * */
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield dal.getAllUsers();
        console.log(`[USER-SERV] - send ${users.length} users`);
        return users;
    }
    catch (error) {
        throw Error(error);
    }
});
exports.getAllUsers = getAllUsers;
/**
 * Register new user:
 *
 * */
const register = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield dal.createUser(user);
        if (!result) {
            console.log("[USER-SERV]: User already exist");
            throw Error("User already exist");
        }
        console.log("[USER-SERV]: User created successfully.");
        return { user };
    }
    catch (err) {
        throw Error(err);
    }
});
exports.register = register;
/**
 * Update user:
 *
 * */
const updateUser = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield dal.updateUserById(id, user);
    if (!updatedUser) {
        console.log("[USER-SERV]: User is not updated");
        throw Error("User is not updated");
    }
    console.log("[USER-SERV]: User updated.");
    return updatedUser;
});
exports.updateUser = updateUser;
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield dal.getUserByEmail(email);
        if (user) {
            const auth = yield bcryptjs_1.default.compare(password, user.password);
            if (auth) {
                const token = creatToken(user._id);
                console.log("[USER-SERV]: User logged in: " + user.email);
                return { user: user, token: token };
            }
            else {
                console.log("[USER-SERV]: incorrect password");
                throw Error("incorrect password");
            }
        }
        else {
            console.log("[USER-SERV]: incorrect email");
            throw Error("incorrect email");
        }
    }
    catch (error) {
        console.log("[USER-SERV]: " + error.message);
        throw Error(error.message);
    }
});
exports.login = login;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield dal.deleteUser(id);
    if (!result) {
        console.log("[USER-SERV]: User is not deleted.");
        throw Error("User is not deleted.");
    }
    console.log("[USER-SERV]: User deleted: " + id);
    return result;
});
exports.deleteUser = deleteUser;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield dal.getUserById(id);
    if (!result) {
        throw Error("User is not exist");
    }
    console.log("[USER-SERV]: Sent user: " + id);
    return result;
});
exports.getUserById = getUserById;
/**
 * JWT
 */
const maxAge = 2 * 24 * 60 * 60; //2d
const creatToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: maxAge });
};
//# sourceMappingURL=userService.js.map