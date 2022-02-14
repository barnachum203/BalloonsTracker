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
exports.getPetById = exports.deletePet = exports.updatePet = exports.create = exports.getAllPetsUnder3 = exports.getAllPets = void 0;
// const dal = require("../dal/dalPet");
const dal = __importStar(require("../dal/dalPet"));
/**
 * Get all pets:
 *
 * */
const getAllPets = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pets = yield dal.getAllPets();
        console.log(`[PET-SERV] - send ${pets.length} pets`);
        return pets;
    }
    catch (error) {
        throw Error(error);
    }
});
exports.getAllPets = getAllPets;
/**
 * Get all pets under age 3:
 *
 * */
const getAllPetsUnder3 = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pets = yield dal.getAllPets();
        pets = pets.filter((pet) => pet.age <= 3);
        console.log(`[PET-SERV] - send ${pets.length} pets under age 3`);
        return pets;
    }
    catch (error) {
        throw Error(error);
    }
});
exports.getAllPetsUnder3 = getAllPetsUnder3;
/**
 * Create new pet:
 *
 * */
const create = (pet) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield dal.createPet(pet);
        console.log("[PET-SERV]: Pet created successfully.");
        return { pet };
    }
    catch (err) {
        throw Error(err);
    }
});
exports.create = create;
/**
 * Update pet:
 *
 * */
const updatePet = (pet, id) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedPet = yield dal.updatePetById(id, pet);
    if (!updatedPet) {
        console.log("[PET-SERV]: Pet is not updated");
        throw Error("Pet is not updated");
    }
    console.log("[PET-SERV]: Pet updated.");
    return updatedPet;
});
exports.updatePet = updatePet;
const deletePet = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield dal.deletePet(id);
    if (!result) {
        console.log("[PET-SERV]: Pet is not deleted.");
        throw Error("Pet is not deleted.");
    }
    console.log("[PET-SERV]: Pet deleted: " + id);
    return result;
});
exports.deletePet = deletePet;
//TODO: implement.
const getPetById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield dal.getPetById(id);
    if (!result) {
        throw Error("Pet is not exist");
    }
    console.log("[PET-SERV]: Sent pet: " + id);
    return result;
});
exports.getPetById = getPetById;
//# sourceMappingURL=petService.js.map