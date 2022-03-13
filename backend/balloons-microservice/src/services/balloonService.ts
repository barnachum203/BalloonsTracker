import { FilterQuery } from 'mongoose';
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
export const create = async (balloon: IBalloon) => {
  try {
    await dal.createBalloon(balloon);

    console.log('[BALLOON-SERV]: Balloon created successfully.');

    return { balloon };
  } catch (error: any) {
    throw Error(error);
  }
};

/**
 * Update balloon:
 *
 * */
export const updateBalloon = async (balloon: IBalloon, id: string) => {
  try {
    const updatedBalloon = await dal.updateBalloonById(id, balloon);
    console.log('[BALLOON-SERV]: Balloon updated.');

    return updatedBalloon;
  } catch (error) {
    throw Error(error);
  }
};

export const deleteBalloon = async (id: string) => {
  const result = await dal.deleteBalloon(id);
  if (!result) {
    console.log('[BALLOON-SERV]: Balloon is not deleted.');
    throw Error('Balloon is not deleted.');
  }
  console.log('[BALLOON-SERV]: Balloon deleted: ' + id);

  return result;
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
