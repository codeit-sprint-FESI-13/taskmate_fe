"use client";
import { Icon } from "@/components/common/Icon";
import { useDropdown } from "@/hooks/useDropdown";

function TeamTrashDropdown() {
  const options = [
    "프론트엔드 1팀",
    "기획 1팀",
    "백엔드 2팀",
    "프론테엔드프론테엔드프론테엔드프론테엔드",
  ];
  const { isOpen, selected, toggle, selectItem, containerRef } = useDropdown(
    options,
    options[0],
  );
  return (
    <div
      ref={containerRef}
      className="tablet:mt-0 tablet:w-[180px] relative mt-5 w-full"
    >
      <button
        onClick={toggle}
        className="bg-background-normal tablet:h-[42px] tablet:mb-0 mb-2 flex h-11 w-full items-center justify-between rounded-xl border border-gray-300 py-3 pr-3 pl-4"
      >
        <span className="text-label-alternative text-label-1 truncate font-medium">
          {selected || options[0]}
        </span>
        <Icon
          name={"DownFilledArrow"}
          className="size-5 text-gray-600"
        />
      </button>
      {isOpen && (
        <ul className="bg-background-normal absolute w-full rounded-xl shadow-[0_4px_16px_-2px_rgba(0,0,0,0.1)]">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => selectItem(option)}
              className="text-label-neutral text-label-1 h-9 cursor-pointer truncate px-[11px] py-[5px] font-medium"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TeamTrashDropdown;
