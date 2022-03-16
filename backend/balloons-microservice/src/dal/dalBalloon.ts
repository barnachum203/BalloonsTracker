import mongoose from 'mongoose';
import { IBalloon } from '../model/balloon';
import { BalloonModel } from '../model/balloonSchema';

/**
 * Get all balloons for user
 */
export const getAllBalloons = async (uid: string) => {
  try {
    const balloons: IBalloon[] = await BalloonModel.find({
      uid: new mongoose.Types.ObjectId(uid),
    });
    return balloons;
  } catch (error) {
    throw Error(error);
  }
};

/**
 * Creates new balloon
 */
export const createBalloon = async (balloonToCreate: IBalloon) => {
  try {
    const newBalloon = await BalloonModel.create(balloonToCreate);
    return newBalloon;
  } catch (error) {
    throw Error(error);
  }
};

/**
 * Update balloon
 */
export const updateBalloonById = async (id: string, balloon: IBalloon) => {
  try {
    const updatedBalloon: IBalloon | null =
      await BalloonModel.findByIdAndUpdate({ _id: id }, balloon);
    return updatedBalloon;
  } catch (error) {
    throw Error(error);
  }
};

/**
 * Delete balloon
 */
export const deleteBalloon = async (balloonId: string) => {
  try {
    const deletedBalloon: IBalloon | null = await BalloonModel.findOneAndDelete(
      {
        _id: balloonId,
      }
    );
    return deletedBalloon;
  } catch (error) {
    throw Error(error);
  }
};

/**
 * Find balloon by id
 */
export const getBalloonById = async (id: string) => {
  try {
    const balloon: IBalloon | null = await BalloonModel.findById(id);
    return balloon;
  } catch (error) {
    throw Error(error);
  }
};
/**
 * Find balloon by name
 */
export const findBalloonByName = async (balloon: IBalloon) => {
  try {
    const newBalloon = await BalloonModel.findOne({ name: balloon.name });
    return newBalloon;
  } catch (error) {
    throw Error(error);
  }
};
