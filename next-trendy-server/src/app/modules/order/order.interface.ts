export type TOrderItem = {
  productId: string;
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
}

export type TPaymentDetails = {
  method: "cash on delivery" | "cash on payment";
  paymentStatus: "Pending" | "Paid" 
  transactionId?: string;
}

export type TOrder = {
  _id: string;
  orderNumber: string;
  customerEmail?: string; 
  customerPhone?: string; 
  items: TOrderItem[];
  shippingAddress: TShippingAddress;
  paymentDetails: TPaymentDetails;
  totalAmount: number;
  orderStatus: "Pending" | "Shipped" | "Delivered" | "Cancel";
  orderDate: Date;
  deliveryDate?: Date;
  trackingNumber?: string; 
}
