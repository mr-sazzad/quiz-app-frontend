import React from "react";

const MaxWidth = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[1100px] mx-auto md:px-[50px] px-[30px]">
      {children}
    </div>
  );
};

export default MaxWidth;
