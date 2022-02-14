"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
// const mongoose = require("mongoose");
const mongoose_1 = __importDefault(require("mongoose"));
// require("dotenv").config({ path: "./environment.env" });
const MONGO_URI = process.env.MONGO_URI;
const connect = () => {
    // Connecting to the database
    mongoose_1.default
        .connect(MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    })
        .then(() => {
        console.log("Successfully connected to database");
    })
        .catch((error) => {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
    });
};
exports.connect = connect;
//# sourceMappingURL=db.js.map