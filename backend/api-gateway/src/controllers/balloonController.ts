import { Request, Response } from 'express';
import { IBalloon } from '../model/balloon';
import { log } from "../utils/logger";

/**
 * Get all balloons by user id:
 * @input uid - user id
 * @return balloons: IBalloon[]
 * */
export const getBalloons = async (req: Request, res: Response) => {
  const { uid } = req.body;
  try {
    log.info("get all balloons")
    //Call balloons service and get all balloons by user id(uid)
    res.status(201).json({ message: 'Get all ballooos for id: ' + uid });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Get balloon by balloon id:
 * @input bid - balloon id
 * @return balloon
 * */
export const getBalloonById = async (req: Request, res: Response) => {
  const { bid } = req.body;
  try {
    //Call balloons service and get balloon by id(bid)
    log.info('Get specific balloon ' + bid);
    res.status(201).json({ message: 'Get specific balloon bid: ' + bid });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Update balloon by balloon id:
 * @input bid - balloon id
 * @return updated balloon
 * */
export const updateBalloon = async (req: Request, res: Response) => {
  const { bid } = req.body;
  try {
    //Call balloons service and update balloon by id(bid)
    log.info('Update specific balloon id ' + bid);
    res.status(201).json({ message: 'Update specific balloon id: ' + bid });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Delete balloon by balloon id:
 * @input bid - balloon id
 * @return: make an Asynchronus call for mesage queue for delete.
 * */
export const deleteBalloon = async (req: Request, res: Response) => {
  const { bid } = req.body;
  try {
    //Call balloons service and update balloon by id(bid)
    log.info('Delete specific balloon id ' + bid);
    res.status(201).json({ message: 'Delete specific balloon id: ' + bid });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Create balloon by balloon id:
 * @input balloon ,uid - user id
 * @return balloon - created balloon.
 * */
export const createBalloon = async (req: Request, res: Response) => {
  const { uid, balloon } = req.body;
  try {
    //Call balloons service and update balloon by id(bid)
    log.info(`Create balloon ${balloon} for user id: ${uid}`);
    res
      .status(201)
      .json({ message: `Create balloon ${balloon} for user id: ${uid}` });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
