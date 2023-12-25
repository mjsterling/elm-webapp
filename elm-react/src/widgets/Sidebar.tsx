import {
  ArrowsRightLeftIcon,
  CalendarDaysIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { auth } from "../firestore";
import { StyledNavLink } from "../components/StyledNavLink";

export const Sidebar = () => {
  const { currentUser } = auth;
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div
      className="flex flex-col h-full w-60 relative transition-all p-2"
      style={{ marginLeft: collapsed ? "-230px" : "0" }}
    >
      <h3 className="text-lg">
        Welcome back{currentUser?.displayName ? ", " : ""}
        {currentUser?.displayName}!
      </h3>
      <div className="w-full flex flex-col gap-1 my-4">
        <StyledNavLink to="/" icon={<CalendarDaysIcon />} label="Calendar" />
        <StyledNavLink
          to="/users"
          icon={<UserGroupIcon />}
          label="Manage Users"
        />
      </div>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-5 top-[calc(50%_-_10px)] z-50 bg-white px-2 py-4 rounded-r-full"
      >
        <ArrowsRightLeftIcon className="h-5 w-5 text-gray-700 " />
      </button>
    </div>
  );
};
