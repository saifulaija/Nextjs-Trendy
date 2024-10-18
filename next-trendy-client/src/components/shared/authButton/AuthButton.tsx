"use client";

import assets from "@/app/assets";
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
    toast.warning("user logout successfully", { position: "bottom-left" });
  };

  return (
    <>
      {user && user.userId ? (
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className={cn("border-none cursor-pointer")}
          >
            <Image
              src={assets.images.login_user}
              width={50}
              height={50}
              alt="login image"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/dashboard/${user.role}`}>
              <DropdownMenuItem className={cn("cursor-pointer")}>
                Dashboard
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className={cn("cursor-pointer")}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/account/login" passHref>
          <Button variant="link" asChild className={cn()}>
            <div
              className="flex items-center group cursor-pointer hover:text-primary transition-all duration-200"
              aria-label="User options"
              role="button"
            >
              <User
                strokeWidth={2.5}
                className="w-5 h-5 text-gray-700 group-hover:text-primary transition-colors duration-200"
              />
              <ChevronDown
                strokeWidth={2.5}
                className="w-5 h-5 text-gray-700 group-hover:text-primary transition-colors duration-200"
              />
            </div>
          </Button>
        </Link>
      )}
    </>
  );
};

export default AuthButton;
