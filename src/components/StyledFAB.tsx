import clsx from "clsx";

type StyledFabProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: JSX.Element;
  label?: string;
};

type StyledFab = (props: StyledFabProps) => JSX.Element;
export const StyledFab: StyledFab = ({ className, icon, label, ...props }) => {
  return (
    <button
      className={clsx(
        label ? "px-4 py-2" : "p-2",
        "gap-2 transition-colors bg-blue-700 rounded-full flex justify-center items-center",
        "hover:bg-white border border-blue-700 hover:text-blue-700 text-white",
        className
      )}
      {...props}
    >
      <span className="h-6 w-6">{icon}</span>
      {label ?? null}
    </button>
  );
};
