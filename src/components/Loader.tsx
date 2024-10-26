import React from "react";

const Loader = () => {
  return (
    <div className="w-[200px] mx-auto">
      <div className="animate-pulse">
        <div className="bg-gray-300 h-[250px] w-full"></div>
        <div className="mt-2 h-2 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default Loader;
