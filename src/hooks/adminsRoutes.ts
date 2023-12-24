"use client";

const root = "/admin/quiz";

import { usePathname } from "next/navigation";
import { BiCategoryAlt } from "react-icons/bi";
import { BsPatchQuestion } from "react-icons/bs";
import { MdOutlineLeaderboard } from "react-icons/md";

const useRoutes = () => {
  const pathname = usePathname();

  const adminRoutes = [
    {
      id: 1,
      label: "Categories",
      href: `${root}/categories`,
      icon: BiCategoryAlt,
      active: pathname.startsWith(`${root}/categories`),
    },
    {
      id: 2,
      label: "Questions",
      href: `${root}/questions`,
      icon: BsPatchQuestion,
      active: pathname.startsWith(`${root}/questions`),
    },
    {
      id: 3,
      label: "Leaderboard",
      href: `${root}/leaderboard`,
      icon: MdOutlineLeaderboard,
      active: pathname.startsWith(`${root}/leaderboard`),
    },
  ];

  return adminRoutes;
};

export default useRoutes;
