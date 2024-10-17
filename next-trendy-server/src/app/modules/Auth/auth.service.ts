import httpStatus from 'http-status';
import config from '../../config';

import { TLoginUser } from './auth.interface';
import { createToken, verifyToken } from './auth.utils';
import AppError from '../../errors/AppError';
import bcrypt from 'bcrypt';
import { User } from '../User/user.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
const loginUser = async (payload: TLoginUser) => {
  // checking if the user exists
  const user = await User.isUserExistsByPhone(payload.phone);

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Phone number not matched, please provide the correct phone number.',
    );
  }

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!');
  }

  // Ensure that email and name are always strings by using a default value
  const jwtPayload = {
    userId: user?._id,
    name: user?.name || '', // default to an empty string if undefined
    email: user?.email || '', // default to an empty string if undefined
    phone: user?.phone, // phone is required, so no need for a default
    role: user.role as string,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid

  const decoded = verifyToken(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { phone } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistsByPhone(phone);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  const jwtPayload = {
    name: user?.name || '', // default to an empty string if undefined
    email: user?.email || '', // default to an empty string if undefined
    phone: user?.phone, // phone is required, so no need for a default
    role: user.role as string,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
  refreshToken,
};
