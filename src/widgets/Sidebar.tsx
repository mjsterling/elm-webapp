import {
  ArrowLeftStartOnRectangleIcon,
  ArrowsRightLeftIcon,
  CalendarDaysIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { StyledNavLink } from "../components/StyledNavLink";
import { useFirebase } from "../providers/FirebaseProvider";

export const Sidebar = () => {
  const firebase = useFirebase();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div
      className="flex flex-col h-full w-60 relative transition-all p-2 justify-between"
      style={{ marginLeft: collapsed ? "-230px" : "0" }}
    >
      <div className="flex flex-col">
        <h2 className="pl-2 pt-2">
          Welcome back
          {firebase?.auth.currentUser?.displayName ? ", " : ""}
          {firebase?.auth.currentUser?.displayName?.split(" ")[0]}
        </h2>
        <div className="w-full flex flex-col gap-1 my-4">
          <StyledNavLink to="/" icon={<CalendarDaysIcon />} label="Calendar" />
          <StyledNavLink
            to="/users"
            icon={<UserGroupIcon />}
            label="Manage Users"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <StyledNavLink
          to="/account"
          icon={<UserCircleIcon />}
          label="Account Settings"
        />
        <StyledNavLink
          to="/logout"
          icon={<ArrowLeftStartOnRectangleIcon />}
          label="Log out"
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
