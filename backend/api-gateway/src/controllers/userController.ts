import { Request, Response } from 'express';
import { log } from "../utils/logger";

/**
 * Create/Register user:
 * @input user
 * @return user
 * */
export const createUser = async (req: Request, res: Response) => {
  const { user } = req.body;
  try {
    //Call users service and create user
    log.info(`Created user ${user}`);
    res.status(201).json({ message: `Created user ${user}` });
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
    try {
      //Call users service and update user
      log.info(`Update user ${updatedUser}`);
      res.status(201).json({ message: `Update user ${updatedUser}` });
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
    try {
      //Call users service and update user
      log.info(`Delete user id: ${uid}`);
      res.status(201).json({ message: `Update user ${uid}` });
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
  const { email, password } = req.body;
  try {
    //Call users service and login user
    log.info(`Login user: ${email} , ${password}`);
    res.status(201).json({ message: `Login user: ${email} , ${password}` });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
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