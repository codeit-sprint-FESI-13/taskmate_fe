"use client";

import React from "react";

import { cn } from "@/utils/utils";

import { useDropdown } from "./index";

type DropdownProps = {
  options: string[];
  selected?: string; // 초기값
  onSelect?: (value: string) => void;
  className?: string;
};

export const Dropdown = ({
  options,
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
  } = useDropdown(options, selected);

  const handleSelect = (value: string) => {
    selectItem(value);
    onSelect?.(value);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative self-start rounded-xl border border-gray-200 bg-white px-4 py-2",
        className,
      )}
    >
      <button
        type="button"
        onClick={toggle}
        className="w-full cursor-pointer text-center"
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
                className="w-full cursor-pointer py-1 text-center hover:rounded-2xl hover:bg-blue-800 hover:text-white"
              >
                {option}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
