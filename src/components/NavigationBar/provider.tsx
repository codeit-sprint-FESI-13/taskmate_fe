"use client";

import { createContext, useState } from "react";

import { useBreakpoint } from "@/hooks/useBreakpoint";

interface NavigationBarContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  currentTab: string;
  tabChange: (tab: string) => void;
}

export const NavigationBarContext = createContext<NavigationBarContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
  currentTab: "",
  tabChange: () => {},
});

const NavigationBarProvider = ({ children }: { children: React.ReactNode }) => {
  const breakpoint = useBreakpoint();
  const [isOpen, setIsOpen] = useState<boolean>(breakpoint !== "desktop");
  const [currentTab, setCurrentTab] = useState<string>(
    window.location.pathname === "/taskmate" ? "home" : "",
  );

  const tabChange = (tab: string) => {
    setCurrentTab(tab);
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
