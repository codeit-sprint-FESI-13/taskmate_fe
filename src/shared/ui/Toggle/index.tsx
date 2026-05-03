"use client";

import { useState } from "react";

import { cn } from "@/shared/utils/styles/cn";

type ToggleSize = "large" | "medium" | "small";

const TOGGLE_SIZE = {
  large: {
    width: 72,
    trackPadding: 5,
    thumbSize: 24,
  },
  medium: {
    width: 60,
    trackPadding: 4,
    thumbSize: 20,
  },
  small: {
    width: 48,
    trackPadding: 3,
    thumbSize: 16,
  },
} as const;

interface ToggleProps {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  className?: string;
  size?: ToggleSize;
}

export const Toggle = ({
  pressed: pressedProp,
  defaultPressed = false,
  onPressedChange,
  className,
  size = "large",
}: ToggleProps) => {
  const [internal, setInternal] = useState(defaultPressed);
  const { width, trackPadding, thumbSize } = TOGGLE_SIZE[size];
  const height = thumbSize + trackPadding * 2;

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
      aria-pressed={pressed}
      onClick={toggle}
      className={cn(
        "relative box-border shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-out focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 focus-visible:outline-none",
        pressed ? "bg-blue-800" : "bg-gray-300",
        className,
      )}
      style={{ width, height }}
    >
      <span
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full bg-blue-50 transition-[left] duration-200 ease-out"
        style={{
          left: pressed ? width - trackPadding - thumbSize : trackPadding,
          width: thumbSize,
          height: thumbSize,
        }}
      />
    </button>
  );
};
