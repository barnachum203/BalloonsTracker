import * as dal from '../dal/dalBalloon';
import { BalloonAlreadyExist } from '../exceptions/BalloonAlreadyExist';
import { BalloonNotFound } from '../exceptions/BalloonNotFound';
import { BaseError } from '../exceptions/BaseError';
import { UpdateException } from '../exceptions/UpdateException';
import { IBalloon } from '../model/balloon';

/**
 * Get all balloons:
 *
 * */
export const getAllBalloonsForUser = async (uid: string) => {
  try {
    const balloons: IBalloon[] = await dal.getAllBalloons(uid);
    if(!balloons){
      throw new BalloonNotFound("Cannot get balloons for uid: " + uid);
    }
    console.log(`[BALLOON-SERV] - send ${balloons.length} balloons`);
    return balloons;
  } catch (error: any) {
    throw error;
  }
};

/**
 * Create new balloon:
 *
 * */
export const create = async (balloon: IBalloon, uid: string) => {
  try {
    balloon.uid = uid;
    //Check if the balloon name already exists
    const checkDuplicate = await dal.findBalloonByName(balloon);
    if (checkDuplicate) {
      throw new BalloonAlreadyExist(`balloon name "${balloon.name}" already exists.`); //Make Error handler to throw status code in more generic way
    }
    const result = await dal.createBalloon(balloon);

    console.log('[BALLOON-SERV]: Balloon created successfully.');

    return result;
  } catch (error: any) {
    // console.log(error);

    throw (error);
  }
};

/**
 * Update balloon:
 *
 * */
export const updateBalloon = async (balloon: IBalloon, id: string) => {
  try {
    const result = await dal.updateBalloonById(id, balloon);
    if(!result){
      throw new UpdateException("Balloon not updated");
    }

    const updatedBalloon = await dal.findBalloonByName(balloon);
    if(!updatedBalloon){
      throw new BalloonNotFound("Balloon not found.");
    }
    console.log('[BALLOON-SERV]: Balloon updated.');

    // console.log(updatedBalloon);

    return updatedBalloon;
  } catch (error) {
    // console.log(error);

    throw error;
  }
};

//TODO: rabbitMQ
export const deleteBalloon = async (id: string) => {
  try {
    const result = await dal.deleteBalloon(id);
    if (!result) {
      console.log('[BALLOON-SERV]: Balloon is not deleted.');
      throw Error('Balloon is not deleted.');
    }
    console.log('[BALLOON-SERV]: Balloon deleted: ' + id);

    return result;
  } catch (error) {
    throw Error(error);
  }
};

/**
 * Get Specific balloon
 * @param id
 * @returns balloon
 */
export const getBalloonById = async (id: string) => {
  try {
    const result: IBalloon | null = await dal.getBalloonById(id);
    if (!result) {
      throw new BalloonNotFound('Balloon is not exist');
    }
    console.log('[BALLOON-SERV]: Sent balloon: ' + id);
    return result;
  } catch (error) {
    throw error;
  }
};
