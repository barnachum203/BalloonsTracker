import { Schema, model } from 'mongoose';
export interface IBalloon {
  _id: number;
  name: string;
  type: Type;
  description: string;
  position: BallonPosition;
  point: BallonPosition;
  color: Color;
  uid: string | undefined;
  created_at?: Date;
}

export enum Type {
  small = 'small',
  medium = 'medium',
  big = 'big',
  double = 'double',
}

export enum Color {
  red = 'red',
  blue = 'blue',
  black = 'black',
  white = 'white',
}

export interface BallonPosition {
  latitude: number;
  longitude: number;
  attitude: number;
}

const ballonSchema = new Schema<IBalloon>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      enum: [Type.small, Type.medium, Type.big, Type.double],
      required: true,
    },
    color: {
      type: String,
      enum: [Color.red, Color.black, Color.blue, Color.white],
      required: true,
    },
    position: {
      type: Object,
      required: false,
    },
    point: {
      type: Object,
      required: true,
    },

    uid: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },

    created_at: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    collection: 'balloons',
  }
);

export const BalloonModel = model<IBalloon>('Ballon', ballonSchema);
