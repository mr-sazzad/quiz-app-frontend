import { USER_ROLE } from ".";

export const NavbarItems = (role: string) => {
  const defaultMenu = [
    {
      label: <span>Home</span>,
      href: `/`,
      key: `/`,
    },
    {
      label: <span>Questions</span>,
      href: `/questions`,
      key: `/questions`,
    },
    {
      label: <span>profile</span>,
      href: `/profile`,
      key: `/profile`,
    },
  ];

  const UserItems = [
    {
      label: <span>Home</span>,
      href: `/`,
      key: `/`,
    },
    {
      label: <span>Questions</span>,
      href: `/questions`,
      key: `/questions`,
    },
    {
      label: <span>Profile</span>,
      href: `/profile`,
      key: `/profile`,
    },
  ];

  const AdminItems = [
    {
      label: <span>Home</span>,
      href: `/${role}/home`,
      key: `/${role}/home`,
    },
    {
      label: <span>Profile</span>,
      href: `/profile`,
      key: `/profile`,
    },
    {
      label: <span>Dashboard</span>,
      href: `/${role}/quiz`,
      key: `/${role}/quiz`,
    },
  ];

  if (role === USER_ROLE.PERFORMER) return UserItems;
  else if (role === USER_ROLE.ADMIN) return AdminItems;
  else return defaultMenu;
};
