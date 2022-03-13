import { Request, Response } from 'express';
import * as balloonService from '../services/balloonService';
import { log } from '../utils/logger';
/**
 * Get all balloons by user id:
 * @input uid - user id
 * @return balloons: IBalloon[]
 * */
export const getBalloonsForUser = async (req: Request, res: Response) => {
  const { uid } = req.body;
  try {
    //Call balloons service and get all balloons by user id(uid)
    log.info('get all balloons for uid: ' + uid);
    const result = await balloonService.getAllBalloonsForUser(uid);
    // logger.info('get all balloons')
    res
      .status(201)
      .json({ message: 'Get all ballooos for id: ' + uid, result: result });
  } catch (error: any) {
    log.error('Cannot get balloons for uid: ' + uid);

    res.status(404).json({ message: error.message });
  }
};

/**
 * Get balloon by balloon id:
 * @input bid - balloon id
 * @return balloon
 * */
export const getBalloonById = async (req: Request, res: Response) => {
  const { bid } = req.params;
  try {
    log.info('Get specific balloon ' + bid);
    const result = await balloonService.getBalloonById(bid);
    res
      .status(201)
      .json({ message: 'Get specific balloon bid: ' + bid, result: result });
  } catch (error: any) {
    log.error(error.message);

    res.status(404).json({ message: error.message });
  }
};

/**
 * Update balloon by balloon id:
 * @input bid, balloon
 * @return updated balloon
 * */
export const updateBalloon = async (req: Request, res: Response) => {
  const { bid, balloon } = req.body;
  try {
    const result = await balloonService.updateBalloon(balloon, bid);
    log.info('Update specific balloon id ' + bid);
    res
      .status(201)
      .json({ message: 'Update specific balloon id: ' + bid, result: result });
  } catch (error: any) {
    log.error(error.message);
    res.status(404).json({ message: error.message });
  }
};

/**
 * Delete balloon by balloon id:
 * @input bid - balloon id
 * @return: make an Asynchronus call for mesage queue for delete.
 * */
export const deleteBalloon = async (req: Request, res: Response) => {
  const { bid } = req.params;
  try {
    await balloonService.deleteBalloon(bid);
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
    const result = await balloonService.create(balloon);
    log.info(`Created balloon ${result} for user id: ${uid}`);
    res.status(201).json({
      message: `Create balloon ${result} for user id: ${uid}`,
      result: result,
    });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
