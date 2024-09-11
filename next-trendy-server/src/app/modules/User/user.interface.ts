/* eslint-disable no-unused-vars */


import { USER_ROLE } from './user.constant';

export interface TUser {
  name?: string;
  email?: string;
  phone:string;
  role: string;
  isDeleted: boolean;
}



export type TUserRole = keyof typeof USER_ROLE;
