import { Types } from 'mongoose';

export type TStock = {
  color: string;
  quantity: number;
  image: string;
};
export type TVariant = {
  size:string;
  product: Types.ObjectId;
  variant: TStock[];
  isDeleted:boolean
};


