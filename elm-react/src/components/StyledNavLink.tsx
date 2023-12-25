import { NavLink } from "react-router-dom";

type StyledNavLinkProps = {
  icon: JSX.Element;
  to: string;
  label: string;
};

type StyledNavLink = (props: StyledNavLinkProps) => JSX.Element;

export const StyledNavLink: StyledNavLink = ({ icon, to, label }) => (
  <NavLink
    to={to}
    className="group p-2 transition-all hover:pl-4 hover:border-l-4 border-l-blue-500"
  >
    {({ isActive }) => (
      <span
        className={
          "flex gap-4 transition-all items-center" +
          (isActive
            ? "text-blue-500"
            : "text-gray-700 group-hover:text-blue-500")
        }
      >
        <span className="h-6 w-6">{icon}</span>
        {label}
      </span>
    )}
  </NavLink>
);
