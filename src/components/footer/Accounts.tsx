import React from "react";

import { BiLogoFacebookSquare } from "react-icons/bi";
import { BiLogoDiscordAlt } from "react-icons/bi";
import { FaSquareGithub } from "react-icons/fa6";
import AccountItem from "./AccountItem";

const myAccounts = [
  {
    id: 1,
    label: "Facebook",
    icon: BiLogoFacebookSquare,
    href: "https://web.facebook.com/profile.php?id=100077653895732",
  },
  {
    id: 1,
    label: "Github",
    icon: FaSquareGithub,
    href: "https://github.com/mr-sazzad",
  },
  {
    id: 1,
    label: "Discord",
    icon: BiLogoDiscordAlt,
    href: "https://discord.com/users/996832235296657510",
  },
];

const Accounts = () => {
  return (
    <div className="flex gap-3">
      {myAccounts.map((account) => (
        <AccountItem
          key="account.id"
          label={account.label}
          href={account.href}
          icon={account.icon}
        />
      ))}
    </div>
  );
};

export default Accounts;
