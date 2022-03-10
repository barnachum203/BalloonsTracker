import { IBalloon, BalloonModel } from '../model/balloon';
import mongoose, { FilterQuery } from 'mongoose';

/**
 * Get all balloons
 */
export const getAllBalloons = async (uid: string) => {
  const balloons: IBalloon[] = await BalloonModel.find();
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
export const deleteBalloon = async (balloonId: FilterQuery<IBalloon>) => {
  const deletedBalloon: IBalloon | null = await BalloonModel.findOneAndDelete(balloonId);

  return deletedBalloon;
};

export const getBalloonById = async (id: string) => {
  const balloon: IBalloon | null = await BalloonModel.findById(id);
  return balloon;
};
