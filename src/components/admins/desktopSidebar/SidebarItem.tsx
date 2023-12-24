import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

const SidebarItem = ({
  icon: Icon,
  label,
  href,
  active,
}: {
  icon: IconType;
  label: string;
  href: string;
  active: boolean;
}) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-3 py-1.5 hover:bg-green-200 hover:shadow border-l-4 hover:border-l-green-500 ${
        active
          ? "bg-green-200 font-medium border-l-green-500"
          : "border-l-4 border-white"
      }`}
    >
      <Icon className={`${active && "text-green-600"}`} /> {label}
    </Link>
  );
};

export default SidebarItem;
