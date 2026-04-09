"use client";

import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";

import { useBreakpoint } from "@/hooks/useBreakpoint";
import { formatNavigationKeyFromPathname } from "@/utils/formatNavigationKey";

interface NavigationBarContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  currentTab: string;
  tabChange: (tab: string) => void;
}

export const NavigationBarContext = createContext<NavigationBarContextType>({
  isOpen: true,
  open: () => {},
  close: () => {},
  currentTab: "",
  tabChange: () => {},
});

const NavigationBarProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const breakpoint = useBreakpoint();
  const [isOpen, setIsOpen] = useState<boolean>(breakpoint === "desktop");
  const [currentTab, setCurrentTab] = useState<string>(() =>
    formatNavigationKeyFromPathname(pathname),
  );

  useEffect(() => {
    setCurrentTab(formatNavigationKeyFromPathname(pathname));
  }, [pathname]);

  const tabChange = (tab: string) => {
    setCurrentTab(tab);
    if (breakpoint === "mobile") {
      close();
    }
  };

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <NavigationBarContext
      value={{ isOpen, open, close, currentTab, tabChange }}
    >
      {children}
    </NavigationBarContext>
  );
};

export default NavigationBarProvider;
