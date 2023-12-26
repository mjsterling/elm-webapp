import clsx from "clsx";

type Mode = "contained" | "outlined" | "text";
type Theme = "primary" | "error" | "grey";

type StyledButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  mode?: Mode;
  theme?: Theme;
};

type StyledButton = React.FC<StyledButtonProps>;
export const StyledButton: StyledButton = ({
  startIcon,
  endIcon,
  label,
  className,
  mode = "contained",
  theme = "primary",
  ...props
}) => {
  const styles: {
    [P in Mode]: {
      [P in Theme]: string;
    };
  } = {
    contained: {
      grey: "border border-gray-700 bg-gray-700 text-white hover:bg-white hover:text-gray-700",
      primary:
        "border border-blue-700 bg-blue-700 text-white hover:bg-white hover:text-blue-700",
      error:
        "border border-red-600 bg-red-600 text-white hover:bg-white hover-text-red-600",
    },
    outlined: {
      grey: "border border-gray-700 text-gray-700 bg-white hover:bg-gray-700 hover:text-white",
      primary:
        "border border-blue-700 bg-white text-blue-700 hover:bg-blue-700 hover:text-white",
      error:
        "border border-red-600 bg-white text-red-600 hover:bg-red-600 hover:text-white",
    },
    text: {
      grey: "text-gray-700 hover:underline",
      primary: "text-blue-700 hover:underline",
      error: "text-red-600 hover:underline",
    },
  };
  return (
    <button
      className={clsx(
        "transition-all rounded px-4 py-2 font-semibold cursor-pointer gap-2 flex justify-center items-center",
        styles[mode][theme],
        className
      )}
      {...props}
    >
      {startIcon ? (
        <span className="h-5 w-5 inline-block">{startIcon}</span>
      ) : null}
      {label}
      {endIcon ? <span className="h-5 w-5 inline-block">{endIcon}</span> : null}
    </button>
  );
};
