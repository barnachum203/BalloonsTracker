import { Request, Response } from 'express';
import { log } from '../utils/logger';
import * as userService from '../services/users-service.service';

/**
 * Create/Register user:
 * @input user
 * @return user
 * */
export const createUser = async (req: Request, res: Response) => {
  const { user } = req.body;
  try {
    log.info(`Created user ${user}`);
    const result = await userService.createUser(user);
    res.status(201).json({ message: `Created user ${user}`, result: result });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Update user:
 * @input updatedUser, uid
 * @return updatedUser
 * */
export const updateUser = async (req: Request, res: Response) => {
  const { updatedUser, uid } = req.body;
  const authHeader = getAuthHeader(req);

  try {
    log.info(`Update user ${updatedUser}`);
    const result = await userService.updateUser(uid, updatedUser);
    res
      .status(201)
      .json({ message: `Update user ${updatedUser}`, result: result });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Delete user:
 * @input uid
 * @return: make an Asynchronus call for mesage queue for delete.
 * */
export const deleteUser = async (req: Request, res: Response) => {
  const { uid } = req.body;
  const authHeader = getAuthHeader(req);

  try {
    log.info(`Delete user id: ${uid}`);
    await userService.deleteUser(uid);
    res.status(201).json({ message: `Deleted user ${uid}` });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Login user:
 * @input email, password
 * @return user
 * */
export const loginUser = async (req: Request, res: Response) => {
  const { user } = req.body;
  // console.log(user);
  try {
    //Call users service and login user
    log.info(`User connected: ${user}`);
    const result = await userService.loginUser(user);
    res.status(201).json({ user: result });
  } catch (error) {
    log.error(error.message);
    res.status(404).json({ message: error.message, result: error }); //pattern of error handling body:{message,result}
  }
};

/**
 * Register user:
 * @input user
 * @return user
 * */
export const registerUser = async (req: Request, res: Response) => {
  const { user } = req.body;
  try {
    //Call users service and update user
    log.info(`Register user ${user}`);
    res.status(201).json({ message: `Register user ${user}` });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Register user:
 * @input user
 * @return user
 * */
 export const checkToken = async (req: Request, res: Response) => {
  const authHeader = getAuthHeader(req);
  try {
    //Call users service and update user
    log.info(`check token: ${authHeader}`);
    const result = await userService.checkToken(authHeader);
    res.status(201).json({ message: `checked token ${result}` });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

function getAuthHeader(req) {
  return req.headers.authorization ;
}
