import { getUserFromLocalStorage } from "@/helpers/jwt";
import React from "react";

const Logo = () => {
  const user = getUserFromLocalStorage() as any;
  return (
    <div className="text-xl font-semibold">
      <p>{user?.role === "user" || !user ? "Quizzify:" : "MindMingle"}</p>
    </div>
  );
};

export default Logo;
