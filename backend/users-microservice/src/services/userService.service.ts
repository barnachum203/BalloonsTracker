import * as dal from '../dal/dalUser';
import { logger } from '../utils/logger';
import { IUser } from '../model/user';
import { UnauthorizedException } from "../exceptions/UnauthorizedException";
import creatToken from '../utils/jwt';
import compare from '../utils/bcrypt';
import { UserAlreadyExist } from '../exceptions/UserAlreadyExist';
import { UserNotFound } from '../exceptions/UserNotFound';


/**
 * Get all users:
 *
 * */
export const getAllUsers = async (bid: string) => {
  try {
    const users: IUser[] = await dal.getAllUsers(bid);
    logger.info(`[USER-SERV] - send ${users.length} users`);
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
    const checkDuplication = await dal.findUserByEmail(user.email)
    if(!checkDuplication){      
     const result = await dal.createUser(user);
     logger.info('[USER-SERV]: User created successfully.');
     return { user: result };
    }else{
      throw new UserAlreadyExist("user already exists.")
    }
  } catch (error: any) {
    throw error;
  }
};

/**
 * Update user:
 *
 * */
export const updateUser = async (user: IUser, id: string) => {
  try {
    const updatedUser = await dal.updateUserById(id, user);
    if (!updatedUser) {
      logger.error('[USER-SERV]: User is not updated');

      throw Error('User is not updated');
    }
    logger.info('[USER-SERV]: User updated.');

    return updatedUser;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const result = await dal.deleteUser(id);
    if (!result) {
      logger.error('[USER-SERV]: User is not deleted.');
      throw Error('User is not deleted.');
    }
    logger.info('[USER-SERV]: User deleted: ' + id);

    return result;
  } catch (error) {
    throw error;
  }
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
      throw new UserNotFound('User is not exist');
    }
    logger.info('[USER-SERV]: Sent user: ' + id);
    return result;
  } catch (error: any) {
    throw error;
  }
};

/**
 * Get Specific user
 * @param id
 * @returns user
 */
export const loginUser = async (user) => {
  try {
    const result: IUser | null = await dal.findUserByEmail(user.email);
    if (!result) {
      logger.error('[USER-SERV]: user not found');
      throw new UnauthorizedException('Wrong email or password')
      
    }else{
      let auth = await compare(user.password, result.password)      
      if(auth){
        logger.info("authenticated")
        const token = creatToken(result._id.toString())
        return {user: result, token: token}
      }
      logger.error("NOT authenticated")
      throw new UnauthorizedException('Wrong email or password')
    }
    // logger.info('[USER-SERV]: Login user: ' + result);
    // return result;
  } catch (error) {
    throw error;
  }
};
