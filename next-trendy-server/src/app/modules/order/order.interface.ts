import { Types } from "mongoose";

export type TOrderItem = {
  productId: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  discount?: number;
  size?: string;
  color?: string;
  image?: string;
};

export type TShippingAddress = {
  fullName: string;
  address?: string;
  country?: string;
  description?:string;
  phoneNumber: string;
  location:'Outside Dhaka' | "Inside Dhaka"
}

export type TPaymentDetails = {
  method: "cash on delivery" | "cash on payment";
  paymentStatus: "Pending" | "Paid" 
  transactionId?: string;
}

export type TOrder = {
  orderNumber: string;
  items: TOrderItem[];
  shippingAddress: TShippingAddress;
  paymentDetails: TPaymentDetails;
  totalAmount: number;
  shippingCharge:number;
  orderStatus: "Pending" | "Shipped" | "Delivered" | "Cancel";
  orderDate: Date;
  deliveryDate?: Date;
  trackingNumber?: string; 
}
