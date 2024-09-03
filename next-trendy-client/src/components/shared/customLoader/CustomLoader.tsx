import React from "react";

const CustomLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-gray-300 h-8 w-8 animate-spin rounded-full border-4 border-t-primary"></div>
    </div>
  );
};

export default CustomLoader;
