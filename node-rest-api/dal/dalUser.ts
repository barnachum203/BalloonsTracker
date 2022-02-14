import { IUser, UserModel } from '../model/user';
import mongoose, { FilterQuery } from 'mongoose';

/**
 * Get user by email
 */
export const getUserByEmail = async (email: string) => {
  const user: IUser = await UserModel.findOne({ email });
  return user;
};

/**
 * Get all users
 */
export const getAllUsers = async () => {
  const users: IUser[] = await UserModel.find();
  return users;
};

/**
 * Get one user
 */
export const getUserById = async (id: string) => {
  const user: IUser = await UserModel.findById(new mongoose.Types.ObjectId(id));
  return user;
};

/**
 * Update user
 */
export const updateUserById = async (id: string, user: IUser) => {
  const updatedUser: IUser = await UserModel.findByIdAndUpdate(
    new mongoose.Types.ObjectId(id),
    user
  );
  return updatedUser;
};

/**
 * Creates new user
 */
export const createUser = async (userToCreate: IUser) => {
  const exist: IUser = await getUserByEmail(userToCreate.email);

  if (exist) {
    return null;
  }
  const newUser: IUser = await UserModel.create(userToCreate);

  return newUser;
};

/**
 * Delete user
 */
export const deleteUser = async (userId: FilterQuery<IUser>) => {
  const deletedUser: IUser = await UserModel.findOneAndDelete(userId);

  return deletedUser;
};
