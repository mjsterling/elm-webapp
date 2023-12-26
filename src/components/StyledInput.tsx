type StyledInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: JSX.Element;
  iconposition?: "trailing" | "leading";
  label?: string;
  error?: string;
  required?: boolean;
};

type StyledInput = React.FC<StyledInputProps>;
export const StyledInput: StyledInput = ({
  label,
  icon,
  iconposition = "leading",
  required = false,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label ? <span className="text-gray-700 text-sm">{label}</span> : null}
      <div className="p-2 border rounded flex gap-2 items-center">
        <span className="h-4 w-4 text-sm text-gray-500">
          {icon && iconposition === "leading" ? icon : null}
        </span>
        <input className="outline-none" {...props} />
        <span className="h-4 w-4 text-sm text-gray-500">
          {icon && iconposition === "trailing" ? icon : null}
        </span>
      </div>
      {props.error ? (
        <span className="text-red-600 text-sm">{props.error}</span>
      ) : null}
    </div>
  );
};
