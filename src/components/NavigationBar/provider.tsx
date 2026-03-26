"use client";

import { createContext, useState } from "react";

import { useBreakpoint } from "@/hooks/useBreakpoint";

interface NavigationBarContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const NavigationBarContext = createContext<NavigationBarContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
});

const NavigationBarProvider = ({ children }: { children: React.ReactNode }) => {
  const breakpoint = useBreakpoint();
  const [isOpen, setIsOpen] = useState<boolean>(breakpoint !== "desktop");

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <NavigationBarContext value={{ isOpen, open, close }}>
      {children}
    </NavigationBarContext>
  );
};

export default NavigationBarProvider;
