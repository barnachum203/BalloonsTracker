import { Schema, model } from 'mongoose';
import { IUser } from "./user";

const userSchema = new Schema<IUser>(
    {
      email:{
        type: String,
        required: true,
        unique: true
      },
      password:{
        type:String,
        required: true
      },
      username: {
        type: String,
      },
      created_at: {
        type: Date,
        default: Date.now(),
      },
    },
    {
      collection: 'users',
    }
  );
  
  export const UserModel = model<IUser>('User', userSchema);
  