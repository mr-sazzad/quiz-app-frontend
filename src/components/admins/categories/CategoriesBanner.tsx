import React from "react";

const CategoriesBanner = ({title, description}: {title: string, description: string}) => {
  return (
    <div className="min-h-[200px] w-full bg-green-100 flex justify-center items-center md:px-0 md:py-0 px-[30px] py-[30px] rounded">
      <div>
        <h2 className="sm:text-3xl text-2xl font-semibold text-center">
          {title}
        </h2>
        <p className="max-w-[400px] text-center mt-3 text-sm text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CategoriesBanner;
