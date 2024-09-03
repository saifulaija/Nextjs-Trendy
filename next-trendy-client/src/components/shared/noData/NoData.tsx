import assets from "@/app/assets";
import { buttonVariants } from "@/components/ui/button";
import { ResetIcon } from "@radix-ui/react-icons";
import Image from "next/image";

// Enhanced NoData component
interface NoDataProps {
  buttonText?: string;
  onButtonClick?: () => void;
}

export function NoData({
  buttonText = "Reload",
  onButtonClick = () => window.location.reload(),
}: NoDataProps) {
  return (
   <div className="flex justify-center items-center p-20 ">
        <div className="flex flex-col items-center justify-center h-full p-4 gap-2 text-center">
          <Image
            src={assets.images.noData}
            width={60}
            height={60}
            alt="No data"
            className=""
          />
          <p className="text-lg text-gray-600">No data available at the moment.</p>
          <button
            onClick={onButtonClick}
            className={`${buttonVariants()} flex items-center group`}
          >
            <ResetIcon className="transition-transform duration-300 ease-in-out transform group-hover:-translate-x-1 mr-2" />
            {buttonText}
          </button>
        </div>
   </div>
  );
}
