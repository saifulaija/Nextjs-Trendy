import { Button, buttonVariants } from "@/components/ui/button";
import LoginForm from "@/form/LoginForm";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Login | Trendy",
  description: "App generated by next.js & shadcn UI",
};

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center p-10  min-h-screen">
      <div
        className={cn(
          "max-w-7xl w-full p-6 flex flex-col md:flex-row items-center md:items-start justify-between"
        )}
      >
        {/* Login Form Section */}
        <div className="w-full md:w-1/2 p-4">
          <p className="text-red-500 mb-4 font-medium">
            Dear Trendy Shoppers, our website has been rebuilt to provide a
            better digital experience. If you registered with us before '4th
            July 2022', please click "Forgot Password" on the login page to
            reset your password. We sincerely apologize for any inconvenience.
          </p>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            SIGN IN TO YOUR ACCOUNT
          </h1>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Welcome back! If you're a TrendyClub member, sign in to unlock all
            the exclusive offers waiting for you. Enjoy TrendyClub discounts,
            cashback offers, vouchers, and more. If you’ve registered in-store,
            kindly create an online account to get started.
          </p>
          <LoginForm />
        </div>

        {/* Vertical Separator */}
        <Separator
          className={cn(
            "hidden md:block mx-6 h-auto w-[2px] p-[1px] bg-gray-200  rounded-[5px]"
          )}
          style={{ height: "500px" }} // Manually set height, or adjust as needed
        />

        {/* Trendy Club Information Section */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0 text-center md:text-left p-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            DON’T HAVE A TRENDY ACCOUNT?
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Become a TrendyClub member and enjoy exclusive benefits such as:
          </p>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>✓ 50 points on free signup</li>
            <li>✓ Up to 100 bonus points for profile updates</li>
            <li>✓ Birthday Treat</li>
            <li>✓ 1 Point for every BDT 100 spent</li>
            <li>✓ Bonus points for every second purchase over BDT 100+</li>
          </ul>
          <Link href="/account/register">
            <Button
              className={cn(
                "uppercase font-bold mt-6 max-w-xs w-full text-[18px] tracking-wider"
              )}
            >
              Create Trendy Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
