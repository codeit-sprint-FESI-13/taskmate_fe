"use client";

import { useDropdown } from "@/hooks/useDropdown";
import { Icon } from "@/shared/ui/Icon";

interface OrderProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export const Order = ({ options, selected, onSelect }: OrderProps) => {
  const {
    isOpen,
    selected: selectedSort,
    toggle,
    selectItem,
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
      >
        <span className="typography-body-2 font-semibold text-gray-500">
          {selectedSort || "최신순"}
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
              className="group cursor-pointer rounded-xl px-3 py-2 text-center hover:bg-blue-800"
              onClick={() => {
                selectItem(option);
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
