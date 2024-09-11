/* eslint-disable @typescript-eslint/no-this-alias */

import { Schema, model } from 'mongoose';


import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      required:true,
      unique: true,
    },
  

    role: {
      type: String,
      required:true,
      default: 'user',
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);


userSchema.statics.isUserExistsByPhone = async function (phone: string) {
  return await User.findOne({ phone });
};
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email });
};



export const User = model<TUser>('User', userSchema);
