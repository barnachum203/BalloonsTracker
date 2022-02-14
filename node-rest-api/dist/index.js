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
const express_1 = __importDefault(require("express"));
// let express = require("express"),
// import path from 'path';
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
// path = require("path"),
// cors = require("cors"),
// bodyParser = require("body-parser");
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: "./environment.env" });
const db = __importStar(require("./db"));
// require("dotenv").config({ path: "./environment.env" });
// require("./db").connect();
db.connect();
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const pet_routes_1 = __importDefault(require("./routes/pet.routes"));
// const { string } = require("joi");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: false,
}));
app.use((0, cors_1.default)());
// API root
app.use("/api", user_routes_1.default);
app.use("/api/pets", pet_routes_1.default);
// PORT
// const port: number = Number(process.env.PORT) || 8000;
const port = process.env.PORT || "8000";
app.listen(port, () => {
    console.log("Listening on port " + port);
});
//# sourceMappingURL=index.js.map