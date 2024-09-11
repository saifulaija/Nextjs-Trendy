// 'use client'

// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { ChevronRight, LogOut, User } from "lucide-react";
// import Link from "next/link";
// import React from "react";

// const AuthButton = () => {
//     const user=null
//      const handleLogout = () => {
//        // Handle logout logic here
//      };
//   return (
//     <div>
//       {user ? (
//         <Button onClick={handleLogout} asChild className="cursor-pointer group">
//           <span className="flex items-center gap-2">
//             Logout
//             <LogOut className="transition-transform duration-300 ease-in-out transform group-hover:translate-x-1" />
//           </span>
//         </Button>
//       ) : (
//         <Button
//           asChild
//           variant="outline"
//           className="hover:bg-primary text-gray-400 hover:text-white  bg-white hover:border-primary  duration-300 ease-in-out transition-all  hover:transition-all hover:duration-200"
//         >
//           <Link href="/account/login" className="flex items-center font-semibold">
//             <User className="font-semibold" />
//           </Link>
//         </Button>

//       )}
//     </div>
//   );
// };

// export default AuthButton;

"use client";

import assets from "@/app/assets";
import { MyAvatar } from "@/components/shadcn/MyAvatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { logoutUser } from "@/services/actions/logOutUser";
import { getUserInfo } from "@/services/authServices";
import { ChevronDown, User } from "lucide-react";
import Image from "next/image";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AuthButton = () => {
  const user = getUserInfo();
  console.log(user);

  const router = useRouter();
  const handleLogout = () => {
    logoutUser(router);
    toast.warning("user logout successfully");
  };

  return (
    <>
      {user && user.userId ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className={cn("border-none")}>
            <Button variant="secondary" size="icon" className="rounded-full">
              {/* <MyAvatar url={assets.images.login_user} alt="User Avatar" /> */}
              <Image
                src={assets.images.login_user}
                width={50}
                height={50}
                alt="login image"
              />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/dashboard/${user.role}`}>
              <DropdownMenuItem>Dashboard</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/account/login" passHref>
          <Button variant="link" asChild className={cn()}>
            <div className="flex items-center gap-1">
              <User
                strokeWidth={2.5}
                className="w-5 h-5  text-gray-700 transition-all duration-200 group-hover:text-white"
              />
              <ChevronDown
                strokeWidth={2.5}
                className="w-5 h-5 text-gray-700 transition-all duration-200 group-hover:text-white"
              />
            </div>
          </Button>
        </Link>
      )}
    </>
  );
};

export default AuthButton;
