import { Loader2 } from "lucide-react";

const CustomLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 strokeWidth={1} className="w-8 h-8 animate-spin text-primary" />
    </div>
  );
};

export default CustomLoader;
