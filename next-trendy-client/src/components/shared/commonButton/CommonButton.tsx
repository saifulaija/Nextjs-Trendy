import { ChevronRight } from "lucide-react";
import React from "react";
import Link from "next/link";

interface CommonButtonProps {
  title: string;
  href: string;
}

const CommonButton: React.FC<CommonButtonProps> = ({ title, href }) => {
  return (
    <Link href={href}>
      <div className="w-full flex items-center justify-center">
        <button className="relative w-full px-6 py-2 border border-neutral-400 rounded-md hover:text-white uppercase font-semibold flex items-center justify-between group transition-all duration-300 overflow-hidden hover:border-primary">
          <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-2">
            {title}
          </span>
          <ChevronRight className="relative z-10 ml-2 transition-transform duration-300 group-hover:translate-x-4" />
          <div className="absolute inset-0 bg-primary w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></div>
        </button>
      </div>
    </Link>
  );
};

export default CommonButton;
