import { Loader2 } from "lucide-react";

const CustomLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 strokeWidth={2.5} className="w-10 h-10 animate-spin text-primary" />
    </div>
  );
};

export default CustomLoader;
