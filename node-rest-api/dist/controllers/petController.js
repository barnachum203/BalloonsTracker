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
exports.getPetById = exports.deletePet = exports.update = exports.create = exports.getAllUnder3 = exports.getAll = void 0;
// const petService = require("../services/petService");
const petService = __importStar(require("../services/petService"));
/**
 * Get all pets:
 *
 * */
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pets = yield petService.getAllPets();
        res.status(201).json(pets);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getAll = getAll;
/**
 * Get all pets under age 3:
 *
 * */
const getAllUnder3 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pets = yield petService.getAllPetsUnder3();
        res.status(201).json(pets);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getAllUnder3 = getAllUnder3;
/**
 * Create new pet:
 *
 * */
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("[Create-Pet]:");
    try {
        yield petService.create(req.body);
        res.status(201).json({ message: "Pet created successfully." });
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
});
exports.create = create;
/**
 * Update pet:
 *
 * */
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("[Update-Pet]:");
    const { id } = req.params;
    const pet = req.body;
    try {
        // const result = 
        yield petService.updatePet(pet, id);
        res.status(201).json({ message: "Pet updated." });
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
});
exports.update = update;
const deletePet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("[Delete-Pet]:");
    const { id } = req.params;
    try {
        // const result =
        yield petService.deletePet(id);
        res.status(201).json({ message: "Pet deleted." });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.deletePet = deletePet;
const getPetById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("[Get-Pet]:");
    const { id } = req.params;
    try {
        const result = yield petService.getPetById(id);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getPetById = getPetById;
//# sourceMappingURL=petController.js.map