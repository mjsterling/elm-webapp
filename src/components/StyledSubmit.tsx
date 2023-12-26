import clsx from "clsx";

type StyledSubmitProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  icon?: JSX.Element;
  iconposition?: "trailing" | "leading";
};

type StyledSubmit = React.FC<StyledSubmitProps>;
export const StyledSubmit: StyledSubmit = ({
  icon,
  label,
  className,
  iconposition = "leading",
  ...props
}) => {
  return (
    <button
      type="submit"
      className={clsx(
        "rounded px-4 py-2 bg-blue-700 text-white font-semibold cursor-pointer gap-2 flex justify-center items-center",
        className
      )}
      {...props}
    >
      {icon && iconposition === "leading" ? (
        <span className="h-5 w-5 inline-block">{icon}</span>
      ) : null}
      {label}
      {icon && iconposition === "trailing" ? (
        <span className="h-5 w-5 inline-block">{icon}</span>
      ) : null}
    </button>
  );
};
