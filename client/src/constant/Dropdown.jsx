import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Dropdown = ({
  label,
  options,
  type = "checkbox",
  isOpen,
  toggleDropdown,
  onSelect,
  selectedFilters,
}) => {
  const handleToggle = () => {
    toggleDropdown();
  };

  const handleOptionClick = (option) => {
    onSelect(option);
  };

  return (
    <div className="relative w-full sm:w-40">
      <button
        onClick={handleToggle}
        className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg border border-gray-300 flex items-center justify-between w-full"
      >
        {label}
        {isOpen ? (
          <ChevronUp size={18} className="text-gray-500" />
        ) : (
          <ChevronDown size={18} className="text-gray-500" />
        )}
      </button>

      {isOpen && (
        <div className="absolute z-10 bg-white shadow-lg rounded-lg mt-2 w-64 border border-gray-300">
          <ul className="py-2 max-h-48 overflow-y-auto">
            {options.map((option, index) => (
              <li
                key={index}
                className="px-4 py-2 text-sm flex items-center hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type={type}
                  id={`${label}-${index}`}
                  name={type === "radio" ? label : `${label}-${index}`}
                  className="mr-3 w-4 h-4 flex-shrink-0"
                  checked={
                    type === "radio"
                      ? selectedFilters === option
                      : selectedFilters.includes(option)
                  }
                  onChange={() => handleOptionClick(option)}
                />
                <label
                  htmlFor={`${label}-${index}`}
                  className="text-gray-800 flex-grow cursor-pointer"
                >
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
