import { CircleEllipsis, Loader2 } from "lucide-react";
import React from "react";


const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
    <Loader2 strokeWidth={1} className="w-8 h-8 animate-spin text-primary"/>
    </div>
  );
};

export default Loader;
