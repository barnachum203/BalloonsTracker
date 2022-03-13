import { Request, Response } from 'express';
import { IUser } from '../model/user';
import { log } from "../utils/logger";

/**
 * Get all users by user id:
 * @input uid - user id
 * @return users: IUser[]
 * */
export const getUsers = async (req: Request, res: Response) => {
  const { uid } = req.body;
  try {
    //Call users service and get all users by user id(uid)
    log.info('get all users');
    // logger.info('get all users')
    res.status(201).json({ message: 'Get all ballooos for id: ' + uid });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Get user by user id:
 * @input bid - user id
 * @return user
 * */
export const getUserById = async (req: Request, res: Response) => {
  const { bid } = req.body;
  try {
    //Call users service and get user by id(bid)
    log.info('Get specific user ' + bid);
    res.status(201).json({ message: 'Get specific user bid: ' + bid });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Update user by user id:
 * @input bid - user id
 * @return updated user
 * */
export const updateUser = async (req: Request, res: Response) => {
  const { bid } = req.body;
  try {
    //Call users service and update user by id(bid)
    log.info('Update specific user id ' + bid);
    res.status(201).json({ message: 'Update specific user id: ' + bid });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Delete user by user id:
 * @input bid - user id
 * @return: make an Asynchronus call for mesage queue for delete.
 * */
export const deleteUser = async (req: Request, res: Response) => {
  const { bid } = req.body;
  try {
    //Call users service and update user by id(bid)
    log.info('Delete specific user id ' + bid);
    res.status(201).json({ message: 'Delete specific user id: ' + bid });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Create user by user id:
 * @input user ,uid - user id
 * @return user - created user.
 * */
export const createUser = async (req: Request, res: Response) => {
  const { uid, user } = req.body;
  try {
    //Call users service and update user by id(bid)
    log.info(`Create user ${user} for user id: ${uid}`);
    res
      .status(201)
      .json({ message: `Create user ${user} for user id: ${uid}` });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
