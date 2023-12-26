import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export const Header = () => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  return (
    <div className="flex justify-between items-center px-4 py-2 w-full h-12 min-h-[48px] shadow">
      Eildon Lake Motel PMS
      <span className="text-gray-500">
        <UserCircleIcon
          className="h-8 w-8 cursor-pointer"
          onClick={() => setAccountMenuOpen(!accountMenuOpen)}
        />
      </span>
    </div>
  );
};
