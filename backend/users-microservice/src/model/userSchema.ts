import { Schema, model } from 'mongoose';
import { IUser } from "./user";
import bcrypt from 'bcrypt';

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
  
  //hash password before the "save"
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

  export const UserModel = model<IUser>('User', userSchema);
  