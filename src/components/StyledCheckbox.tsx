import { CheckIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

type StyledCheckboxProps = {
  checked: boolean;
  label: string;
  onChange(): void;
};

type StyledCheckbox = React.FC<StyledCheckboxProps>;

export const StyledCheckbox: StyledCheckbox = ({
  checked,
  label,
  onChange,
}) => {
  return (
    <div
      className="group flex gap-3 cursor-pointer px-4 py-4 items-center select-none"
      onClick={onChange}
    >
      <div
        className={clsx(
          "h-5 w-5 rounded text-white border border-blue-700 transition-colors",
          checked ? "bg-blue-700" : "bg-white group-hover:text-blue-700"
        )}
      >
        <CheckIcon />
      </div>
      <span>{label}</span>
    </div>
  );
};
