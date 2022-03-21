import { NextFunction, Request, Response } from 'express';
import * as balloonService from '../services/balloonService.service';
import { logger } from '../utils/logger';
/**
 * Get all balloons by user id:
 * @input uid - user id
 * @return balloons: IBalloon[]
 * */
export const getBalloonsForUser = async (req: Request, res: Response, next: NextFunction) => {
  const { uid } = req.params;
  try {
    //Call balloons service and get all balloons by user id(uid)
    logger.info('get all balloons for uid: ' + uid);
    const data = await balloonService.getAllBalloonsForUser(uid);
    // loggerger.info('get all balloons')
    res.status(201).json(data);
  } catch (error: any) {
    logger.error('Cannot get balloons for uid: ' + uid);
    next(error)
  }
};

/**
 * Get balloon by balloon id:
 * @input bid - balloon id
 * @return balloon
 * */
export const getBalloonById = async (req: Request, res: Response, next: NextFunction) => {
  const { bid } = req.params;
  try {
    logger.info('Get specific balloon ' + bid);
    const result = await balloonService.getBalloonById(bid);
    res
      .status(201)
      .json({ message: 'Get specific balloon bid: ' + bid, result: result });
  } catch (error: any) {
    logger.error(error.message);
    next(error)
  }
};

/**
 * Update balloon by balloon id:
 * @input bid, balloon
 * @return updated balloon
 * */
export const updateBalloon = async (req: Request, res: Response, next: NextFunction) => {
  const { balloon } = req.body;
  const { bid } = req.params;
  try {
    logger.info('Updating specific balloon id ' + bid);
    const result = await balloonService.updateBalloon(balloon, bid);
    res.status(201).json(result);
  } catch (error: any) {
    logger.error(error.message);
    next(error)
  }
};

/**
 * Delete balloon by balloon id:
 * @input bid - balloon id
 * @return: make an Asynchronus call for mesage queue for delete.
 * */
export const deleteBalloon = async (req: Request, res: Response, next: NextFunction) => {
  const { bid } = req.params;
  try {
    logger.info('Delete specific balloon id ' + bid);
    await balloonService.deleteBalloon(bid);
    res.status(201).json({ message: 'Delete specific balloon id: ' + bid });
  } catch (error: any) {
    next(error)
  }
};

/**
 * Create balloon by balloon id:
 * @input balloon ,uid - user id
 * @return balloon - created balloon.
 * */
export const createBalloon = async (req: Request, res: Response, next: NextFunction) => {
  const { balloon } = req.body;
  const { uid } = req.params;
  try {
    logger.info(`Create balloon ${balloon} for user id: ${uid}`);
    const result = await balloonService.create(balloon, uid);
    res.status(201).json(result);
  } catch (error: any) {
    logger.error(error.message);
    next(error)
  }
};
