import { Types } from 'mongoose';

export type TStock = {
  color: string;
  quantity: number;
  image: string;
};
export type TVariant = {
  size:string;
  productId: Types.ObjectId;
  variant: TStock[];
  isDeleted:boolean
};


