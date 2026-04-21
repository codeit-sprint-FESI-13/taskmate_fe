import { createContext, useContext } from "react";

import { Icon as CommonIcon } from "@/shared/ui/Icon";
import { IconName } from "@/shared/ui/Icon/iconMap";
import { cn } from "@/shared/utils/styles/cn";

import { NavigationBarContext } from "../provider";

const ItemActiveContext = createContext(false);

interface NameProps {
  children: React.ReactNode;
}

const Name = ({ children }: NameProps) => {
  const active = useContext(ItemActiveContext);
  return (
    <span
      className={cn(
        "typography-body-1 truncate font-semibold",
        active ? "text-blue-800" : "text-label-neutral",
      )}
    >
      {children}
    </span>
  );
};

interface IconProps {
  name: IconName;
}

const Icon = ({ name }: IconProps) => {
  const active = useContext(ItemActiveContext);
  return (
    <CommonIcon
      name={name}
      size={24}
      className={cn("shrink-0", active ? "text-blue-700" : "text-gray-300")}
    />
  );
};

interface LabelProps {
  children: React.ReactNode;
}

const Label = ({ children }: LabelProps) => {
  return (
    <span className="typography-body-2 ml-[-2px] font-medium text-gray-400">
      {children}
    </span>
  );
};

interface WrapperProps {
  children: React.ReactNode;
  value: string;
  onClick?: () => void;
}

const Wrapper = ({ children, value, onClick }: WrapperProps) => {
  const { currentTab, tabChange } = useContext(NavigationBarContext);
  const active = currentTab === value;

  return (
    <ItemActiveContext value={active}>
      <div
        className={cn(
          "flex cursor-pointer items-center justify-start gap-[14px] rounded-xl p-4",
          active && "bg-blue-100",
        )}
        onClick={() => {
          tabChange(value);
          onClick?.();
        }}
      >
        {children}
      </div>
    </ItemActiveContext>
  );
};

export const Item = {
  Wrapper,
  Icon,
  Name,
  Label,
};
