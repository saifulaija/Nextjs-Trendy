
'use client'
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { MinusCircle, PlusCircle, Edit, X } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  Table,
  TableBody,
  TableCell,
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
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { formateMoney } from "@/utils/formateMoney";
import { truncateTitle } from "@/utils/truncateTitle";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  addShippingCost,
  clearShippingCost,
} from "@/redux/api/features/product/shippingSlice";

const ShoppingCart = () => {
  const router = useRouter();
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  console.log(cart);
  

  const [shippingCost, setShippingCost] = useState<number | null>(null);
  useEffect(() => {
    const savedShippingCost = localStorage.getItem("shippingCost");
    if (savedShippingCost) {
      setShippingCost(Number(savedShippingCost));
    }
  }, []);

  useEffect(() => {
    if (shippingCost !== null) {
      localStorage.setItem("shippingCost", String(shippingCost));
      dispatch(addShippingCost(shippingCost));
    } else {
      localStorage.removeItem("shippingCost");
      dispatch(clearShippingCost());
    }
  }, [shippingCost, dispatch]);

  const handleShippingChange = (value: string) => {
    setShippingCost(Number(value));
  };

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
    dispatch(clearShippingCost());
    localStorage.removeItem("shippingCost");
  };

  const totalAmount = cart.cartItems.reduce((sum, item) => {
    const discountAmount = (item.price * (item.discount || 0)) / 100;
    const finalPrice = (item.price - discountAmount) * item.cartQuantity;
    return sum + finalPrice;
  }, 0);

  const handleDetails = (name: string) => {
    const formattedProductName = name.replace(/\s+/g, "-");
    router.push(`/product/details/${formattedProductName}`);
  };

  const isCheckoutDisabled = shippingCost === null;

  return (
    <div className="w-full py-10 px-4 md:p-10">
      <Card className="max-w-7xl mx-auto flex flex-col">
        {cart.cartItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">Your cart is empty.</p>
          </div>
        ) : (
          <div className="w-full flex flex-col md:flex-row">
            {/* Table Section */}
            <div className="w-full md:w-3/5 pr-4 mb-6 md:mb-0">
              <h1 className="font-semibold text-xl my-2 text-center">
                An overview of your order
              </h1>
              <Separator />
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
                                  className="text-white hover:text-primary"
                                />
                              </Button>
                            </div>
                            <span className="text-sm font-medium text-gray-700 text-center md:text-left">
                              {truncateTitle(item.name, 10)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{item.size}</TableCell>
                        <TableCell>{item.color}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
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
                          {formateMoney(finalPrice)}
                        </TableCell>
                        <TableCell className="text-right text-red-500">
                          {formateMoney(savedAmount)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            onClick={() => handleDetails(item.name)}
                            variant="ghost"
                          >
                            <Edit size={18} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <div className="flex justify-end -mt-6">
                <Button
                  onClick={handleClearCart}
                  variant="link"
                  className={cn("text-red-500")}
                >
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Details Section */}
            <div className="w-full md:w-2/5 p-4 bg-gray-50 border-2 border-primary rounded-[5px]">
              <h2 className="font-semibold text-xl">Order Details</h2>
              <Separator className="mb-4" />
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-500">Subtotal</p>
                <p className="text-gray-500">{formateMoney(totalAmount)}</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-500">Shipping</p>
                <p className="text-gray-500">
                  {shippingCost
                    ? formateMoney(shippingCost)
                    : "Select Shipping"}
                </p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-500">Estimated Tax</p>
                <p className="text-gray-500">BDT 0.00</p>
              </div>
              <p>
                Shipping to Dhaka, Bangladesh
                <span className="text-blue-500 cursor-pointer">
                  {" "}
                  Change address
                </span>
              </p>
              <Separator className={cn("text-primary my-1")} />
              <div>
                <RadioGroup
                  value={String(shippingCost)}
                  onValueChange={handleShippingChange}
                >
                  <div className="flex items-center space-x-2 p-2 rounded-sm">
                    <RadioGroupItem value="60" id="insideDhaka60" />
                    <Label htmlFor="insideDhaka60">
                      Inside Dhaka City:{" "}
                      <span className="font-semibold">BDT 60.00</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded-sm">
                    <RadioGroupItem value="100" id="insideDhaka100" />
                    <Label htmlFor="insideDhaka100">
                      Outside Dhaka City:{" "}
                      <span className="font-semibold">BDT 100.00</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-600 font-semibold">Total</p>
                <p className="text-lg font-semibold">
                  {formateMoney(totalAmount + (shippingCost || 0))}
                </p>
              </div>
              <div className="flex space-x-4 mt-4">
                {isCheckoutDisabled ? (
                  <Button disabled className="w-full uppercase">
                    Go to Checkout
                  </Button>
                ) : (
                  <Link
                    href="/checkout"
                    className={cn(buttonVariants(), "w-full uppercase")}
                  >
                    Go to Checkout
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ShoppingCart;

