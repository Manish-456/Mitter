import React from "react";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import SidebarLogo from "./SidebarLogo";
import useCurrentUser from "@/hooks/useCurrentUser";
import SidebarItem from "./SidebarItem";
import { signOut } from "next-auth/react";

import SidebarTweetButton from "./SidebarTweetButton";
const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();

  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Notifications",
      href: "/notification",
      icon: BsBellFill,
      auth: true,
      alert : currentUser?.hasNotification
    },
    {
      label: "Profile",
      href: `/users/${currentUser?.id}`,
      icon: FaUser,
      auth: true,
    },
  ];
  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-center">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              auth={item.auth}
              label={item.label}
              icon={item.icon}
              alert={item.alert}
            />
          ))}
          {currentUser && (
            <SidebarItem
              href=""
              onClick={() => signOut()}
              label="Logout"
              icon={BiLogOut}
         
            />
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
