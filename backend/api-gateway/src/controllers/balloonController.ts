import { Request, Response } from 'express';
import { log } from '../utils/logger';
import * as balloonService from '../services/balloon-service.service';

/**
 * Get all balloons by user id:
 * @input uid - user id
 * @return balloons: IBalloon[]
 * */
export const getBalloons = async (req: Request, res: Response) => {
  // const { uid } = req.body;
  const uid = req.header('user-id');
  // console.log(req.headers);

  try {
    log.info('Get all ballooos for id: ' + uid);
    const data = await balloonService.getBalloons(uid!);
    res
      .status(201)
      .json( { balloons: data}); //TODO: Send {balloons: data} - send an Object !
  } catch (error: any) {
    log.error(error.message +": "+ error.response.data.error.message);    
    res.status(error.response.status).json({message: error.response.data.error.message, result: error}); //pattern of error handling body:{message,result}
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
      .json({ message: 'Get specific balloon bid: ' + bid, balloon: result });
  } catch (error: any) {
    log.error(error.message +": "+ error.response.data.error.message);    
    res.status(error.response.status).json({message: error.response.data.error.message, result: error}); //pattern of error handling body:{message,result}
  }
};

/**
 * Update balloon by balloon id:
 * @input bid - balloon id
 * @return updated balloon
 * */
export const updateBalloon = async (req: Request, res: Response) => {
  const { bid, balloon } = req.body;  
  try {
    log.info('Update specific balloon id ' + bid);
    const result = await balloonService.updateBalloon(bid, balloon);
    res
      .status(201)
      .json({ message: 'Update specific balloon id: ' + bid,  balloon:result });
  } catch (error: any) {
    log.error(error.message +": "+ error.response.data.error.message);    
    res.status(error.response.status).json({message: error.response.data.error.message, result: error}); //pattern of error handling body:{message,result}
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
    log.info('Delete specific balloon id ' + bid);
    await balloonService.deleteBalloon(bid);
    res.status(201).json({ message: 'Delete specific balloon id: ' + bid });
  } catch (error: any) {
    log.error(error.message);
    res.status(404).json({ message: error.message });
  }
};

/**
 * Create balloon by balloon id:
 * @input balloon ,uid - user id
 * @return balloon - created balloon.
 * */
export const createBalloon = async (req: Request, res: Response) => {
  const { balloon } = req.body;
  const uid = req.header('user-id')!;
  try {
    log.info(`Create balloon ${balloon} for user id: ${uid}`);

    const data = await balloonService.createBalloon(uid, balloon);
    res.status(201).json({balloon: data}); //TODO: Send {balloon: result} - send an Object !
  } catch (error: any) {
    log.error(error.message +": "+ error.response.data.error.message);    
    res.status(error.response.status).json({message: error.response.data.error.message, result: error}); //pattern of error handling body:{message,result}
  }
};
