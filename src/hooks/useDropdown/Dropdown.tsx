"use client";

import React from "react";

import RightArrow from "@/components/common/Icons/RightArrow";
import { cn } from "@/utils/utils";

import { useDropdown } from "./index";

type RoleStyle = {
  option?: string;
  selected?: string;
};

// generic 타입
type DropdownProps<T extends string> = {
  options: readonly T[];
  selected?: T;
  onSelect?: (value: T) => void | Promise<void>;
  className?: string;
  roleStyleMap?: Partial<Record<T, RoleStyle>>;
  defaultOptionClassName?: string;
  defaultSelectedClassName?: string;
};

export const Dropdown = <T extends string>({
  options,
  selected,
  onSelect,
  className,
  roleStyleMap,
  defaultOptionClassName,
  defaultSelectedClassName,
}: DropdownProps<T>) => {
  if (selected && !options.includes(selected)) {
    throw new Error(
      `[Dropdown] invalid selected value "${selected}". It must exist in options.`,
    );
  }

  const measureRef = React.useRef<HTMLSpanElement>(null);
  const [pillWidth, setPillWidth] = React.useState<number>();

  const {
    isOpen,
    selected: current,
    toggle,
    close,
    selectItem,
    containerRef,
  } = useDropdown([...options], selected);

  // TODO: 삭제 예정
  // 기존 코드의 동작을 이해해야 함
  const handleSelect = async (value: T) => {
    if (!onSelect) {
      selectItem(value);
      return;
    }

    try {
      await onSelect?.(value);
    } catch (error) {
      console.error("dropdown select error", error);
    } finally {
      close();
    }
  };

  const maxLabel = [current || "Select", ...options].reduce(
    (max, item) => (item.length > max.length ? item : max),
    "",
  );
  const iconSize = 10;
  const iconGap = 6;
  const contentWidth = pillWidth ? pillWidth + iconSize + iconGap : undefined;
  const containerWidth = contentWidth ? contentWidth + 24 : undefined;

  React.useLayoutEffect(() => {
    if (!measureRef.current) {
      return;
    }
    setPillWidth(measureRef.current.offsetWidth);
  }, [maxLabel]);

  const selectedClassName =
    (current && roleStyleMap?.[current as T]?.selected) ??
    defaultSelectedClassName ??
    "";
  const optionBaseClassName = defaultOptionClassName ?? "hover:bg-gray-200";

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-block self-start text-[13px]", className)}
      style={containerWidth ? { width: `${containerWidth}px` } : undefined}
    >
      <span
        ref={measureRef}
        className="pointer-events-none invisible absolute inline-block rounded-lg px-2 whitespace-nowrap"
      >
        {maxLabel}
      </span>

      <button
        type="button"
        onClick={toggle}
        className={cn(
          "group relative block h-8 w-full cursor-pointer rounded-lg bg-gray-100 px-2 py-2 text-center",
          isOpen && "rounded-b-none border-b-0",
        )}
      >
        <span
          className="invisible inline-block rounded-lg px-2 whitespace-nowrap"
          style={contentWidth ? { width: `${contentWidth}px` } : undefined}
        >
          {maxLabel}
        </span>
        <span className="absolute inset-0 flex items-center justify-center">
          <span
            className={cn(
              "inline-flex items-center justify-center gap-[6px] rounded-lg px-2 whitespace-nowrap transition-colors",
              selectedClassName,
            )}
            style={contentWidth ? { width: `${contentWidth}px` } : undefined}
          >
            {/* TODO: 삭제 예정 - 어드민 혹은 팀원 */}
            <span>{current || "Select"}</span>
            <RightArrow
              className={cn(
                "h-2.5 w-2.5 text-gray-400 transition-transform",
                isOpen ? "-rotate-90" : "rotate-90",
              )}
            />
          </span>
        </span>
      </button>

      {isOpen && (
        <ul className="absolute top-full left-0 z-10 w-full overflow-hidden rounded-b-lg bg-gray-100">
          {options
            .filter((option) => option !== current)
            .map((option) => (
              <li
                key={option}
                // TODO: 삭제 예정 - 목적: handleSelect 함수 실행 시 API 호출도 됐으면 좋겠다.
                // handleSelect를 수정해야겠다.
                onClick={() => handleSelect(option)}
                className="flex h-8 w-full cursor-pointer items-center justify-center"
              >
                <span
                  className={cn(
                    "inline-flex items-center justify-center rounded-md px-2",
                    optionBaseClassName,
                    roleStyleMap?.[option]?.option,
                  )}
                  style={
                    contentWidth ? { width: `${contentWidth}px` } : undefined
                  }
                >
                  {option}
                </span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
