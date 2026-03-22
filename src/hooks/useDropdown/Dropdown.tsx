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
      className={className}
    >
      <button
        type="button"
        onClick={toggle}
      >
        {current || "Select"}
      </button>

      {isOpen && (
        <ul className="absolute">
          {options
            .filter((option) => option !== current)
            .map((option) => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
