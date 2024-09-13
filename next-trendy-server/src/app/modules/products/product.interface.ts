
import { Types } from 'mongoose';

export type TReviews = {
  reviewId: Types.ObjectId;
};
export type TVariant = {
  variant: Types.ObjectId;

};

export type TProduct = {
  name: string;
  category: string;
  price: number;
  description: string;
  material: string;
  variant?: Types.ObjectId[];
  tags?: string[];
  productCode?: string;
  reviews?: TReviews[];
  sellsQuantity?: number;
  subCategory: string;
  discount?: number;
  published?: boolean;
  isDeleted?: boolean;
};
