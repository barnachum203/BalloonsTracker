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
exports.getPetById = exports.deletePet = exports.updatePetById = exports.createPet = exports.getAllPets = void 0;
// const mongoose = require("mongoose");
const pet_1 = require("../model/pet");
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Get all pets
 */
const getAllPets = () => __awaiter(void 0, void 0, void 0, function* () {
    const pets = yield pet_1.PetModel.find();
    return pets;
});
exports.getAllPets = getAllPets;
/**
 * Creates new pet
 */
const createPet = (petToCreate) => __awaiter(void 0, void 0, void 0, function* () {
    const newPet = yield pet_1.PetModel.create(petToCreate);
    return newPet;
});
exports.createPet = createPet;
/**
 * Update pet
 */
const updatePetById = (id, pet) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pet_1.PetModel.findByIdAndUpdate(new mongoose_1.default.Types.ObjectId(id), pet);
    return result;
});
exports.updatePetById = updatePetById;
/**
 * Delete pet
 */
const deletePet = (petId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pet_1.PetModel.findOneAndDelete(petId);
    return result;
});
exports.deletePet = deletePet;
function getPetById(id) {
    throw new Error("Function not implemented.");
    return id;
}
exports.getPetById = getPetById;
//# sourceMappingURL=dalPet.js.map