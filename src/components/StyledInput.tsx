import clsx from "clsx";

type StyledInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  label?: string;
  error?: string;
  // required?: boolean;
};

type StyledInput = React.FC<StyledInputProps>;
export const StyledInput: StyledInput = ({
  label,
  startIcon,
  endIcon,
  // required = false,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label ? (
        <span className="text-gray-700 text-sm select-none">{label}</span>
      ) : null}
      <div
        className={clsx(
          "p-2 border focus-within:border-blue-700 rounded flex gap-2 items-center",
          props.disabled === true ? "bg-[rgba(239,_239,_239)]" : ""
        )}
      >
        <span className="h-4 w-4 text-sm text-gray-500">
          {startIcon ?? null}
        </span>
        <input className={clsx("outline-none w-full", className)} {...props} />
        <span className="h-4 w-4 text-sm text-gray-500">{endIcon ?? null}</span>
      </div>
      {props.error ? (
        <span className="text-red-600 text-sm">{props.error}</span>
      ) : null}
    </div>
  );
};
// E1ld0n2023!
