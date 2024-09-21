import { Types } from 'mongoose';

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
  sellsQuantity?: number;
  subCategory: string;
  discount?: number;
  averageRating: number;
  totalReviews: number;
  arrivalDate?: Date;
  published?: boolean;
  isDeleted?: boolean;
};
