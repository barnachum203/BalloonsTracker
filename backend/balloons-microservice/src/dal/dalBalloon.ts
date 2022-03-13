import { IBalloon, BalloonModel } from '../model/balloon';
import mongoose, { FilterQuery } from 'mongoose';

/**
 * Get all balloons for user
 */
export const getAllBalloons = async (uid: string) => {
  const balloons: IBalloon[] = await BalloonModel.find({uid: new mongoose.Types.ObjectId(uid)});
  return balloons;
};

/**
 * Creates new balloon
 */
export const createBalloon = async (balloonToCreate: IBalloon) => {
  const newBalloon = await BalloonModel.create(balloonToCreate);
  return newBalloon;
};

/**
 * Update balloon
 */
export const updateBalloonById = async (id: string, balloon: IBalloon) => {
  const updatedBalloon: IBalloon | null = await BalloonModel.findByIdAndUpdate(
    new mongoose.Types.ObjectId(id),
    balloon
  );

  return updatedBalloon;
};

/**
 * Delete balloon
 */
export const deleteBalloon = async (balloonId: string) => {
  const deletedBalloon: IBalloon | null = await BalloonModel.findOneAndDelete({_id: balloonId});
  return deletedBalloon;
};

export const getBalloonById = async (id: string) => {
  const balloon: IBalloon | null = await BalloonModel.findById(id);
  return balloon;
};
