import { FilterQuery } from 'mongoose';
import * as dal from '../dal/dalPet';
import { IPet } from '../model/pet';

/**
 * Get all pets:
 *
 * */
export const getAllPets = async () => {
  try {
    const pets: IPet[] = await dal.getAllPets();
    console.log(`[PET-SERV] - send ${pets.length} pets`);
    return pets;
  } catch (error) {
    throw Error(error);
  }
};

/**
 * Get all pets under age 3:
 *
 * */
export const getAllPetsUnder3 = async () => {
  try {
    let pets: IPet[] = await dal.getAllPets();
    pets = pets.filter((pet) => pet.age <= 3);

    console.log(`[PET-SERV] - send ${pets.length} pets under age 3`);
    return pets;
  } catch (error) {
    throw Error(error);
  }
};

/**
 * Create new pet:
 *
 * */
export const create = async (pet: IPet) => {
  try {
    await dal.createPet(pet);

    console.log('[PET-SERV]: Pet created successfully.');

    return { pet };
  } catch (err) {
    throw Error(err);
  }
};

/**
 * Update pet:
 *
 * */
export const updatePet = async (pet: IPet, id: string) => {
  const updatedPet = await dal.updatePetById(id, pet);
  if (!updatedPet) {
    console.log('[PET-SERV]: Pet is not updated');

    throw Error('Pet is not updated');
  }
  console.log('[PET-SERV]: Pet updated.');

  return updatedPet;
};

export const deletePet = async (id: FilterQuery<IPet>) => {
  const result = await dal.deletePet(id);
  if (!result) {
    console.log('[PET-SERV]: Pet is not deleted.');
    throw Error('Pet is not deleted.');
  }
  console.log('[PET-SERV]: Pet deleted: ' + id);

  return result;
};

//TODO: implement.
export const getPetById = async (id: string) => {
  try {
    const result: IPet = await dal.getPetById(id);
    if (!result) {
      throw Error('Pet is not exist');
    }
    console.log('[PET-SERV]: Sent pet: ' + id);
    return result;
  } catch (error) {
    console.log(error);
  }
};
