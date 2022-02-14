import { IPet } from '../model/pet';
import * as petService from '../services/petService';
/**
 * Get all pets:
 *
 * */
export const getAll = async (req, res) => {
  try {
    const pets: IPet[] = await petService.getAllPets();
    res.status(201).json(pets);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Get all pets under age 3:
 *
 * */
export const getAllUnder3 = async (req, res) => {
  try {
    const pets: IPet[] = await petService.getAllPetsUnder3();
    res.status(201).json(pets);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
/**
 * Create new pet:
 *
 * */
export const create = async (req, res) => {
  try {
    await petService.create(req.body);

    res.status(201).json({ message: 'Pet created successfully.' });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/**
 * Update pet:
 *
 * */
export const update = async (req, res) => {
  const { id } = req.params;
  const pet: IPet = req.body;
  try {
    // const result =
    await petService.updatePet(pet, id);
    res.status(201).json({ message: 'Pet updated.' });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deletePet = async (req, res) => {
  const { id } = req.params;
  try {
    // const result =
    await petService.deletePet(id);
    res.status(201).json({ message: 'Pet deleted.' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPetById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await petService.getPetById(id);
    res.status(201).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
