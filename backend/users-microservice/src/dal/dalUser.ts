import { IUser, UserModel } from '../model/user';
import mongoose, { FilterQuery } from 'mongoose';

/**
 * Get all users
 */
export const getAllUsers = async (uid: string) => {
  const users: IUser[] = await UserModel.find();
  return users;
};

/**
 * Creates new user
 */
export const createUser = async (userToCreate: IUser) => {
  const newUser = await UserModel.create(userToCreate);
  return newUser;
};

/**
 * Update user
 */
export const updateUserById = async (id: string, user: IUser) => {
  const updatedUser: IUser | null = await UserModel.findByIdAndUpdate(
    new mongoose.Types.ObjectId(id),
    user
  );

  return updatedUser;
};

/**
 * Delete user
 */
export const deleteUser = async (userId: string) => {
  const deletedUser: IUser | null = await UserModel.findOneAndDelete({_id: userId});

  return deletedUser;
};

export const getUserById = async (id: string) => {
  const user: IUser | null = await UserModel.findById(id);
  return user;
};
