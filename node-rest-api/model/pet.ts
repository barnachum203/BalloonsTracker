import { Schema, model } from 'mongoose';

export interface IPet {
  id: number;
  name: string;
  age: number;
  type: string;
  created_at?: { type: DateConstructor; default: number };
}

const petSchema = new Schema<IPet>(
  {
    id: {
      type: Number,
    },
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    type: {
      type: String,
      enum: ['Dog', 'Cat', 'Horse', 'Other'],
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    collection: 'pets',
  }
);

export const PetModel = model<IPet>('Pet', petSchema);
