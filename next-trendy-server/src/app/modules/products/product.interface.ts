import { Types } from 'mongoose';

export type TReviews = {
  reviewId: Types.ObjectId;
};
export type TVariant = {
  variantId: Types.ObjectId;
};

export type TProduct = {
  name: string;
  category: string;
  price: number;
  description: string;
  material: string;
  variant?: TVariant[];
  tags?: string[];
  productCode?: string;
  reviews?: TReviews[];
  sellsQuantity?: number;
  subCategory: string;
  discount?: number;
  published?: boolean;
  isDeleted?: boolean;
};
