import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

const AccountItem = ({
  label,
  href,
  icon: Icon,
}: {
  label: string;
  href: string;
  icon: IconType;
}) => {
  return (
    <Link href={href} target="_blank">
      <Icon className="text-2xl" />
    </Link>
  );
};

export default AccountItem;