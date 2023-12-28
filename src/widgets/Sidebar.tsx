import {
  ArrowLeftStartOnRectangleIcon,
  ArrowsRightLeftIcon,
  BuildingOffice2Icon,
  BuildingOfficeIcon,
  CalendarDaysIcon,
  PlusCircleIcon,
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
      className="flex flex-col h-full w-60 min-w-60 fixed md:relative bg-white z-50 shadow transition-all p-2 justify-between"
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
            to="/addons"
            icon={<PlusCircleIcon />}
            label="Manage Addons"
          />

          <StyledNavLink
            to="/rooms"
            icon={<BuildingOfficeIcon />}
            label="Manage Rooms"
          />
          <StyledNavLink
            to="/roomtypes"
            icon={<BuildingOffice2Icon />}
            label="Manage Room Types"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <StyledNavLink
          to="/users"
          icon={<UserGroupIcon />}
          label="Manage Users"
        />
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
        className=" h-10 w-10 absolute flex justify-center items-center -right-5 top-[calc(50%_-_20px)] z-50 bg-white rounded-r-full border-r border-r-gray-200"
      >
        <ArrowsRightLeftIcon className="h-4 w-4 text-gray-700" />
      </button>
    </div>
  );
};
