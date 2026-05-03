"use client";

import { useDropdown } from "@/shared/hooks/useDropdown";
import { Icon } from "@/shared/ui/Icon";

interface OrderProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export const Order = ({ options, selected, onSelect }: OrderProps) => {
  const {
    isOpen,
    selected: current,
    toggle,
    close,
    containerRef,
  } = useDropdown(options, selected);

  return (
    <div
      ref={containerRef}
      className="relative shrink-0"
    >
      <button
        type="button"
        className="flex shrink-0 cursor-pointer items-center gap-1"
        onClick={toggle}
        aria-expanded={isOpen}
      >
        <span className="typography-body-2 font-semibold text-gray-500">
          {current}
        </span>
        <Icon
          name={isOpen ? "UpFilledArrow" : "DownFilledArrow"}
          size={24}
          className="text-gray-500"
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute right-0 z-10 mt-2 w-max rounded-2xl border border-gray-200 bg-white px-2 py-1 shadow-sm"
        >
          {options.map((option) => (
            <li
              key={option}
              role="option"
              aria-selected={option === current}
              className="group cursor-pointer rounded-xl px-3 py-2 text-center hover:bg-blue-800"
              onClick={() => {
                close();
                onSelect(option);
              }}
            >
              <span className="typography-body-2 font-semibold text-gray-500 group-hover:text-white">
                {option}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
