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
          isOpen ? "self-end" : "self-center",
        )}
        onClick={isOpen ? close : open}
      />

      <div className="flex w-full items-center justify-start gap-[6px] pl-2">
        <Icon
          name="LogoIcon"
          size={40}
        />

        {isOpen && (
          <Icon
            name="LogoText"
            size={121}
            className="h-[25px]"
          />
        )}
      </div>
    </header>
  );
};
