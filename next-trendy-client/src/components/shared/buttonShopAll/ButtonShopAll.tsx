import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight, Link } from "lucide-react";
import React from "react";

const ButtonShopAll = () => {
  return (
    <div className="flex justify-center items-center mt-5">
      <Button asChild className={cn("group ")}>
        <Link href="/shop">
          <span className="flex items-center gap-2">
            <span className="tracking-wide uppercase font-semibold">
              Shop All
            </span>
            <ChevronRight className="transition-transform duration-300 ease-in-out transform group-hover:translate-x-1" />
          </span>
        </Link>
      </Button>
    </div>
  );
};

export default ButtonShopAll;
