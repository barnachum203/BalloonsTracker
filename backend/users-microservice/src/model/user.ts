import { Schema, model } from 'mongoose';
export interface IUser {
  _id: number;
  email: string;
  password: string;
  username: string;
  created_at?: Date;
}

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
