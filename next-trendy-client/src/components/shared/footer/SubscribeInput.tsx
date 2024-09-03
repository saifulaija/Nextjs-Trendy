import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ArrowRight } from "lucide-react";

const SubscribeInput = () => {
  return (
    <div className="relative w-full mt-6">
      <Input placeholder="Enter your email" className="w-full pr-10" />
      <Button
        asChild
        className="absolute top-0 right-0 h-full bg-red-500 border-none flex items-center justify-center p-2"
      >
        <ArrowRight />
      </Button>
    </div>
  );
};

export default SubscribeInput;
