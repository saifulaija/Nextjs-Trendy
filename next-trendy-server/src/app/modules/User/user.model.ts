/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';

import config from '../../config';
import { TUser, UserModel } from './user.interface';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
     
    },
    email: {
      type: String,
      unique:true
     
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
   

    role: {
      type: String,
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

// userSchema.pre('save', async function (next) {
//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this; // doc

//   user.phone = await bcrypt.hash(
//     user.phone,
//     Number(config.bcrypt_salt_rounds),
//   );
//   next();
// });

userSchema.statics.isUserExistsByPhone = async function (phone: string) {
  return await User.findOne({ phone });
};
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email });
};

// userSchema.statics.isPasswordMatched = async function (
//   plainTextPassword,
//   hashedPassword,
// ) {
//   return await bcrypt.compare(plainTextPassword, hashedPassword);
// };

export const User = model<TUser, UserModel>('User', userSchema);
