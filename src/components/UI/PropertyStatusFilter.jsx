import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const PropertyStatusFilter = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const options = [
    { label: "All Status", value: "all" },
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
    // { label: "For Sale", value: "For Sale" },
    // { label: "For Rent", value: "For Rent" },
  ];

  const handleSelect = (val) => {
    onChange(val);
    setOpen(false);
  };

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || "Filter Status";

  return (
    <div className="relative w-full sm:w-[200px]">
      <button
        type="button"
        className={`h-10 sm:h-12 w-full flex items-center justify-between text-gray-700 dark:text-gray-200 px-4 py-2 rounded-3xl bg-white dark:bg-gray-700 text-sm sm:text-base  dark:border-gray-700 focus:outline-none transition 
          ${open ? "shadow-lg" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{selectedLabel}</span>
        <IoMdArrowDropdown
          className={`text-lg ml-2 transform transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
          size={24}
        />
      </button>

      {open && (
        <div className="absolute flex flex-col gap-2 left-0 mt-2 w-full z-50 bg-white dark:bg-gray-800 rounded-2xl shadow-lg ring-1 ring-black/5 p-2">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`cursor-pointer py-2 px-4 rounded-3xl transition-colors duration-200 ${
                value === opt.value
                  ? "bg-[#1C2B49] text-white"
                  : "hover:bg-[#ECECEC] hover:text-gray-700 dark:hover:bg-gray-700"
              }`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyStatusFilter;
