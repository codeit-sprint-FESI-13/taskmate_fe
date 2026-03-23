"use client";

import React from "react";

import { useDropdown } from ".";

type DropdownProps = {
  options: string[];
  selected?: string;
  onSelect?: (value: string) => void;
  className?: string;
};

export const Dropdown = ({
  options = [],
  selected,
  onSelect,
  className,
}: DropdownProps) => {
  const {
    isOpen,
    selected: current,
    toggle,
    selectItem,
    containerRef,
  } = useDropdown(selected);

  const handleSelect = (value: string) => {
    selectItem(value);
    onSelect?.(value);
  };

  return (
    <div
      ref={containerRef}
      className={`relative rounded-xl border border-gray-200 bg-white px-4 py-2 ${className || ""}`}
    >
      <button
        type="button"
        onClick={toggle}
        className="w-full cursor-pointer py-1 text-center"
      >
        {current || "Select"}
      </button>

      {isOpen && (
        <ul className="w-full">
          {options
            .filter((option) => option !== current)
            .map((option) => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                className="w-full cursor-pointer py-1 text-center hover:rounded-[16px] hover:bg-blue-800 hover:text-white"
              >
                {option}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
