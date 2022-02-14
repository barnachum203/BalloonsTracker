import { IPet, PetModel } from '../model/pet';
import mongoose, { FilterQuery } from 'mongoose';

/**
 * Get all pets
 */
export const getAllPets = async () => {
  const pets: IPet[] = await PetModel.find();
  return pets;
};

/**
 * Creates new pet
 */
export const createPet = async (petToCreate: IPet) => {
  const newPet = await PetModel.create(petToCreate);
  return newPet;
};

/**
 * Update pet
 */
export const updatePetById = async (id: string, pet: IPet) => {
  const updatedPet: IPet = await PetModel.findByIdAndUpdate(
    new mongoose.Types.ObjectId(id),
    pet
  );

  return updatedPet;
};

/**
 * Delete pet
 */
export const deletePet = async (petId: FilterQuery<IPet>) => {
  const deletedPet: IPet = await PetModel.findOneAndDelete(petId);

  return deletedPet;
};

export const getPetById = async (id: string) => {
  const pet: IPet = await PetModel.findById(id);
  return pet;
};
