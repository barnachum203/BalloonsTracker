import * as dal from '../dal/dalUser';
import compare  from '../utils/bcrypt';
import creatToken from '../utils/jwt';
import { IUser } from '../model/user';
import { FilterQuery } from 'mongoose';

/**
 * Get all users:
 *
 * */
export const getAllUsers = async () => {
  try {
    const users: IUser[] = await dal.getAllUsers();
    console.log(`[USER-SERV] - send ${users.length} users`);
    return users;
  } catch (error) {
    throw Error(error);
  }
};

/**
 * Register new user:
 *
 * */
export const register = async (user: IUser) => {
  try {
    const result = await dal.createUser(user);

    if (!result) {
      console.log('[USER-SERV]: User already exist');

      throw Error('User already exist');
    }

    console.log('[USER-SERV]: User created successfully.');

    return { user };
  } catch (err) {
    throw Error(err);
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

export const login = async (email: string, password: string) => {
  try {
    const user = await dal.getUserByEmail(email);
    if (user) {
      const auth = compare(password, user.password);

      if (auth) {
        const token = creatToken(user._id);
        console.log('[USER-SERV]: User logged in: ' + user.email);
        return { user: user, token: token };
      } else {
        console.log('[USER-SERV]: incorrect password');
        throw Error('incorrect password');
      }
    } else {
      console.log('[USER-SERV]: incorrect email');
      throw Error('incorrect email');
    }
  } catch (error) {
    console.log('[USER-SERV]: ' + error.message);
    throw Error(error.message);
  }
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

export const getUserById = async (id: string) => {
  const user: IUser = await dal.getUserById(id);
  if (!user) {
    throw Error('User is not exist');
  }
  console.log('[USER-SERV]: Sent user: ' + id);

  return user;
};
