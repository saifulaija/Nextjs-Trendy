"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  addToCart,
  clearCart,
  decreaseCart,
  removeFromCart,
} from "@/redux/api/features/product/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { formateMoney } from "@/utils/formateMoney";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CheckoutForm from "@/form/CheckoutForm";
import { Button } from "@/components/ui/button";
import { Edit, X } from "lucide-react";
import { MinusCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { truncateTitle } from "@/utils/truncateTitle";
import { cn } from "@/lib/utils";

const Checkout = () => {
  const router = useRouter();
  const cart = useAppSelector((state) => state.cart);
  const shipping = useAppSelector((state) => state.shipping);
  const dispatch = useAppDispatch();
  const shippingCost = useAppSelector((state) => state.shipping.shippingCost);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [shippingCharge, setShippingCharge] = useState(shipping.shippingCost);
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

  const handlePlaceOrder = () => {
    // Add your place order logic here
    console.log("Order placed successfully!");
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const totalAmount = cart.cartItems.reduce((sum, item) => {
    const discountAmount = (item.price * (item.discount || 0)) / 100;
    const finalPrice = (item.price - discountAmount) * item.cartQuantity;
    return sum + finalPrice;
  }, 0);

  const sumMoney = Math.ceil(totalAmount + shippingCharge);

  const handleDetails = (name: string) => {
    if (name) {
      const formattedProductName = name.replace(/\s+/g, "-");

      router.push(`/product/details/${formattedProductName}`);
    }
  };

  return (
    <div className="w-full py-5 px-4 md:p-5">
      <Card className="max-w-5xl mx-auto p-6 md:p-15 flex flex-col">
        {cart.cartItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              Your cart is empty. Start adding items to see them here!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {/* Table Section */}
            <div className="w-full overflow-auto">
              <h1 className="font-semibold text-2xl  text-center -mt-2">
                An overview of your orders
              </h1>
              <Separator className="my-2" />
              <Table className="overflow-x-auto overflow-y-auto">
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Color</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-center">Price</TableHead>
                    <TableHead className="text-center">Saved</TableHead>
                    <TableHead className="text-center">Action</TableHead>
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
                      <TableRow key={item._id}>
                        <TableCell>
                          <div className="flex flex-col md:flex-row items-center gap-4">
                            {/* Image */}
                            <div className="relative">
                              <img
                                src={item.image || "/image"}
                                alt={item.name}
                                width={50}
                                height={50}
                                className="rounded-md"
                              />
                              <Button
                                onClick={() => handleRemoveItem(item)}
                                variant="link"
                                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md "
                              >
                                <X
                                  size={18}
                                  className="text-white hover:text-primary transition-colors duration-300"
                                />
                              </Button>
                            </div>
                            <span className="text-sm font-medium text-gray-600 text-center md:text-left">
                              {truncateTitle(item.name, 10)}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell className={cn("text-gray-600")}>
                          {item.size}
                        </TableCell>
                        <TableCell className={cn("text-gray-600")}>
                          {item.color}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Button
                              onClick={() => handleDecreaseQuantity(item)}
                              variant="ghost"
                            >
                              <MinusCircledIcon />
                            </Button>
                            <span>{item.cartQuantity}</span>
                            <Button
                              onClick={() => handleIncreaseQuantity(item)}
                              variant="ghost"
                            >
                              <PlusCircledIcon />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className={cn("text-gray-600 text-right")}>
                          {formateMoney(Number(finalPrice.toFixed(0)))}
                        </TableCell>
                        <TableCell className="text-right text-red-500">
                          {formateMoney(Number(savedAmount.toFixed(0)))}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            onClick={() => {
                              handleDetails(item.name);
                            }}
                            variant="link"
                            className={cn(
                              "hover:border-none text-gray-500 hover:text-primary"
                            )}
                          >
                            <Edit size={18} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              <div className="flex justify-end -mt-6 mb-3 group">
                <Button
                  onClick={() => {
                    if (confirm("Are you sure you want to clear the cart?")) {
                      handleClearCart();
                    }
                  }}
                  variant="link"
                  className={cn(
                    "text-red-500 font-medium transition-colors duration-300 group",
                    "hover:text-red-700 group-hover:cursor-pointer"
                  )}
                >
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Details and Checkout Form Section */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 justify-center -mt-6">
              <div className="w-full md:w-1/2 p-6 bg-gray-100 shadow-lg border-2 border-primary rounded-[5px]">
                <h2 className="font-bold text-xl mb-2 uppercase">Your Order</h2>

                <Separator className="mb-2  bg-primary p-[2px] rounded-[5px]" />

                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-500">Subtotal</p>
                  <p className="text-gray-500">
                    {formateMoney(Number(totalAmount.toFixed(0)))}
                  </p>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-500">Shipping</p>
                  <p className="text-gray-500">
                    {formateMoney(shipping.shippingCost)}
                  </p>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-500">Estimated Tax</p>
                  <p className="text-gray-500">BDT 0.00</p>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-700 font-semibold">Total</p>
                  <p className="text-lg font-semibold">
                    {formateMoney(sumMoney)}
                  </p>
                </div>

                <Separator className="mb-2" />

                <div className="flex flex-col">
                  <p className="text-gray-600 font-semibold mb-2">
                    Payment Method
                  </p>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="cashOnDelivery"
                      name="paymentMethod"
                      className="mr-2 "
                      onChange={() =>
                        handlePaymentMethodChange("cashOnDelivery")
                      }
                    />
                    <label htmlFor="cashOnDelivery" className="text-gray-500">
                      Cash on Delivery
                    </label>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 p-6 bg-gray-100 rounded-[5px] shadow-lg border-2 border-primary">
                <h2 className="font-bold text-xl uppercase">
                  Billing & Shipping
                </h2>
                <Separator className="mb-2 mt-2 bg-primary p-[2px] rounded-[5px]" />
                <CheckoutForm paymentMethod={paymentMethod} />
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Checkout;
