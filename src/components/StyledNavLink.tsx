import clsx from "clsx";
import { NavLink } from "react-router-dom";

type StyledNavLinkProps = {
  icon: JSX.Element;
  to: string;
  label: string;
};

type StyledNavLink = (props: StyledNavLinkProps) => JSX.Element;

export const StyledNavLink: StyledNavLink = ({ icon, to, label }) => (
  <NavLink to={to}>
    {({ isActive }) => (
      <span
        className={clsx(
          "flex gap-4 items-center p-2 transition-all hover:pl-2 hover:border-l-4 border-l-blue-700",
          isActive
            ? "border-l-4 pl-2 text-blue-700"
            : "text-gray-700 hover:text-blue-700"
        )}
      >
        <span className="h-6 w-6">{icon}</span>
        {label}
      </span>
    )}
  </NavLink>
);
