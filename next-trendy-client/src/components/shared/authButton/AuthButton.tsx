'use client'

import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import React from "react";

const AuthButton = () => {
    const user=null
     const handleLogout = () => {
       // Handle logout logic here
     };
  return (
    <div>
      {user ? (
        <Button onClick={handleLogout} asChild className="cursor-pointer group">
          <span className="flex items-center gap-2">
            Logout
            <LogOut className="transition-transform duration-300 ease-in-out transform group-hover:translate-x-1" />
          </span>
        </Button>
      ) : (
        <Button
          asChild
          variant="outline"
          className="hover:bg-primary text-gray-400 hover:text-white px-2 py-1 rounded-[5px]  bg-white hover:border-primary  duration-300 ease-in-out transition-all  hover:transition-all hover:duration-200"
        >
          <Link href="/account/login" className="flex items-center font-semibold">
            <User className="font-semibold" />
          </Link>
        </Button>
      )}
    </div>
  );
};

export default AuthButton;
