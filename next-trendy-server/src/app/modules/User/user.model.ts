// /* eslint-disable @typescript-eslint/no-this-alias */

// import { Schema, model } from 'mongoose';

// import { TUser } from './user.interface';

// const userSchema = new Schema<TUser>(
//   {
//     name: {
//       type: String,
//     },
//     email: {
//       type: String,
//       unique: true,
//     },
//     phone: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     district: {
//       type: String,
//     },
//     thana: {
//       type: String,
//     },
//     village: { type: String },
//     postalCode: {
//       type: String,
//     },

//     role: {
//       type: String,
//       required: true,
//       default: 'user',
//     },

//     isDeleted: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

// userSchema.statics.isUserExistsByPhone = async function (phone: string) {
//   return await User.findOne({ phone });
// };


// export const User = model<TUser>('User', userSchema);


/* eslint-disable @typescript-eslint/no-this-alias */

import { Schema, model, Model } from 'mongoose';
import { TUser } from './user.interface';

// Interface for the static method
interface UserModel extends Model<TUser> {
  isUserExistsByPhone(phone: string): Promise<TUser | null>;
}

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
    },
    phone: {
      type: String,
      unique: true,
    },
    district: {
      type: String,
    },
    thana: {
      type: String,
    },
    village: { type: String },
    postalCode: {
      type: String,
    },
    role: {
      type: String,
      required: true,
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

// Adding the static method to the schema
userSchema.statics.isUserExistsByPhone = async function (phone: string) {
  return await this.findOne({ phone });
};

// Creating the User model with the static method interface
export const User = model<TUser, UserModel>('User', userSchema);

