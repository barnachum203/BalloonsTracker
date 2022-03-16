import * as dal from '../dal/dalBalloon';
import { IBalloon } from '../model/balloon';

/**
 * Get all balloons:
 *
 * */
export const getAllBalloonsForUser = async (uid: string) => {
  try {
    const balloons: IBalloon[] = await dal.getAllBalloons(uid);
    console.log(`[BALLOON-SERV] - send ${balloons.length} balloons`);
    return balloons;
  } catch (error: any) {
    throw Error(error);
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
      throw Error(`balloon name "${balloon.name}" already exists.`); //Make Error handler to throw status code in more generic way
    }
    const result = await dal.createBalloon(balloon);

    console.log('[BALLOON-SERV]: Balloon created successfully.');

    return result;
  } catch (error: any) {
    // console.log(error);

    throw Error(error);
  }
};

/**
 * Update balloon:
 *
 * */
export const updateBalloon = async (balloon: IBalloon, id: string) => {
  try {
    const result = await dal.updateBalloonById(id, balloon);
    const updatedBalloon = await dal.findBalloonByName(balloon);
    console.log('[BALLOON-SERV]: Balloon updated.');

    console.log(updatedBalloon);

    return updatedBalloon;
  } catch (error) {
    console.log(error);

    throw Error(error);
  }
};

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
      throw Error('Balloon is not exist');
    }
    console.log('[BALLOON-SERV]: Sent balloon: ' + id);
    return result;
  } catch (error: any) {
    throw Error(error);
  }
};
