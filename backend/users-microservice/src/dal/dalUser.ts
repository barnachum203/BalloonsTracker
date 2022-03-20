import mongoose from 'mongoose';
import { IUser } from '../model/user';
import { UserModel } from '../model/userSchema';

/**
 * Get all users
 */
export const getAllUsers = async (uid: string) => {
  try {
    const users: IUser[] = await UserModel.find();
    return users;
  } catch (error) {
    throw Error(error);
  }
};

/**
 * Login user
 */
export const getUserByEmail = async (user) => {
  try {
    const result: IUser | null = await UserModel.findOne({ email: user.email });
    return result;
  } catch (error) {
    throw Error(error);
  }
};

/**
 * Creates new user
 */
export const createUser = async (userToCreate: IUser) => {
  try {
    const newUser = await UserModel.create(userToCreate);
    return newUser;
  } catch (error) {
    throw Error(error);
  }
};

/**
 * Update user
 */
export const updateUserById = async (id: string, user: IUser) => {
  try {
    const updatedUser: IUser | null = await UserModel.findByIdAndUpdate(
      new mongoose.Types.ObjectId(id),
      user
    );

    return updatedUser;
  } catch (error) {
    throw Error(error);
  }
};

/**
 * Delete user
 */
export const deleteUser = async (userId: string) => {
  try {
    const deletedUser: IUser | null = await UserModel.findOneAndDelete({
      _id: userId,
    });

    return deletedUser;
  } catch (error) {
    throw Error(error);
  }
};

export const getUserById = async (id: string) => {
  try {
    const user: IUser | null = await UserModel.findById(id);
    return user;
  } catch (error) {
    throw Error(error);
  }
};

export const findUserByEmail = async (email: string) => {
    const user: IUser | null = await UserModel.findOne({email: email});
    return user;
};
