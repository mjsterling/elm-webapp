import { useEffect, useMemo, useState } from "react";
import { StyledInput } from ".";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

type StyledDropdownProps = {
  value: string;
  options: string[];
  onSelect(option: string): void;
  label?: string;
  placeholder?: string;
};

export const StyledDropdown: React.FC<StyledDropdownProps> = ({
  value,
  options,
  onSelect,
  placeholder,
  label,
}) => {
  const [localValue, setLocalValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const selectOption = (option: string) => {
    onSelect(option);
    setDropdownOpen(false);
  };

  const filteredOptions = useMemo(
    () => options.filter((option) => new RegExp(localValue, "gi").test(option)),
    [localValue, value, options]
  );

  const Dropdown = () => (
    <div
      className="w-full max-h-40 overflow-y-auto absolute flex flex-col top-[100%] z-10 rounded shadow"
      style={{ display: dropdownOpen ? "block" : "none" }}
    >
      {filteredOptions.length ? (
        filteredOptions.map((option) => (
          <button
            key={`dropdown__option__${option}`}
            className="p-2 transition-colors w-full bg-white text-gray-700 hover:text-blue-700"
            onClick={() => {
              selectOption(option);
            }}
          >
            {option}
          </button>
        ))
      ) : (
        <div className="p-2 flex justify-center transition-colors w-full bg-white text-gray-300">
          <span>No options available</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="relative flex">
      <StyledInput
        label={label}
        placeholder={placeholder}
        onFocus={() => setDropdownOpen(true)}
        endIcon={
          dropdownOpen ? (
            <ChevronUpIcon
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen(false);
              }}
            />
          ) : localValue.length ? (
            <XMarkIcon
              className="cursor-pointer"
              onClick={() => {
                onSelect("");
              }}
            />
          ) : (
            <ChevronDownIcon
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen(true);
              }}
            />
          )
        }
        // onBlur={() => {
        //   setTimeout(() => {
        //     setDropdownOpen(false);
        //   }, 50);
        // }}
        value={localValue}
        onChange={(e) => setLocalValue(e.currentTarget.value)}
      />
      <Dropdown />
    </div>
  );
};
