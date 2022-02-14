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
exports.UserModel = void 0;
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        // required: true,
        unique: true,
        // lowercase: true,
    },
    password: {
        type: String,
        // required: true,
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    age: {
        type: Number,
    },
    created: {
        type: Date,
        default: Date.now(),
    },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: "updatedAt",
        // collection: "users"
    }
});
//hash password before the "save"
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcryptjs_1.default.genSalt();
        this.password = yield bcryptjs_1.default.hash(this.password, salt);
        next();
    });
});
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
// export default model("User", userSchema)
// const User = mongoose.model("User", userSchema);
// module.exports = {
//   User
// };
//# sourceMappingURL=user.js.map