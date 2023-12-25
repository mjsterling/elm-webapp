export const StyledInput = (
  props: React.InputHTMLAttributes<HTMLInputElement> & {
    icon?: JSX.Element;
    iconposition?: "trailing" | "leading";
  }
) => {
  return (
    <div className="p-2 border rounded flex gap-2 items-center">
      <span className="h-4 w-4 text-sm text-gray-500">
        {props.icon && props.iconposition === "leading" ? props.icon : null}
      </span>
      <input className="outline-none" {...props} />
      <span className="h-4 w-4 text-sm text-gray-500">
        {props.icon && props.iconposition === "trailing" ? props.icon : null}
      </span>
    </div>
  );
};
