

export type TColorStock = {
  color: string;
  quantity: number;
};

export type TProductSizeColorStock = {
  size: string;
  colorsStock: TColorStock[];
};

export type TReviewSchema = {
  name: string;
  rating: number;
  description: string;
  isDeleted: boolean;
};


export type TProduct = {
  _id: string;
  name: string;
  price: number;
  description:string;
  discount?: number;
  variant?: Array<{
    _id: string;
    size: string;
    productId: string;
    variant: Array<{
      color: string;
      quantity: number;
      image: string;
      _id: string;
    }>;
    isDeleted?: boolean;
  }>;
  category?: string;
  subCategory?: string;
  tag?: string;
  // Add other properties as needed
};

