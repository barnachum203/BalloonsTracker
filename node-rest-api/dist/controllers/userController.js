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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.deleteUser = exports.login = exports.update = exports.register = exports.getAll = void 0;
const userService = __importStar(require("../services/userService"));
/**
 * Get all users:
 *
 * */
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService.getAllUsers();
        res.status(201).json(users);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getAll = getAll;
/**
 * Register new user:
 *
 * */
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("[Register-User]:");
    try {
        const result = yield userService.register(req.body);
        if (!result) {
            console.log("User already exist");
            return res.status(400).json({ message: "User already exist" });
        }
        res.status(201).json({ message: "User created successfully." });
    }
    catch (err) {
        // console.log(err);
        res.status(404).json({ message: err.message });
    }
});
exports.register = register;
/**
 * Update user:
 *
 * */
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { user } = req.body;
    try {
        yield userService.updateUser(user, id);
        res.status(201).json({ message: "User updated." });
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
});
exports.update = update;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("[Login-User]:");
    const { email, password } = req.body;
    try {
        const user = yield userService.login(email, password);
        res.status(201).json({ user: user.user, token: user.token });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.login = login;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("[Delete-User]:");
    const { id } = req.params;
    try {
        // const result = 
        yield userService.deleteUser(id);
        res.status(201).json({ message: "User deleted." });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.deleteUser = deleteUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("[Get-User]:");
    const { id } = req.params;
    try {
        const result = yield userService.getUserById(id);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getUserById = getUserById;
//# sourceMappingURL=userController.js.map