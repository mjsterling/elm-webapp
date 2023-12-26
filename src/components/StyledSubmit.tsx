type StyledSubmitProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  icon?: JSX.Element;
  iconposition?: "trailing" | "leading";
};

type StyledSubmit = React.FC<StyledSubmitProps>;
export const StyledSubmit: StyledSubmit = ({
  icon,
  label,
  iconposition = "leading",
  ...props
}) => {
  return (
    <button
      className="rounded px-4 py-2 bg-blue-700 text-white font-semibold cursor-pointer gap-2 flex justify-center items-center"
      type="submit"
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
