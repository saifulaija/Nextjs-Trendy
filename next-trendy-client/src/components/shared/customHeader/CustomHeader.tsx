import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import React from "react";

const CustomHeader = ({ title, subtitle }:{title:string,subtitle?:string}) => {
  return (
    <div className="">
      <h1 className="text-xl font-bold mb-1 text-primary uppercase text-center">
        {title}
      </h1>
      <div className="flex items-center justify-center mx-auto">
        <Separator className={cn("w-16 bg-primary p-[2px] text-center rounded-[5px]")} />
      </div>
      {subtitle && (
        <p className="text-sm md:text-base font-medium text-primary text-center uppercase">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default CustomHeader;
