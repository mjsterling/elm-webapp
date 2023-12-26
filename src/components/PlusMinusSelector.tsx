import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { StyledInput } from "./StyledInput";

export const PlusMinusSelector = ({
  label,
  value,
  setValue,
  min,
  max,
}: {
  label?: string;
  value: number;
  setValue: (value: number) => void;
  min?: number;
  max?: number;
}) => {
  return (
    <StyledInput
      label={label}
      startIcon={
        <MinusIcon
          className="cursor-pointer"
          onClick={() => {
            setValue(min !== undefined ? Math.max(min, value - 1) : value - 1);
          }}
        />
      }
      endIcon={
        <PlusIcon
          className="cursor-pointer"
          onClick={() => {
            setValue(max !== undefined ? Math.min(max, value + 1) : value + 1);
          }}
        />
      }
      value={value}
      onChange={(e) => {
        setValue(parseInt(e.currentTarget.value));
      }}
      className="text-center"
    />
  );
};
