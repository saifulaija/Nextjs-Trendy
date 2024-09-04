import React from "react";

const CustomHeader = ({ title, subtitle }:{title:string,subtitle?:string}) => {
  return (
    <div className="">
      <h1 className="text-xl md:text-2xl font-bold mb-2 text-primary uppercase text-center">{title}</h1>
      {subtitle && (
        <p className="text-sm md:text-base font-medium text-white/80">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default CustomHeader;
