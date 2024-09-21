import { Loader2 } from "lucide-react";

const CustomLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 strokeWidth={1.25} className="w-7 h-7 animate-spin text-primary" />
    </div>
  );
};

export default CustomLoader;
