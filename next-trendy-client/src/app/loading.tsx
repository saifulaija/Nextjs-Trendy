import { CircleEllipsis, Loader2 } from "lucide-react";
import React from "react";


const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
    <Loader2 strokeWidth={2.5} className="w-10 h-10 animate-spin text-primary"/>
    </div>
  );
};

export default Loader;
