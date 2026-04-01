"use client";

import { useState } from "react";

import { cn } from "@/utils/utils";

interface ToggleProps {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  className?: string;
}

export const Toggle = ({
  pressed: pressedProp,
  defaultPressed = false,
  onPressedChange,
  className,
}: ToggleProps) => {
  const [internal, setInternal] = useState(defaultPressed);

  const isControlled = pressedProp !== undefined;
  const pressed = isControlled ? pressedProp : internal;

  const toggle = () => {
    const next = !pressed;
    if (!isControlled) setInternal(next);
    onPressedChange?.(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "relative box-border shrink-0 cursor-pointer rounded-full p-[5px] transition-colors duration-200 ease-out focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 focus-visible:outline-none",
        pressed ? "bg-blue-800" : "bg-gray-300",
        className,
      )}
      style={{ width: 72, height: 10 + 24 }}
    >
      <span
        className={cn(
          "pointer-events-none absolute top-1/2 size-6 -translate-y-1/2 rounded-full bg-blue-50 transition-[left] duration-200 ease-out",
        )}
        style={{ left: pressed ? 72 - 10 - 24 : 5 }}
      />
    </button>
  );
};
