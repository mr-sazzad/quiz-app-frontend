import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <div className="animate-spin rounded-full border-t-4 border-green-500 border-opacity-75 h-12 w-12" />
        <p className="mt-4 text-gray-600">Loading ...</p>
      </div>
    </div>
  );
};

export default Loading;
