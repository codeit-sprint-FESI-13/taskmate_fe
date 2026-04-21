import { cva } from "class-variance-authority";
import { useContext } from "react";

import { useBreakpoint } from "@/hooks/useBreakpoint";
import { cn } from "@/shared/utils/styles/cn";

import { Icon } from "../../../shared/ui/Icon";
import { NavigationBarContext } from "../provider";

const headerVariants = cva(
  [
    "flex flex-col items-center justify-start transition-[gap] duration-300 ease-in-out",
  ],
  {
    variants: {
      open: { true: "gap-[10px]", false: "gap-10" },
    },
    defaultVariants: { open: false },
  },
);

const MobileHeader = () => {
  const { isOpen, open, close } = useContext(NavigationBarContext);

  return (
    <header className={headerVariants({ open: isOpen })}>
      <div className="flex w-full items-center justify-between px-5 py-4">
        {!isOpen && (
          <Icon
            name="Menu"
            size={24}
            className="cursor-pointer text-gray-500"
            onClick={open}
          />
        )}

        {!isOpen && (
          <Icon
            name="BellDot"
            size={24}
            className="cursor-pointer text-gray-500"
          />
        )}
      </div>

      {isOpen && (
        <>
          <div className="flex w-full items-center justify-end px-4 pb-4">
            <Icon
              name="LinedX"
              size={24}
              className="shrink-0 cursor-pointer text-gray-500"
              onClick={close}
            />
          </div>
        </>
      )}
    </header>
  );
};

const DefaultHeader = () => {
  const { isOpen, open, close } = useContext(NavigationBarContext);

  return (
    <header className={headerVariants({ open: isOpen })}>
      <Icon
        name={isOpen ? "LeftDoubleArrow" : "RightDoubleArrow"}
        size={24}
        className={cn(
          "cursor-pointer text-gray-300",
          isOpen ? "self-end" : "self-center",
        )}
        onClick={isOpen ? close : open}
      />

      <div
        className={cn(
          "flex w-full items-center justify-start gap-[6px]",
          isOpen ? "pl-2" : "pl-0",
        )}
      >
        <Icon
          name="LogoIcon"
          size={40}
          className="shrink-0"
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

export default function Header() {
  const breakpoint = useBreakpoint();

  return breakpoint === "mobile" ? <MobileHeader /> : <DefaultHeader />;
}
