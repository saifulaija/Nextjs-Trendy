"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle, Trash2, Edit } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  addToCart,
  decreaseCart,
  removeFromCart,
  clearCart,
} from "@/redux/api/features/product/cartSlice";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { it } from "node:test";

const ShoppingCart = () => {
  const router = useRouter();
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleDecreaseQuantity = (item: any) => {
    dispatch(decreaseCart(item));
  };

  const handleIncreaseQuantity = (item: any) => {
    dispatch(addToCart(item));
  };

  const handleRemoveItem = (item: any) => {
    dispatch(removeFromCart(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Calculate total amount and total saved amount
  const totalAmount = cart.cartItems.reduce((sum, item) => {
    const discountAmount = (item.price * (item.discount || 0)) / 100;
    const finalPrice = (item.price - discountAmount) * item.cartQuantity;
    return sum + finalPrice;
  }, 0);

  const totalSaved = cart.cartItems.reduce((sum, item) => {
    const discountAmount = (item.price * (item.discount || 0)) / 100;
    const savedAmount = discountAmount * item.cartQuantity;
    return sum + savedAmount;
  }, 0);

  const handleDetails = (id: string) => {
    router.push(`/product/details/${id}`);
  };

  return (
    <div className="w-full py-10 px-4 md:p-10">
      <Card className="max-w-5xl flex flex-col justify-center items-center mx-auto">
        {cart.cartItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">Your cart is empty.</p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-center">Price</TableHead>
                  <TableHead className="text-center">Saved</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.cartItems.map((item) => {
                  const discountAmount =
                    (item.price * (item.discount || 0)) / 100;
                  const savedAmount = discountAmount * item.cartQuantity;
                  const finalPrice =
                    (item.price - discountAmount) * item.cartQuantity;

                  return (
                    <TableRow key={item._id + item.color}>
                      <TableCell>
                        <Image
                          src={item.image || "/image"}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="object-cover rounded-md"
                        />
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.size}</TableCell>
                      <TableCell>{item.color}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2 border">
                          <Button
                            onClick={() => handleDecreaseQuantity(item)}
                            variant="ghost"
                          >
                            <MinusCircle size={18} />
                          </Button>
                          <span>{item.cartQuantity}</span>
                          <Button
                            onClick={() => handleIncreaseQuantity(item)}
                            variant="ghost"
                          >
                            <PlusCircle size={18} />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-serif font-semibold ">৳</span>
                        {finalPrice.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right text-red-500">
                        <span className="font-serif font-semibold ">-৳</span>
                        {savedAmount.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleRemoveItem(item)}
                            variant="ghost"
                          >
                            <Trash2 size={18} />
                          </Button>
                          <Button
                            onClick={() => {
                              handleDetails(item._id);
                            }}
                            variant="ghost"
                          >
                            <Edit size={18} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            <div className="flex justify-center items-center mx-auto max-w-4xl w-full">
              <div className="p-6  w-full">
                <p className="font-semibold text-xl mb-4">Cart Summary</p>
                <Separator className="mb-4" />
                <div className="flex justify-between items-center mb-4">
                  <p className="text-gray-600">Total Saved</p>
                  <Badge className="text-white">
                    <span className="font-serif font-semibold">৳</span>{" "}
                    {totalSaved.toFixed(2)}
                  </Badge>
                </div>
                <Separator className="mb-4" />
                <div className="flex justify-between items-center mb-6">
                  <p className="text-gray-600">Total Amount</p>
                  <p className="text-lg font-semibold">
                    <span className="font-serif font-semibold">৳</span>{" "}
                    {totalAmount.toFixed(2)}
                  </p>
                </div>
                <div className="flex space-x-4">
                  <Button
                    onClick={handleClearCart}
                    className={cn(
                      "bg-red-500 text-white hover:bg-red-600 w-full uppercase"
                    )}
                  >
                    Clear Cart
                  </Button>
                  <Button
                    className={cn(
                      "bg-blue-500 text-white hover:bg-blue-600 w-full uppercase"
                    )}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ShoppingCart;
