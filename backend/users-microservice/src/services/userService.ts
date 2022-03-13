import { FilterQuery } from 'mongoose';
import * as dal from '../dal/dalUser';
import { IUser } from '../model/user';

/**
 * Get all users:
 *
 * */
export const getAllUsers = async (bid: string) => {
  try {
    const users: IUser[] = await dal.getAllUsers(bid);
    console.log(`[USER-SERV] - send ${users.length} users`);
    return users;
  } catch (error: any) {
    throw Error(error);
  }
};

/**
 * Create new user:
 *
 * */
export const create = async (user: IUser) => {
  try {
    await dal.createUser(user);

    console.log('[USER-SERV]: User created successfully.');

    return { user };
  } catch (error: any) {
    throw Error(error);
  }
};

/**
 * Update user:
 *
 * */
export const updateUser = async (user: IUser, id: string) => {
  const updatedUser = await dal.updateUserById(id, user);
  if (!updatedUser) {
    console.log('[USER-SERV]: User is not updated');

    throw Error('User is not updated');
  }
  console.log('[USER-SERV]: User updated.');

  return updatedUser;
};

export const deleteUser = async (id: FilterQuery<IUser>) => {
  const result = await dal.deleteUser(id);
  if (!result) {
    console.log('[USER-SERV]: User is not deleted.');
    throw Error('User is not deleted.');
  }
  console.log('[USER-SERV]: User deleted: ' + id);

  return result;
};

/**
 * Get Specific user
 * @param id
 * @returns user
 */
export const getUserById = async (id: string) => {
  try {
    const result: IUser | null = await dal.getUserById(id);
    if (!result) {
      throw Error('User is not exist');
    }
    console.log('[USER-SERV]: Sent user: ' + id);
    return result;
  } catch (error: any) {
    throw Error(error);
  }
};
