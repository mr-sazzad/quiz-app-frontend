import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

const FooterItem = ({
  label,
  icon: Icon,
  href,
  active,
}: {
  label: string;
  icon: IconType;
  href: string;
  active: boolean;
}) => {
  return (
    <Link
      href={href}
      className={`flex flex-col gap-1 justify-center items-center w-full h-full hover:bg-green-200 ${
        active && "bg-green-200 font-medium border-l-green-500"
      }`}
    >
      <Icon className={`${active && "text-green-600"}`} />
      <p className={`flex text-sm ${active && "font-medium"}`}>{label}</p>
    </Link>
  );
};

export default FooterItem;
