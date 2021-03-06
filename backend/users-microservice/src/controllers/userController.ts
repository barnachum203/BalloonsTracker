import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger';
import * as userService from '../services/userService.service';

/** V
 * Get user by user id:
 * @input uid - user id
 * @return user
 * */
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const { uid } = req.body;
  try {
    const result = await userService.getUserById(uid);
    logger.info('Get specific user ' + uid);
    res
      .status(201)
      .json({ message: 'Get specific user uid: ' + uid, user: result });
  } catch (error) {
    next(error)
  }
};

/** V
 * Update user by user id:
 * @input uid - user id
 * @return updated user
 * */
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req.body;
  const { uid } = req.params;
  try {
    logger.info('Update specific user by id ' + uid);
    const result = await userService.updateUser(user, uid);
    res
      .status(201)
      .json({ message: 'Update specific user id: ' + uid, user: result });
  } catch (error) {
    logger.error(error.message);
    next(error)
  }
};

/** V
 * Delete user by user id:
 * @input uid - user id
 * @return: make an Asynchronus call for mesage queue for delete.
 * */
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { uid } = req.params;
  try {
    await userService.deleteUser(uid);
    logger.info('Delete specific user id ' + uid);
    res.status(201).json({ message: 'Delete specific user id: ' + uid });
  } catch (error) {
    next(error)
  }
};

/** V
 * Create user:
 * @input user  - user: {email, password}
 * @return user - created user.
 * */
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req.body;
  try {
    logger.info(`Create user ${user} `);
    const result = await userService.create(user);
    res.status(201).json({
      message: `Created user`,
      user: result,
    });
  } catch (error: any) {
    logger.error(error.message);
    next(error)
  }
};

/**
 * Create user:
 * @input email, password
 * @return user - logged user.
 * */
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req.body;
  try {
    //Call users service and login user
    logger.info(`Loggin called `);
    const result = await userService.loginUser(user);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error.message)
    next(error)
  }
};
