import bcrypt from 'bcryptjs';

import { Schema, model } from 'mongoose';

export interface IUser {
  _id?: string;
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  age: number;
  type: string;
  created: { type: DateConstructor; default: number };
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      // required: true,
      unique: true,
      // lowercase: true,
    },
    password: {
      type: String,
      // required: true,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    age: {
      type: Number,
    },
    created: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    collection: 'users',
  }
);

//hash password before the "save"
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const UserModel = model<IUser>('User', userSchema);
