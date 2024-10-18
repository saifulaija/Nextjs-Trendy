/* eslint-disable no-unused-vars */

import { USER_ROLE } from './user.constant';

export interface TUser {

  _id: any;
  name?: string;
 
  profilePhoto?: string;
  district?: string;
  thana?: string;
  village?: string;
  postalCode?: string;
  phone?: string;
  role: string;
  isDeleted: boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
