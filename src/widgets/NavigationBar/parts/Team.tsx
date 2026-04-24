"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

import { Icon } from "@/shared/ui/Icon";
import { cn } from "@/shared/utils/styles/cn";

import { NavigationBarContext } from "../provider";

interface TeamSectionIdContextType {
  id: string;
  isOpen: boolean;
  listOpen: boolean;
  setListOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TeamSectionIdContext = createContext<TeamSectionIdContextType>({
  id: "",
  isOpen: false,
  listOpen: false,
  setListOpen: () => {},
});

interface ContainerProps {
  value: string;
  children: ReactNode;
}

function isChildActive(currentTab: string, value: string) {
  return currentTab.startsWith(`${value}-`);
}

function isTitleSelected(currentTab: string, value: string) {
  return currentTab === value;
}

function Container({ value, children }: ContainerProps) {
  const { currentTab } = useContext(NavigationBarContext);
  const [listOpen, setListOpen] = useState<boolean>(false);

  const isOpen =
    isChildActive(currentTab, value) ||
    (isTitleSelected(currentTab, value) && listOpen);

  return (
    <TeamSectionIdContext.Provider
      value={{ id: value, isOpen, listOpen, setListOpen }}
    >
      <div className="flex w-full flex-col">{children}</div>
    </TeamSectionIdContext.Provider>
  );
}

function Title({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  const { currentTab, tabChange } = useContext(NavigationBarContext);
  const { id, isOpen, listOpen, setListOpen } =
    useContext(TeamSectionIdContext);

  const isTitleSelectedValue = isTitleSelected(currentTab, id);

  const handleClick = () => {
    onClick?.();

    if (isChildActive(currentTab, id)) {
      setListOpen(false);
      tabChange(id);
      return;
    }

    if (isTitleSelectedValue) {
      setListOpen(!listOpen);
      return;
    }

    setListOpen(true);
    tabChange(id);
  };

  return (
    <button
      type="button"
      className={cn(
        "flex w-full cursor-pointer items-center justify-start gap-[14px] rounded-xl p-4 text-left",
        isTitleSelectedValue && "bg-blue-100",
      )}
      onClick={handleClick}
    >
      <Icon
        name="RightFilledArrow"
        size={24}
        className={cn(
          "shrink-0 transition-transform duration-200 ease-out",
          isOpen && "rotate-90",
          isTitleSelectedValue ? "text-blue-700" : "text-gray-300",
        )}
      />
      <h4
        className={cn(
          "typography-body-1 font-semibold",
          isTitleSelectedValue ? "text-blue-800" : "text-label-neutral",
        )}
      >
        {children}
      </h4>
    </button>
  );
}

function List({ children }: { children: ReactNode }) {
  const { isOpen } = useContext(TeamSectionIdContext);

  return (
    <div
      className={cn(
        "grid w-full transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none",
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
      )}
    >
      <div className="min-h-0 overflow-hidden">
        <div className="flex w-full flex-col justify-start pt-0.5 pl-10">
          {children}
        </div>
      </div>
    </div>
  );
}

export const Team = {
  Container,
  Title,
  List,
};
