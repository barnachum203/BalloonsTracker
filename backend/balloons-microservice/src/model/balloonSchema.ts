import { IBalloon, Type, Color, BallonPosition } from "./balloon";
import { Schema, model } from 'mongoose';

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
        //ref: 'users',
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
  