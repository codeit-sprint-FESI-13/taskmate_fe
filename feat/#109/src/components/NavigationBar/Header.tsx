import { useContext } from "react";

import { cn } from "@/utils/utils";

import { Icon } from "../common/Icon";
import { NavigationBarContext } from "./provider";

// @TODO: Logo 추가 후 수정
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
          isOpen ? "self-end" : "self-center",
        )}
        onClick={isOpen ? close : open}
      />

      <h1 className="typography-body-2 flex h-[40px] items-center py-[10px] font-bold">
        LOGO
      </h1>
    </header>
  );
};
