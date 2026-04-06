import { useContext } from "react";

import { cn } from "@/utils/utils";

import { Icon } from "../common/Icon";
import { NavigationBarContext } from "./provider";

export const Header = () => {
  const { isOpen, open, close } = useContext(NavigationBarContext);

  return (
    <header
      className={cn(
        "flex flex-col items-center justify-start transition-[gap] duration-300 ease-in-out",
        isOpen ? "gap-[10px]" : "gap-10",
      )}
    >
      <Icon
        name={isOpen ? "LeftDoubleArrow" : "RightDoubleArrow"}
        size={24}
        className={cn(
          "cursor-pointer text-gray-300",
          isOpen ? "mobile:self-end" : "mobile:self-center",
          "mobile:block hidden",
        )}
        onClick={isOpen ? close : open}
      />

      <div
        className={cn(
          "flex w-full items-center justify-between px-5 py-4",
          "mobile:items-center mobile:justify-start mobile:gap-[6px] mobile:p-0",
          isOpen ? "mobile:pl-2" : "mobile:pl-0",
        )}
      >
        <Icon
          name="LogoIcon"
          size={40}
          className="mobile:block hidden shrink-0"
        />

        {isOpen && (
          <Icon
            name="LogoText"
            size={121}
            className="mobile:block hidden h-[25px]"
          />
        )}

        {!isOpen && (
          <Icon
            name="Menu"
            size={24}
            className="mobile:hidden block cursor-pointer text-gray-500"
            onClick={open}
          />
        )}

        {!isOpen && (
          <Icon
            name="BellDot"
            size={24}
            className="mobile:hidden block cursor-pointer text-gray-500"
          />
        )}
      </div>

      {isOpen && (
        <>
          <div className="flex w-full items-center justify-end px-4">
            <Icon
              name="LinedX"
              size={24}
              className="mobile:hidden block cursor-pointer text-gray-500"
              onClick={close}
            />
          </div>
        </>
      )}
    </header>
  );
};
